import joi from "joi";

const DEFAULT_API_TIMEOUT_MS = 5000;

export const constructorSchema = joi.object({
  apiKey: joi.string().default(""),
  apiSecret: joi.string().default(""),
  apiUrl: joi
    .string()
    .optional()
    .default("https://api.biscoint.io/"),
  apiTimeout: joi
    .number()
    .precision(0)
    .default(DEFAULT_API_TIMEOUT_MS)
    .optional(),
});

export const tickerSchema = joi.object({
  amount: joi
    .number()
    .precision(8)
    .default("1000.00")
    .cast("string")
    .optional(),

  base: joi
    .string()
    .default("BTC")
    .optional(),

  quote: joi
    .string()
    .default("BRL")
    .optional(),
});

export const getTradesSchema = joi.object({
  op: joi
    .string()
    .valid("buy", "sell")
    .optional(),

  length: joi
    .number()
    .default(10)
    .max(20)
    .min(1)
    .optional(),

  page: joi
    .number()
    .integer()
    .min(0)
    .optional(),
});

export const offerSchema = joi.object({
  base: joi
    .string()
    .default("BTC")
    .optional(),

  amount: joi
    .number()
    .precision(8)
    .cast("string")
    .required(),

  op: joi
    .string()
    .valid("buy", "sell")
    .required(),

  isQuote: joi.boolean().required(),
});

export const confirmOfferSchema = joi.object({
  offerId: joi.string().required(),
});
