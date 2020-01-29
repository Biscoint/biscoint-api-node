# Biscoint API Node

NodeJS library for interacting with [Biscoint](https://biscoint.io)'s API. In order to call private methods, you'll need a Biscoint verified account to generate the API key and secret.

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

```JavaScript
{
  base: 'BTC',
  quote: 'BRL',
  vol: 0.00155952,
  low: 32061.15,
  high: 32061.15,
  last: 32061.15,
  ask: 32088.7,
  askQuoteAmountRef: 1000,
  askBaseAmountRef: 0.03116362,
  bid: 29961.9,
  bidQuoteAmountRef: 1000,
  bidBaseAmountRef: 0.03337572,
  timestamp: '2019-12-10T20:22:29.172Z'
}
```

### Fees

---

Get Biscoint fees

```JavaScript
bc.fees();
```

Returns

```JavaScript
{
  withdrawal: {
    BTC: {
      rate: "0.0",
      fixed: {
        slow: "0.0001",
        normal: "0.0002",
        fast: "0.0004"
      }
    },
    BRL: {
      rate: "0.0",
      fixed: {
        ted: "14.90",
        sameBankTransfer: "14.90"
      }
    }
  }
}
```

### Rate limits

---

Get Biscoint fees

```JavaScript
bc.meta();
```

Returns

```JavaScript
{
  version: "v1",
  endpoints: {
    ticker: {
      get: {
        type: "public",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 6,
          rate: "6 per 1 minute"
        }
      }
    },
    fees: {
      get: {
        type: "public",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 2,
          rate: "2 per 1 minute"
        }
      }
    },
    meta: {
      get: {
        type: "public",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 2,
          rate: "2 per 1 minute"
        }
      }
    },
    balance: {
      get: {
        type: "private",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 12,
          rate: "12 per 1 minute"
        }
      }
    },
    offer: {
      get: {
        type: "private",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 24,
          rate: "24 per 1 minute"
        }
      },
      post: {
        type: "private",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 24,
          rate: "24 per 1 minute"
        }
      }
    },
    trades: {
      get: {
        type: "private",
        rateLimit: {
          windowMs: 60000,
          maxRequests: 12,
          rate: "12 per 1 minute"
        }
      }
    }
  }
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

```JavaScript
{
  BRL: 5000.00,
  BTC: 0.001
}
```

### Offer

---

Request a new offer for amount, and side that you specify.

```JavaScript
bc.offer({ amount: 0.01, isQuote: false, op: "buy" });
```

Returns

```JavaScript
{
  offerId: "hHaJuKF2m5aD8mZn4",
  base: "BTC",
  quote: "BRL",
  op: "buy",
  isQuote: false,
  baseAmount: "0.01000000",
  quoteAmount: "362.69",
  efPrice: "36269.00",
  createdAt: "2020-01-22T22:39:16.874Z",
  expiresAt: "2020-01-22T22:39:31.874Z",
  apiKeyId: "BdFABxNakZyxPwnRu"
}
```

### Confirm Offer

---

Confirm offer passing an orderId

```JavaScript
bc.confirmOffer({ offerId: "5d9s8w6d12"});
```

Returns

```JavaScript
{
  offerId: "hHaJuKF2m5aD8mZn4",
  base: "BTC",
  quote: "BRL",
  op: "buy",
  isQuote: false,
  baseAmount: "0.01000000",
  quoteAmount: "362.69",
  efPrice: "36269.00",
  createdAt: "2020-01-22T22:39:16.874Z",
  confirmedAt: "2020-01-22T22:39:16.945Z",
  apiKeyId: "BdFABxNakZyxPwnRu"
}
```

### Get last trades

---

Returns last 20 trades

```JavaScript
bc.trades({ op: 'sell' });
```

Returns

```JavaScript
[
  {
    date: 1576522769,
    amount: '0.01718435',
    total: '500.00',
    op: 'sell'
  },
  ...
]

```
