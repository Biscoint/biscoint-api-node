# Biscoint API Node

## Install with NPM

```bash
  npm i biscoint-api-node
```

## Install with Yarn

```bash
  yarn add biscoint-api-node
```

---

Instantiate Biscoint class

```JavaScript
import Biscoint from 'biscoint-api-node';


// configure here with your keys for private calls, public calls don't need valid keys
const bc = new Biscoint({
  apiKey: 's4t0sh1n4k4m0t0',
  apiSecret: 's4t0sh1n4k4m0t0',
});

```

All methods return a Promise.

## Public methods

### Ticker
---
Get Biscoint ticker
```JavaScript
bc.ticker();
```
Returns
```JSON
{
    "base": "BTC",
    "quote": "BRL",
    "vol": 2.706313,
    "low": 33284,
    "high": 34587,
    "last": 34083.4,
    "ask": 34084.08,
    "askQuoteAmountRef": 1000,
    "askBaseAmountRef": 0.02933921,
    "bid": 33840.8,
    "bidQuoteAmountRef": 1000,
    "bidBaseAmountRef": 0.02955013,
    "timestamp": "2019-09-27T17:46:38.453Z",
  }
```

## Private methods

### Balance

---

Get your account balance

```JavaScript
bc.balance();
```

Returns

```JSON
{
  "brl": 5000.00,
  "btc": 0.001
}
```

### Offer

---

Request a new offer for amount, base and side that you specify.

```JavaScript
bc.offer({amount: 0.001, base: "BTC", op: "buy"});
```

Returns

```JSON
{
  "base": "BTC",
  "quote": "BRL",
  "amount": 0.001,
  "quoteAmount": 51,
  "exchange": "Foxbit",
  "offerId": "5d9s8w6d12",
  "expires": "2019-09-27T17:46:43.453Z",
  "timestamp": "2019-09-27T17:46:38.453Z",
}
```

### Confirm Offer

---

Confirm offer passing an orderId

```JavaScript
bc.confirmOffer({ offerId: "5d9s8w6d12"});
```

Returns

```JSON

```
