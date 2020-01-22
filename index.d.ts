export = Biscoint;

declare class Biscoint {
  constructor(options?: Biscoint.constructorOptions);
  ticker(options?: {
    base: "BTC";
    quote: "BRL";
    amount: 1000;
  }): Promise<Biscoint.tickerResult>;
  withdrawFees(): Promise<Biscoint.withdrawFeesResult>;
  meta(): Promise<Object>;
  balance(): Promise<Biscoint.balanceResult>;
  trades(options: {
    /** operation that you want, returns last 20 */
    op: Biscoint.op
  }): Promise<Biscoint.tradesResult[]>;
  offer(options: {
    /** amount that you want to trade */
    amount: Number;
    /** operation */
    op: Biscoint.op;
    /** is currency quote */
    isQuote: Biscoint.isQuote;
  }): Promise<Biscoint.offerResult>;
  confirmOffer(options: { offerId: String }): Promise<Biscoint.confirmOfferResult>;
}

declare namespace Biscoint {
  type base = "BTC" | "BRL";
  type quote = "BTC" | "BRL";
  type op = "buy" | "sell";
  type isQuote = true | false;

  interface constructorOptions {
    apiKey: string;
    apiSecret: string;
  }

  interface tickerResult {
    base: base;
    quote: quote;
    vol: Number;
    low: Number;
    high: Number;
    last: Number;
    ask: Number;
    askQuoteAmountRef: Number;
    askBaseAmountRef: Number;
    bid: Number;
    bidQuoteAmountRef: Number;
    bidBaseAmountRef: Number;
    timestamp: String;
  }

  interface balanceResult {
    BTC: Number;
    BRL: Number;
  }

  interface tradesResult {
    date: Number;
    amount: String;
    total: String;
    op: op
  }

  interface offerResult {
    offerId: String;
    base: Biscoint.base;
    quote: Biscoint.quote;
    isQuote: Biscoint.isQuote;
    baseAmount: Number;
    quoteAmount: Number;
    efPrice: Number;
    createdAt: Date;
    expiresAt: String;
    apiKeyId: String;
  }

  interface confirmOfferResult {
    confirmedAt: String;
    baseAmount: Number;
    quoteAmount: Number;
    efPrice: Number;
    offerId: String;
    orderPrice: Number;
    op: op;
  }

  interface withdrawFeesResult{
    slow: Number;
    normal: Number;
    fast: Number;
  }
}