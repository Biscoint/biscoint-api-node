import joi from "joi";

export const constructorSchema = joi.object({
  apiKey: joi.string().default(""),
  apiSecret: joi.string().default(""),
  apiUrl: joi
    .string()
    .optional()
    .default("https://api.biscoint.io/"),
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
