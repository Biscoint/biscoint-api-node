# Biscoint API Node

![TypeScript](https://badges.aleen42.com/src/typescript.svg)
![Mocha](https://badges.aleen42.com/src/mocha.svg)
![Node](https://badges.aleen42.com/src/node.svg)

Biblioteca NodeJS para interagir com a API do [Biscoint](https://biscoint.io/docs/api). Para chamar métodos privados, você precisará de uma conta verificada da Biscoint para gerar a chave e o segredo da API.

Biscoint é um marketplace que permite negociar BTC e outros ativos em várias exchanges com uma única conta.

## Exemplo

Veja o [biscoint-arbitrage-bot](https://github.com/Biscoint/biscoint-arbitrage-bot), pois mostra o uso de muitos dos métodos desta biblioteca em um robô de arbitragem real.

## Instale com NPM

```bash
  npm i biscoint-api-node
```

## Instale com Yarn

```bash
  yarn add biscoint-api-node
```

---

Instancie a classe Biscoint

```JavaScript
import Biscoint from 'biscoint-api-node';


// configure aqui suas chaves, chamas públicas não precisam de chaves válidas
const bc = new Biscoint({
  apiKey: 's4t0sh1n4k4m0t0',
  apiSecret: 's4t0sh1n4k4m0t0',
  // apiTimeout: 9000,
});

```

Opcionalmente, você pode descomentar a linha apiTimeout para especificar o tempo limite da solicitação (timeout) em milissegundos que você deseja. Se não for especificado, o tempo limite padrão será 5000ms.

Todos os métodos retornam uma _promise_.

## Métodos públicos

### Ticker

---

Obtenha o ticker do Biscoint.

```JavaScript
bc.ticker();
```

Retorno

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

Obtenha as taxas do Biscoint.

```JavaScript
bc.fees();
```

Retorno

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

Obtenha o rate-limit para o seu IP.

```JavaScript
bc.meta();
```

Retorno

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

## Métodos privados

### Saldo da conta

---

Obtenha o saldo de sua conta.

```JavaScript
bc.balance();
```

Retorno

```JavaScript
{
  BRL: 5000.00,
  BTC: 0.001
}
```

### Obtenha uma nova Offer

---

Requisita uma nova _Offer_ para o tipo de operação e quantia que você especificar.

```JavaScript
bc.offer({ amount: 0.01, isQuote: false, op: "buy" });
```

Retorno

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

### Confirme uma Offer

---

Confirme a sua _offer_ informando o _offerId_

```JavaScript
bc.confirmOffer({ offerId: "5d9s8w6d12"});
```

Retorno

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

### Obtenha os últimos trades

---

Retorna os últimos 20 trades

```JavaScript
bc.trades({ op: 'sell' });
```

Retorno

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

### Obtenha os últimos trades com paginação

---

Retorna os últimos 20 trades

```JavaScript
bc.trades({ page: 0, limit: 20 });
```

Retorno

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


# Testando

Simplesmente siga os seguintes passos

1. Adicione as seguintes variáveis de ambiente ao seu terminal (substitua por sua própria chave de API e secret)
```bash
API_URL='https://api.biscoint.io/' # dica: a url pode estar vazia
API_KEY='s4t0sh1n4k4m0t0'
API_SECRET='s4t0sh1n4k4m0t0'
```
2. Execute os testes
```bash
npm run test
```
or
```
yarn test
```

# PRs são bem-vindas!!

Se você queria algo e gostaria de ver aqui, não seja tímido e crie sua primeira PR. Nossos recrutadores estão de olho em quem contribui 👀.
