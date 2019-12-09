# Biscoint API Node

## Install with NPM
```bash
  npm i biscoint-api-node
```
## Install with Yarn
```bash
  yarn add biscoint-api-node
```

```JavaScript
import Biscoint from 'biscoint-api-node';


// configure here with your keys for private calls, public calls don't need valid keys
const bc = new Biscoint({
  apiKey: 's4t0sh1n4k4m0t0',
  apiSecret: 's4t0sh1n4k4m0t0',
});


// get ticker from Biscoint
bc.ticker().then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.error(err);
})

```