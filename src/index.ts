import axios, { AxiosRequestConfig, Method } from "axios";
import createHmac from "crypto-js/hmac-sha384";
import joi from "joi";
import BigNumber from "bignumber.js";
import * as schemas from "./schemas";
import "tslib";
import {
  IBalanceResult,
  IConfirmOfferParams,
  IConfirmOfferResult,
  IConstructorParams,
  IFeesResult,
  IMetaResult,
  IOfferParams,
  IOfferResult,
  IPaginatedTradesResult,
  ITickerParams,
  ITickerResult,
  ITradesParams,
  ITradesResult,
} from "./typings/biscoint";

function resolve(from: string, to: string) {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}

const GET_NONCE_DELAY_INC_MS = 10;

BigNumber.config({
  FORMAT: {
    decimalSeparator: ".",
    groupSeparator: "",
  },
});

class Biscoint {
  private usNonce: number;
  private nextCallDelay: number;
  private apiKey!: string;
  private apiSecret!: string;
  private apiUrl!: string;
  private apiTimeout!: number;
  constructor(args: IConstructorParams = {}) {
    Object.assign(this, joi.attempt(args, schemas.constructorSchema));
    this.usNonce = 0;
    this.nextCallDelay = 0;
  }

  /* public api call */
  async ticker(args: ITickerParams = {}): Promise<ITickerResult> {
    const params = joi.attempt(args, schemas.tickerSchema);

    const { data } = await this.call("ticker", params, "GET", false);
    return data;
  }

  /* public api call */
  async fees(): Promise<IFeesResult> {
    const { data } = await this.call("fees", null, "GET", false);
    return data;
  }

  /* public api call */
  async meta(): Promise<IMetaResult> {
    const { data } = await this.call("meta", null, "GET", false);
    return data;
  }

  /* private api call */
  async balance(): Promise<IBalanceResult> {
    const { data } = await this.call("balance", null, "POST", true);
    return data;
  }

  /* private api call */
  async trades(
    args: ITradesParams = {},
  ): Promise<ITradesResult[] | IPaginatedTradesResult> {
    const params = joi.attempt(args, schemas.getTradesSchema);

    const { data } = await this.call("trades", params, "POST", true);
    return data;
  }

  /* private api call */
  async offer(args: IOfferParams): Promise<IOfferResult> {
    const params = joi.attempt(args, schemas.offerSchema);

    const { data } = await this.call("offer", params, "POST", true);
    return data;
  }

  /* private api call */
  async confirmOffer(args: IConfirmOfferParams): Promise<IConfirmOfferResult> {
    const params = joi.attempt(args, schemas.confirmOfferSchema);

    const { data } = await this.call("offer/confirm", params, "POST", true);
    return data;
  }

  // This ensures a minimal amount of time between calls so that the nonce always increases
  // and requests are made in the expected order.
  private async getNonce(): Promise<string> {
    const curDelay = this.nextCallDelay;
    this.nextCallDelay += GET_NONCE_DELAY_INC_MS;

    return new Promise(resolve => {
      setTimeout(() => {
        this.usNonce = (this.usNonce + 1) % 1000;
        const nonce = (Date.now() * 1000 + this.usNonce).toString();
        resolve(nonce);
      }, curDelay);
    });
  }

  private sign(endpoint: string, nonce: string, data: any) {
    const strToBeSigned = `v1/${endpoint}${nonce}${data}`;
    const hashBuffer = Buffer.from(strToBeSigned).toString("base64");

    return createHmac(hashBuffer, this.apiSecret).toString();
  }

  private async call(
    endpoint: string,
    params: { [key: string]: string } | null,
    method: Method = "GET",
    addAuth?: boolean,
  ) {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    let data = undefined;
    let nonce = "0";

    const v1Endpoint = `v1/${endpoint}`;
    let url = resolve(this.apiUrl, v1Endpoint);

    if (method === "POST") {
      params = params || {};
      data = JSON.stringify(params, Object.keys(params).sort());

      if (addAuth) {
        nonce = await this.getNonce();
        const signedParams = this.sign(endpoint, nonce, data);
        headers["BSCNT-NONCE"] = nonce;
        headers["BSCNT-APIKEY"] = this.apiKey;
        headers["BSCNT-SIGN"] = signedParams;
      }

      data = JSON.parse(data);
    }

    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      data,
      timeout: this.apiTimeout,
    };

    if (method === "GET" && params) {
      config.params = params;
    }

    try {
      const { data } = await axios(config);
      return data;
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data.message) {
          throw error.response.data.message;
        }
        throw error.response.data;
      }
      throw error;
    } finally {
      if (method === "POST" && addAuth) {
        this.nextCallDelay = Math.max(
          this.nextCallDelay - GET_NONCE_DELAY_INC_MS,
          0,
        );
      }
    }
  }
}

export default Biscoint;
