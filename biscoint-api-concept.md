# Biscoint API Concept

## Base URL
```
  https://biscoint.io/
```

# Public methods

## Ticker

```
  https://biscoint.io/api/ticker
```

Method: **GET**

Params

* base: **BTC** // base currency
* quote: **BRL** // quote currency

Example

```
  GET https://biscoint.io/api/ticker?base=BTC&quote=BRL
```

Response

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

# Private methods

## How to Authenticate your GET request using JavaScript

```JavaScript
  import axios from "axios"; // we strongly recommend you to use axios
  import crypto from "crypto";
  import { stringify } from "querystring";

  const args = { request: "/v1/balance" }; // params

  const toBase64 = Buffer.from(JSON.stringify(args)).toString("base64");
  const sign = crypto
    .createHmac(
      "sha256",
      "f05bc63d5bcf7a3770ac7b2bc85f450843cd22a75b2d0abc2d0647599975c40b" // your secret
    )
    .update(toBase64)
    .digest("hex");

  const config = {
    method: "GET",
    url: "http://biscoint.io/apiTrade/v1/balance?" + stringify(args),
    headers: {
      "BSCNT-SIGN": sign,
      "BSCNT-APIKEY":
        "2c7367f3bc807ac965bc6fb4c09f23d2f11a2aac23713ad23f9f4dee7d7a2d0f" // your api key
    }
  };

  axios(config)
    .then(res => {
      console.log(res.data); // result
    })
    .catch(err => {
      console.error(err); // if an error occur
    });

```

## Get user balance
```
  https://biscoint.io/apiTrade/v1/balance
```

Method: **GET**

Query:
* request: **String** // api path that you will request

Headers:
* BSCNT-APIKEY: **String**// your API key generated at Biscoint App
* BSCNT-SIGN: **String** // signature that you generate following the example

Example

```
  GET https://biscoint.io/apiTrade/v1/balance

  Params:
  {
    request: "/v1/balance"
  }

  Headers: {
    "BSCNT-SIGN": "572f966c6ec4df58f51bf6ae990c81ab9f8eb6d789c4d49792ffe0312588dc10",
    "BSCNT-APIKEY": "2c7367f3bc807ac965bc6fb4c09f23d2f11a2aac23713ad23f9f4dee7d7a2d0f"
  }

```

Response

```JSON
  {
    "message": "ok", // in future we'll use this label to send importante notices
    "data": {
      "brl": 5000.00,
      "btc": 0.001
    }
  }
```

## How to Authenticate your POST request using JavaScript

```JavaScript
  import axios from "axios"; // we strongly recommend you to use axios
  import crypto from "crypto";
  import { stringify } from "querystring";

  const args = { request: "/v1/balance" }; // params

  const toBase64 = Buffer.from(JSON.stringify(args)).toString("base64");
  const sign = crypto
    .createHmac(
      "sha256",
      "f05bc63d5bcf7a3770ac7b2bc85f450843cd22a75b2d0abc2d0647599975c40b" // your secret
    )
    .update(toBase64)
    .digest("hex");

  const config = {
    method: "GET",
    url: "http://biscoint.io/apiTrade/v1/offer",
    headers: {
      "BSCNT-SIGN": sign,
      "BSCNT-APIKEY":
        "2c7367f3bc807ac965bc6fb4c09f23d2f11a2aac23713ad23f9f4dee7d7a2d0f" // your api key
    },
    data: args // using axios, data mean body in any other POST request
  };

  axios(config)
    .then(res => {
      console.log(res.data); // result
    })
    .catch(err => {
      console.error(err); // if an error occur
    });

```

## Request offer
```
  POST https://biscoint.io/apiTrade/v1/offer
```

Method: **POST**

Body:
* request: **String** // api path that you will request
* amount: **String** // amount in BTC or BRL that you want to trade
* base: **String** // reference currency symbol "BTC" or "BRL"
* op: **String** // "buy" or "sell"

Headers:
* BSCNT-APIKEY: **String**// your API key generated at Biscoint App
* BSCNT-SIGN: **String** // signature that you generate following the example

### Base field explained:
If you want to buy 1000 BRL in "BRL" you'll need to pass BRL in base field, to buy 0.001 BTC you'll need to pass "BTC".

Example
```JSON
  POST https://biscoint.io/apiTrade/v1/offer

  Body: {
    request: "/v1/offer",
    amount: "0.001",
    base: "BTC",
    op: "buy"
  }

  Headers: {
    "BSCNT-SIGN": "572f966c6ec4df58f51bf6ae990c81ab9f8eb6d789c4d49792ffe0312588dc10",
    "SCNT-APIKEY": "ApiKey 2c7367f3bc807ac965bc6fb4c09f23d2f11a2aac23713ad23f9f4dee7d7a2d0f"
  }
```
Response

```JSON
{
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
}
```

## Request final offer
```
  POST https://biscoint.io/apiTrade/v1/confirmOffer
```

Method: **POST**

Body:
* request: **String** // api path that you will request
* offerId: **String** // offer that you requested before

Headers:
* BSCNT-APIKEY: **String**// your API key generated at Biscoint App
* BSCNT-SIGN: **String** // signature that you generate following the example

Example
```JSON
  POST https://biscoint.io/apiTrade/v1/confirmOffer

  Body: {
    request: "/v1/confirmOffer",
    offerId: "0.001"
  }

  Headers: {
    "BSCNT-SIGN": "572f966c6ec4df58f51bf6ae990c81ab9f8eb6d789c4d49792ffe0312588dc10",
    "SCNT-APIKEY": "ApiKey 2c7367f3bc807ac965bc6fb4c09f23d2f11a2aac23713ad23f9f4dee7d7a2d0f"
  }
```
Response

```JSON
{
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
}
```