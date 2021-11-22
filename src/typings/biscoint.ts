export type OP = "buy" | "sell";

export interface IConstructorParams {
  apiKey?: string;
  apiSecret?: string;
  apiUrl?: string;
  apiTimeout?: number;
}

export interface ITickerParams {
  base?: string;
  quote?: string;
  amount?: 1000;
}

export interface ITickerResult {
  base: string;
  quote: string;
  vol: string;
  low: string;
  high: string;
  last: string;
  ask: string;
  askQuoteAmountRef: string;
  askBaseAmountRef: string;
  bid: string;
  bidQuoteAmountRef: string;
  bidBaseAmountRef: string;
  timestamp: string;
}

export interface IFeesResult {
  withdrawal: {
    [symbol: string]: {
      rate: string;
      fixed: {
        slow?: string;
        normal?: string;
        fast?: string;
        /* only BRL has these properties */
        ted?: string;
        sameBankTransfer?: string;
      };
    };
  };
}

export interface IRateLimit {
  type: "public" | "private";
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    rate: string;
  };
}

export interface IMetaResult {
  version: string;
  endpoints: {
    ticker: {
      get: IRateLimit;
    };
    fees: {
      get: IRateLimit;
    };
    meta: {
      get: IRateLimit;
    };
    balance: {
      post: IRateLimit;
    };
    offer: {
      post: IRateLimit;
    };
    "offer/confirm": {
      post: IRateLimit;
    };
    trades: {
      post: IRateLimit;
    };
  };
}

export interface IBalanceResult {
  /* object with key as currency symbol and value as available amount */
  [symbol: string]: string;
}

export interface ITradesParams {
  /** operation that you want, returns last 20 */
  op?: OP;
  length?: number;
  limit?: number;
  /** if you want pagination, please indicate the page */
  page?: number;
}

export interface ITradesResult {
  id: string;
  offerId: string;
  op: OP;
  base: string;
  quote: string;
  baseAmount: string;
  quoteAmount: string;
  apiKeyId: string;
  efPrice: string;
  date: Date;
}

export interface IPaginatedTradesResult {
  page: number;
  totalPages: number;
  trades: ITradesResult[];
}

export interface IOfferParams {
  /** base currency that you want to trade. ie: BTC */
  base: string;
  /** amount that you want to trade */
  amount: string;
  /** operation */
  op: OP;
  /** is currency quote */
  isQuote: boolean;
}

export interface IOfferResult {
  offerId: string;
  base: string;
  quote: string;
  op: OP;
  isQuote: boolean;
  baseAmount: string;
  quoteAmount: string;
  efPrice: string;
  createdAt: Date;
  expiresAt: Date;
  apiKeyId: string;
}

export interface IConfirmOfferParams {
  offerId: string;
}

export interface IConfirmOfferResult {
  offerId: string;
  base: string;
  quote: string;
  op: OP;
  isQuote: boolean;
  baseAmount: string;
  quoteAmount: string;
  efPrice: string;
  createdAt: Date;
  confirmedAt: Date;
  apiKeyId: string;
}
