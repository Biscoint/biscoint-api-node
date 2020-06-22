export = Biscoint;

declare class Biscoint {
  constructor(options?: Biscoint.constructorOptions);
  ticker(options?: {
    base: "BTC";
    quote: "BRL";
    amount: 1000;
  }): Promise<Biscoint.tickerResult>;
  fees(): Promise<Biscoint.feesResult>;
  meta(): Promise<Object>;
  balance(): Promise<Biscoint.balanceResult>;
  trades(options: {
    /** operation that you want, returns last 20 */
    op: Biscoint.op;
  }): Promise<Biscoint.tradesResult[]>;
  offer(options: {
    /** amount that you want to trade */
    amount: Biscoint.numberAsString;
    /** operation */
    op: Biscoint.op;
    /** is currency quote */
    isQuote: Biscoint.isQuote;
  }): Promise<Biscoint.offerResult>;
  confirmOffer(options: {
    offerId: String;
  }): Promise<Biscoint.confirmOfferResult>;
}

declare namespace Biscoint {
  type base = "BTC" | "BRL";
  type quote = "BTC" | "BRL";
  type op = "buy" | "sell";
  type isQuote = Boolean;
  /* string with containing a number */
  type numberAsString = String;

  interface constructorOptions {
    apiKey: String;
    apiSecret: String;
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
    timestamp: String;
  }

  interface balanceResult {
    BTC: numberAsString;
    BRL: numberAsString;
  }

  interface tradesResult {
    date: numberAsString;
    amount: String;
    total: String;
    op: op;
  }

  interface offerResult {
    offerId: String;
    base: Biscoint.base;
    quote: Biscoint.quote;
    isQuote: Biscoint.isQuote;
    baseAmount: numberAsString;
    quoteAmount: numberAsString;
    efPrice: numberAsString;
    createdAt: Date;
    expiresAt: Date;
    apiKeyId: String;
  }

  interface confirmOfferResult {
    confirmedAt: Date;
    baseAmount: numberAsString;
    quoteAmount: numberAsString;
    efPrice: numberAsString;
    offerId: String;
    orderPrice: numberAsString;
    op: op;
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
