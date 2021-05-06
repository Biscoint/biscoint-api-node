// @ts-ignore
const axios = require('axios');
const createHmac = require('crypto-js/hmac-sha384');
const stringify = require('querystring').stringify;
const joi = require('joi');
const BigNumber = require('bignumber.js');
const Url = require('url');

const GET_NONCE_DELAY_INC_MS = 10;

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
  }
});

const constructorSchema = joi.object({
  apiKey: joi.string().default(''),
  apiSecret: joi.string().default(''),
  apiUrl: joi
    .string()
    .optional()
    .default('https://api.biscoint.io/'),
});

const tickerSchema = joi.object({
  amount: joi
    .number()
    .precision(8)
    .default('1000.00')
    .cast('string')
    .optional(),

  base: joi
    .string()
    .valid('BTC')
    .default('BTC')
    .optional(),

  quote: joi
    .string()
    .valid('BRL')
    .default('BRL')
    .optional(),
});

const getTradesSchema = joi.object({
  op: joi.string()
    .valid('buy', 'sell')
    .optional(),

  length: joi.number()
    .default(10)
    .max(20)
    .min(1)
    .optional(),
});

const offerSchema = joi.object({
  amount: joi
    .number()
    .precision(8)
    .cast('string')
    .required(),

  op: joi
    .string()
    .valid('buy', 'sell')
    .required(),

  isQuote: joi.boolean()
    .required(),
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
 * Biscoint wrapper
 */
class Biscoint {
  /**
   * @memberof Biscoint
   */
  constructor(args = {}) {
    Object.assign(this, joi.attempt(args, constructorSchema));
    this._usNonce = 0;
    this._nextCallDelay = 0;
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {TickerParams} args
   * @return {Object}
   */
  async ticker(args = {}) {
    const params = joi.attempt(args, tickerSchema);

    const res = await this._call('ticker', params, 'GET', false);

    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async fees(args = {}) {
    const res = await this._call('fees', null, 'GET', false);
    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async meta(args = {}) {
    const res = await this._call('meta', null, 'GET', false);
    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async balance() {
    const res = await this._call('balance', null, 'POST', true);
    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @return {Object}
   */
  async trades(args = {}) {
    const params = joi.attempt(args, getTradesSchema);

    const res = await this._call('trades', params, 'POST', true);

    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {OfferParams} args - Offer params
   * @return {Offer} - Offer that you ask
   */
  async offer(args) {
    const params = joi.attempt(args, offerSchema);

    const res = await this._call('offer', params, 'POST', true);

    return res ? res.data : null;
  }

  /**
   * @memberof Biscoint
   * @public
   * @param {ConfirmOfferParams} args - Confirm Offer params
   */
  async confirmOffer(args) {
    const params = joi.attempt(args, confirmOfferSchema);

    const res = await this._call('offer/confirm', params, 'POST', true);

    return res ? res.data : null;
  }

  // PRIVATE

  async _call(endpoint, params = null, method = 'GET', addAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };
    let data = null;
    let nonce = 0;

    const v1Endpoint = `v1/${endpoint}`;
    let url = Url.resolve(this.apiUrl, v1Endpoint);

    if (method === 'GET') {
      url = `${url}${params ? `?${stringify(params)}` : ''}`
    }

    if (method === 'POST') {
      params = params || {};
      data = JSON.stringify(params, Object.keys(params).sort());

      if (addAuth) {
        nonce = await this._getNonce();
        const signedParams = this._sign(endpoint, nonce, data);
        headers['BSCNT-NONCE'] = nonce;
        headers['BSCNT-APIKEY'] = this.apiKey;
        headers['BSCNT-SIGN'] = signedParams;
      }
    }

    const config = {
      url,
      method,
      headers,
      data,
    };

    try {
      return (await axios(config)).data;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          throw error.response.data.message;
        }
        throw error.response.data;
      }
      throw error;
    } finally {
      if (method === 'POST' && addAuth) {
        this._nextCallDelay = Math.max(this._nextCallDelay - GET_NONCE_DELAY_INC_MS, 0);
      }
    }
  }

  // This ensures a minimal amount of time between calls so that the nonce always increases
  // and requests are made in the expected order.
  async _getNonce() {
    const curDelay = this._nextCallDelay;
    this._nextCallDelay += GET_NONCE_DELAY_INC_MS;

    return new Promise((resolve) => {
      setTimeout(() => {
        this._usNonce = (this._usNonce + 1) % 1000;
        const nonce = (Date.now() * 1000 + this._usNonce).toString();
        resolve(nonce);
      }, curDelay);
    });
  }

  _sign(endpoint, nonce, data) {
    const strToBeSigned = `v1/${endpoint}${nonce}${data}`;
    const hashBuffer = Buffer.from(strToBeSigned).toString('base64');

    const signData = createHmac(hashBuffer, this.apiSecret).toString();

    return signData;
  }
}

module.exports = Biscoint;
