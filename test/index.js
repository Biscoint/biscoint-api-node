const Biscoint = require("../dist").default;

const expect = require("chai").expect;

const base = "BTC",
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
      "timestamp"
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

/*
describe("private endpoints", () => {
  it("should receive balances", async () => {
    const balance = await api.balance();
    for (const iterator in balance) {
      expect(balance[iterator]).to.be.a("string");
    }
  });
});
*/