// @ts-ignore
const axios = require("axios");
const createHmac = require("crypto").createHmac;
const stringify = require("querystring").stringify;
const joi = require("joi");
const BigNumber = require("bignumber.js");

BigNumber.config({
  FORMAT: {
    decimalSeparator: ".",
    groupSeparator: ""
  }
});

const constructorSchema = joi.object({
  apiKey: joi.string().default(""),
  apiSecret: joi.string().default(""),
  apiUrl: joi
    .string()
    .optional()
    .default("https://api.biscoint.io/")
});

const tickerSchema = joi.object({
  amount: joi
    .number()
    .precision(8)
    .required(),
  base: joi
    .string()
    .valid("BTC")
    .required(),
  quote: joi
    .string()
    .valid("BRL")
    .required()
});

const offerSchema = joi.object({
  amount: joi
    .number()
    .precision(8)
    .required(),
  op: joi
    .string()
    .valid("buy", "sell")
    .required(),
  isQuote: joi.boolean().required()
});

const confirmOfferSchema = joi.object({
  offerId: joi.string().required()
});

/**
 * @typedef {Object} ConstructorParams
 * @property {string} apiKey - Your Biscoint API Key
 * @property {string} apiSecret - Your Biscoint API Secret
 * @property {string} apiUrl - Biscoints API URL
 */

/**
 * @typedef {Object} TickerParams
 * @property {number} [amount=1000] - Amount that you want to verify.
 * @property {('BTC')} base - Reference base symbol.
 * @property {('BRL')} quote - Reference quote symbol.
 */

/**
 * @typedef {Object} OfferParams
 * @property {number} amount - Amount that you want to trade.
 * @property {boolean} isQuote - Reference currency symbol.
 * @property {('buy'|'sell')} op - The operation that you want
 */

/**
 * @typedef {Object} ConfirmOfferParams
 * @property {string} offerId - ID of your offer.
 */

/**
 * @typedef {Object} Offer
 * @property {string} baseAmount
 * @property {string} quoteAmount
 * @property {string} efPrice
 * @property {string} exchangeFees
 * @property {string} exchangeId
 * @property {string} orderPrice
 * @property {string} offerId
 * @property {string} userId
 * @property {('BTC'|'BRL')} base
 * @property {string} quote
 * @property {('buy'|'sell')} op
 * @property {string} createdAt
 * @property {string} expiresAt
 * @property {string} isFinal
 * @property {string} isQuote
 */

/**
 * @param {Object} args - Arguments to sign
 * @return {string} - Base64 hash
 */
function _sign(args, apiSecret) {
  const jsonString = JSON.stringify(args, Object.keys(args).sort());
  const hashBuffer = Buffer.from(jsonString).toString("base64");
  return createHmac("sha256", apiSecret)
    .update(hashBuffer)
    .digest("hex");
}

/**
 * @param {Object} args
 * @param {('GET'|'POST')} [method=GET] GET by default
 * @return {Object}
 */
async function _call(args, apiUrl, apiKey, apiSecret, method = "GET") {
  const config = {
    method: method,
    url: `${apiUrl}${args.request}?${method == "GET" ? stringify(args) : ""}`,
    headers: {
      "BSCNT-SIGN": _sign(args, apiSecret),
      "BSCNT-APIKEY": apiKey
    },
    data: args
  };
  try {
    return (await axios(config)).data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) throw error.response.data.message;
      throw error.response.data;
    }
    throw error;
  }
}

/**
 * Biscoint wrapper
 */
class Biscoint {
  /**
   * @memberof Biscoint
   */
  constructor(args = {}) {
    Object.assign(this, constructorSchema.validate(args).value);
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {TickerParams} args
   * @return {Object}
   */
  async ticker(args = {}) {
    tickerSchema.validate(args);
    return (
      await _call(
        {
          request: "v1/ticker",
          base: "BTC",
          quote: "BRL",
          amount: new BigNumber(args.amount || 1000).toFormat(8)
        },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async withdrawFees(args = {}) {
    return (
      await _call(
        {
          request: "v1/withdrawFees"
        },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async meta(args = {}) {
    return (
      await _call(
        {
          request: "v1/meta"
        },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async balance() {
    return (
      await _call(
        { request: "v1/balance" },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async trades(args = {}) {
    return (
      await _call(
        { request: "v1/trades", op: args.op || "both" },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {OfferParams} args - Offer params
   * @return {Offer} - Offer that you ask
   */
  async offer(args) {
    offerSchema.validate(args);
    return (
      await _call(
        {
          request: "v1/offer",
          amount: new BigNumber(args.amount).toFormat(8),
          op: args.op,
          base: "BTC",
          quote: "BRL",
          isQuote: args.isQuote
        },
        this.apiUrl,
        this.apiKey,
        this.apiSecret
      )
    ).data;
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {ConfirmOfferParams} args - Confirm Offer params
   */
  async confirmOffer(args) {
    confirmOfferSchema.validate(args);
    return (
      await _call(
        {
          request: "v1/offer",
          offerId: args.offerId
        },
        this.apiUrl,
        this.apiKey,
        this.apiSecret,
        "POST"
      )
    ).data;
  }
}

module.exports = Biscoint;
