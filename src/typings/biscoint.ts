export type OP = "buy" | "sell";

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
    BTC: {
      rate: string;
      fixed: {
        slow: string;
        normal: string;
        fast: string;
      };
    };
    BRL: {
      rate: string;
      fixed: {
        ted: string;
        sameBankTransfer: string;
      };
    };
  };
}

export interface IMetaResult {
  version: string;
  endpoints: {
    ticker: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
    };
    fees: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
    };
    meta: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
    };
    balance: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
    };
    offer: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
      post: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
    };
    trades: {
      get: {
        type: string;
        rateLimit: {
          windowMs: number;
          maxRequests: number;
          rate: string;
        };
      };
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
  date: string;
}

export interface IPaginatedTradesResult {
  page: number;
  totalPages: number;
  trades: ITradesResult[];
}

export interface IOfferParams {
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
  base: boolean;
  quote: boolean;
  isQuote: boolean;
  baseAmount: string;
  quoteAmount: string;
  efPrice: string;
  createdAt: Date;
  confirmedAt: Date;
  apiKeyId: string;
}
