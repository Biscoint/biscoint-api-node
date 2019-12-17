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
  brl: 5000.00,
  btc: 0.001
}
```

### Offer

---

Request a new offer for amount, base and side that you specify.

```JavaScript
bc.offer({amount: 0.001, base: "BTC", op: "buy"});
```

Returns

```JavaScript
{
  baseAmount: '0.00155952',
  quoteAmount: '50.00',
  efPrice: '32061.15',
  exchangeFees: '0.00',
  exchangeId: 'brasilbitcoin',
  orderPrice: '30378.90',
  offerId: 'YMrgz8FoWNtr4r6iA',
  userId: 'uxKCdt5Qd7Nt9eYSp',
  base: 'BTC',
  quote: 'BRL',
  op: 'buy',
  createdAt: '2019-12-10T20:21:32.440Z',
  expiresAt: '2019-12-10T20:21:47.440Z',
  isFinal: false,
  isQuote: true
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
  confirmedAt: '2019-12-10T20:21:32.629Z',
  baseAmount: '0.00155952',
  quoteAmount: '50.00',
  efPrice: '32061.15',
  offerId: 'YMrgz8FoWNtr4r6iA',
  orderPrice: '30378.90',
  op: 'buy'
}
```

### Get last trafes

---

Returns last 20 trades

```JavaScript
bc.trades();
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