export = Biscoint;

declare class Biscoint {
  constructor(options?: Biscoint.constructorOptions);
  ticker(options?: {
    base: "BTC";
    quote: "BRL";
    amount: 1000;
  }): Promise<Biscoint.tickerResult>;
  fees(): Promise<Biscoint.feesResult>;
  meta(): Promise<Biscoint.metaResult>;
  balance(): Promise<Biscoint.balanceResult>;
  trades(options: {
    /** operation that you want, returns last 20 */
    op?: Biscoint.op;
    length?: number;
    limit?: number;
    /** if you want pagination, please indicate the page */
    page?: number;
  }): Promise<Biscoint.tradesResult[] | Biscoint.tradesPaginatedResult>;
  offer(options: {
    /** amount that you want to trade */
    amount: Biscoint.numberAsString;
    /** operation */
    op: Biscoint.op;
    /** is currency quote */
    isQuote: Biscoint.isQuote;
  }): Promise<Biscoint.offerResult>;
  confirmOffer(options: {
    offerId: string;
  }): Promise<Biscoint.confirmOfferResult>;
}

declare namespace Biscoint {
  type base = "BTC" | "BRL";
  type quote = "BTC" | "BRL";
  type op = "buy" | "sell";
  type isQuote = boolean;
  /* string with containing a number */
  type numberAsString = string;

  interface constructorOptions {
    apiKey: string;
    apiSecret: string;
    apiUrl?: string;
    apiTimeout?: number;
  }

  interface tickerResult {
    base: base;
    quote: quote;
    vol: numberAsString;
    low: numberAsString;
    high: numberAsString;
    last: numberAsString;
    ask: numberAsString;
    askQuoteAmountRef: numberAsString;
    askBaseAmountRef: numberAsString;
    bid: numberAsString;
    bidQuoteAmountRef: numberAsString;
    bidBaseAmountRef: numberAsString;
    timestamp: string;
  }

  interface metaResult {
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

  interface balanceResult {
    BTC: numberAsString;
    BRL: numberAsString;
  }

  interface tradesResult {
    id: string;
    offerId: string;
    op: op;
    base: base;
    quote: base;
    baseAmount: numberAsString;
    quoteAmount: numberAsString;
    apiKeyId: string;
    efPrice: numberAsString;
    date: numberAsString;
  }

  interface tradesPaginatedResult {
    page: number;
    totalPages: number;
    trades: tradesResult[];
  }

  interface offerResult {
    offerId: string;
    base: Biscoint.base;
    quote: Biscoint.quote;
    isQuote: Biscoint.isQuote;
    baseAmount: numberAsString;
    quoteAmount: numberAsString;
    efPrice: numberAsString;
    createdAt: Date;
    expiresAt: Date;
    apiKeyId: string;
  }

  interface confirmOfferResult {
    offerId: string;
    base: Biscoint.base;
    quote: Biscoint.quote;
    isQuote: Biscoint.isQuote;
    baseAmount: numberAsString;
    quoteAmount: numberAsString;
    efPrice: numberAsString;
    createdAt: Date;
    confirmedAt: Date;
    apiKeyId: string;
  }

  interface feesResult {
    withdrawal: {
      BTC: {
        rate: numberAsString;
        fixed: {
          slow: numberAsString;
          normal: numberAsString;
          fast: numberAsString;
        };
      };
      BRL: {
        rate: numberAsString;
        fixed: {
          ted: numberAsString;
          sameBankTransfer: numberAsString;
        };
      };
    };
  }
}
