export = Biscoint;

declare class Biscoint {
  constructor(options?: Biscoint.constructorOptions);
  ticker(options?: {
    base: "BTC";
    quote: "BRL";
    amount: 1000;
  }): Promise<Biscoint.tickerResult>;
  balance(): Promise<Biscoint.balanceResult>;
  trades(options: {
    /** operation that you want, default will return both buy and sell, last 20 */
    op?: Biscoint.op
  }): Promise<Biscoint.tradesResult[]>;
  offer(options: {
    /** value that you want to trade */
    amount: Number;
    /** operation */
    op: Biscoint.op;
    /** currency base */
    base: Biscoint.base;
  }): Promise<Biscoint.offerResult>;
  confirmOffer(options: { offerId: String }): Promise<Biscoint.confirmOfferResult>;
}

declare namespace Biscoint {
  type base = "BTC" | "BRL";
  type quote = "BTC" | "BRL";
  type op = "buy" | "sell";

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
    base: base;
    quote: quote;
    amount: Number;
    quoteamount: Number;
    exchange: String;
    offerId: String;
    expires: String;
    timestamp: String;
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
}