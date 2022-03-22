const Biscoint = require("../dist").default;

const expect = require("chai").expect;

const base = "ETH",
  quote = "BRL";

const api = new Biscoint({
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

describe("public endpoints", () => {
  it("should receive ticker", async () => {
    const ticker = await api.ticker({ base, quote });
    expect(ticker).to.have.all.keys(
      "base",
      "quote",
      "vol",
      "low",
      "high",
      "last",
      "ask",
      "askQuoteAmountRef",
      "askBaseAmountRef",
      "bid",
      "bidQuoteAmountRef",
      "bidBaseAmountRef",
      "timestamp",
    );
    expect(ticker.base).to.be.equal(base);
    expect(ticker.quote).to.be.equal(quote);
  });

  it("should receive fees", async () => {
    const ticker = await api.fees();
    expect(ticker).to.have.all.keys("withdrawal");
  });

  it("should receive meta", async () => {
    const ticker = await api.meta();
    expect(ticker).to.have.all.keys("version", "endpoints");
  });
});

describe("private endpoints", () => {
  it("should receive balances", async () => {
    const balance = await api.balance();
    for (const iterator in balance) {
      expect(balance[iterator]).to.be.a("string");
    }
  });

  it(`should request an ${base} offer`, async () => {
    const offer = await api.offer({
      base,
      amount: 50,
      isQuote: true,
      op: "buy",
    });

    expect(offer).to.have.all.keys(
      "offerId",
      "base",
      "quote",
      "op",
      "isQuote",
      "baseAmount",
      "quoteAmount",
      "efPrice",
      "createdAt",
      "expiresAt",
      "apiKeyId",
    );

    expect(offer.base).to.eq("ETH");
  });
});

describe("ETH get and confirm offer test suit", () => {
  let offer;

  before(async () => {
    offer = await api.offer({
      base: "ETH",
      amount: 50,
      isQuote: true,
      op: "buy",
    });
  });

  it("confirm offer", async () => {
    const confirmOffer = await api.confirmOffer({
      offerId: offer.offerId,
    });

    expect(confirmOffer).to.have.all.keys(
      "offerId",
      "base",
      "quote",
      "op",
      "isQuote",
      "baseAmount",
      "quoteAmount",
      "efPrice",
      "createdAt",
      "confirmedAt",
      "apiKeyId",
    );

    expect(offer.base).to.be.eq(confirmOffer.base);
    expect(offer.baseAmount).to.be.eq(confirmOffer.baseAmount);
    expect(offer.quoteAmount).to.be.eq(confirmOffer.quoteAmount);
  });
});

describe("BTC get and confirm offer test suit", () => {
  let offer;

  before(async () => {
    offer = await api.offer({
      base: "BTC",
      amount: 50,
      isQuote: true,
      op: "buy",
    });
  });

  it("confirm offer", async () => {
    const confirmOffer = await api.confirmOffer({
      offerId: offer.offerId,
    });

    expect(confirmOffer).to.have.all.keys(
      "offerId",
      "base",
      "quote",
      "op",
      "isQuote",
      "baseAmount",
      "quoteAmount",
      "efPrice",
      "createdAt",
      "confirmedAt",
      "apiKeyId",
    );

    expect(offer.base).to.be.eq(confirmOffer.base);
    expect(offer.baseAmount).to.be.eq(confirmOffer.baseAmount);
    expect(offer.quoteAmount).to.be.eq(confirmOffer.quoteAmount);
  });
});

describe("[user request] proper float precision working", async () => {
  let baseAmount;
  it("buying precision", async () => {
    const buyOffer = await api.offer({
      base: "ETH",
      amount: "2000",
      op: "buy",
      isQuote: true,
    });
    const buyConfirm = await api.confirmOffer({ offerId: buyOffer.offerId });
  
    baseAmount = buyConfirm.baseAmount;

    expect(buyOffer.baseAmount).to.be.eq(buyConfirm.baseAmount);
    
    expect(buyOffer.baseAmount).to.match(/^\d+(\.\d{12})?$/);
    expect(buyConfirm.baseAmount).to.match(/^\d+(\.\d{12})?$/);

    expect(buyOffer.baseAmount).not.to.match(/[0]{4}$/);
    expect(buyConfirm.baseAmount).not.to.match(/[0]{4}$/);
  });

  it("selling precision", async () => {
    const sellOffer = await api.offer({
      base: "ETH",
      amount: baseAmount,
      op: "sell",
      isQuote: false,
    });
    const sellConfirm = await api.confirmOffer({ offerId: sellOffer.offerId });

    expect(sellOffer.baseAmount).to.be.eq(sellConfirm.baseAmount);

    expect(sellOffer.baseAmount).to.match(/^\d+(\.\d{12})?$/);
    expect(sellConfirm.baseAmount).to.match(/^\d+(\.\d{12})?$/);

    expect(sellOffer.baseAmount).not.to.match(/[0]{4}$/);
    expect(sellConfirm.baseAmount).not.to.match(/[0]{4}$/);
  });

  it("[extrapolating BTC buying precision] - it should pass 15 decimal places and receive 8", async () => {
    const buyOffer = await api.offer({
      base: "BTC",
      amount: 0.123456789012345,
      op: "buy",
      isQuote: false,
    });
    const buyConfirm = await api.confirmOffer({ offerId: buyOffer.offerId });

    expect(buyOffer.baseAmount).to.be.eq(buyConfirm.baseAmount);
    expect(buyOffer.quoteAmount).to.be.eq(buyConfirm.quoteAmount);

    expect(buyOffer.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);
    expect(buyConfirm.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);

    expect(buyOffer.baseAmount).to.match(/^\d+(\.\d{8})?$/);
    expect(buyConfirm.baseAmount).to.match(/^\d+(\.\d{8})?$/);
  });

  it("[extrapolating BTC selling precision] - it should pass 15 decimal places and receive 8", async () => {
    const sellOffer = await api.offer({
      base: "BTC",
      amount: 0.123456789012345,
      op: "sell",
      isQuote: false,
    });
    const sellConfirm = await api.confirmOffer({ offerId: sellOffer.offerId });

    expect(sellOffer.baseAmount).to.be.eq(sellConfirm.baseAmount);
    expect(sellOffer.quoteAmount).to.be.eq(sellConfirm.quoteAmount);

    expect(sellOffer.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);
    expect(sellConfirm.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);

    expect(sellOffer.baseAmount).to.match(/^\d+(\.\d{8})?$/);
    expect(sellConfirm.baseAmount).to.match(/^\d+(\.\d{8})?$/);
  });

  it("[extrapolating ETH buying precision] - it should pass 15 decimal places and receive 12", async () => {
    const buyOffer = await api.offer({
      base: "ETH",
      amount: 0.123456789012345,
      op: "buy",
      isQuote: false,
    });
    const buyConfirm = await api.confirmOffer({ offerId: buyOffer.offerId });

    expect(buyOffer.baseAmount).to.be.eq(buyConfirm.baseAmount);
    expect(buyOffer.quoteAmount).to.be.eq(buyConfirm.quoteAmount);

    expect(buyOffer.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);
    expect(buyConfirm.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);

    expect(buyOffer.baseAmount).to.match(/^\d+(\.\d{12})?$/);
    expect(buyConfirm.baseAmount).to.match(/^\d+(\.\d{12})?$/);
  });

  it("[extrapolating ETH selling precision] - it should pass 15 decimal places and receive 12", async () => {
    const sellOffer = await api.offer({
      base: "ETH",
      amount: 0.123456789012345,
      op: "sell",
      isQuote: false,
    });
    const sellConfirm = await api.confirmOffer({ offerId: sellOffer.offerId });

    expect(sellOffer.baseAmount).to.be.eq(sellConfirm.baseAmount);
    expect(sellOffer.quoteAmount).to.be.eq(sellConfirm.quoteAmount);

    expect(sellOffer.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);
    expect(sellConfirm.baseAmount).not.to.match(/^\d+(\.\d{15})?$/);

    expect(sellOffer.baseAmount).to.match(/^\d+(\.\d{12})?$/);
    expect(sellConfirm.baseAmount).to.match(/^\d+(\.\d{12})?$/);
  });

  it.only("[Date typing on user demand] Verifies the type of trades' dates", async () => {
    const trades = await api.trades();
    
    expect(new Date(trades[0].date).toISOString()).to.be.equal(trades[0].date);
  });
});
