// tslint:disable:interface-name
declare module "biscoint-api-node" {
  export default function(options: {
    apiKey: string;
    apiSecret: string;
  }): Biscoint;

  export type base = "BTC" | "BRL";
  export type quote = "BTC" | "BRL";
  export type op = "buy" | "sell";

  export interface Account {
    balances: AssetBalance[];
    buyerCommission: number;
    canDeposit: boolean;
    canTrade: boolean;
    canWithdraw: boolean;
    makerCommission: number;
    sellerCommission: number;
    takerCommission: number;
    updateTime: number;
  }
  export interface TradeFee {
    symbol: string;
    maker: number;
    taker: number;
  }
  export interface TradeFeeResult {
    tradeFee: TradeFee[];
    success: boolean;
  }
  export interface AggregatedTrade {
    aggId: number;
    price: string;
    quantity: string;
    firstId: number;
    lastId: number;
    timestamp: number;
    isBuyerMaker: boolean;
    wasBestPrice: boolean;
  }

  export interface AssetBalance {
    asset: string;
    free: string;
    locked: string;
  }

  export interface tickerResult {
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

  export interface balanceResult {
    BTC: Number;
    BRL: Number;
  }

  export interface offerResult {
    base: base;
    quote: quote;
    amount: Number;
    quoteamount: Number;
    exchange: String;
    offerId: String;
    expires: String;
    timestamp: String;
  }

  export interface confirmOfferResult {
    confirmedAt: String;
    baseAmount: Number;
    quoteAmount: Number;
    efPrice: Number;
    offerId: String;
    orderPrice: Number;
    op: op;
  }

  export interface Biscoint {
    ticker(options: {
      base: "BTC";
      quote: "BRL";
      amount?: Number;
    }): Promise<tickerResult>;
    balance(): Promise<balanceResult>;
    offer(options: {
      amount: Number;
      op: op;
      base: base;
    }): Promise<offerResult>;
    confirmOffer(options: { offerId: String }): Promise<confirmOfferResult>;
  }
}
