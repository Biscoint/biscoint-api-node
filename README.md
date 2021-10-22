# Biscoint API Node

🌎 This documentation is also available in the following languages: [PT-BR](/README-PTBR.md)

![TypeScript](https://badges.aleen42.com/src/typescript.svg)
![Mocha](https://badges.aleen42.com/src/mocha.svg)
![Node](https://badges.aleen42.com/src/node.svg)

NodeJS library for interacting with [Biscoint](https://biscoint.io/docs/api)'s API. In order to call private methods, you'll need a Biscoint verified account to generate the API key and secret.

Biscoint is a cryptocurrency marketplace that allows trading BTC and another assets in multiple exchanges with a single account.

## Example

Check out [biscoint-arbitrage-bot](https://github.com/Biscoint/biscoint-arbitrage-bot), for it showcases the use of many of the methods in this library in an arbitrage bot application.

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
  // apiTimeout: 9000,
});

```

Optionally, you can uncomment the apiTimeout line to specify the request timeout in milliseconds you want. If not specified the default timeout will be 5000ms.

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

Get Biscoint rate limit of your IP

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
    "id": "D6x63B3q3Mec4tggY",
    "offerId": "aX2Bkd8MseB20Axbkba",
    "op": "buy",
    "base": "BTC",
    "quote": "BRL",
    "baseAmount": "0.01000000",
    "quoteAmount": "362.82",
    "apiKeyId": "BdFABxNakZyxPwnRu",
    "efPrice": "36282.00",
    "date": "2020-01-22T23:25:02.785Z"
  },
  ...
]

```

### Get last trades paginated

---

Returns last 20 trades

```JavaScript
bc.trades({ page: 0, limit: 20, base: 'BTC' });
```

Returns

```JavaScript
{
  "page": 0,
  "totalPages": 2,
  "totalSize": 15,
  "limit": 20,
  "trades": [
    {
      "id": "D6x63B3q3Mec4tggY",
      "offerId": "aX2Bkd8MseB20Axbkba",
      "op": "buy",
      "base": "BTC",
      "quote": "BRL",
      "baseAmount": "0.01000000",
      "quoteAmount": "362.82",
      "apiKeyId": "BdFABxNakZyxPwnRu",
      "efPrice": "36282.00",
      "date": "2020-01-22T23:25:02.785Z"
    },
    ...
  ]
}

```


# Testing

Simple do the following steps

1. Add the following environment variables to your terminal (replace with your own api key and secret)
```bash
API_URL='https://api.biscoint.io/' # tip: this can be null
API_KEY='s4t0sh1n4k4m0t0'
API_SECRET='s4t0sh1n4k4m0t0'
```
2. Run tests
```bash
npm run test
```
or
```
yarn test
```

# PRs are welcome!

If you missed something and would like to see it here, don't be shy and create your first PR. Our recruiters are keeping an eye on those who contribute 👀.
