# Biscoint API Node

## Install with NPM
```
  npm i biscoint-api-node
```
## Install with Yarn
```
  yarn add biscoint-api-node
```

```
import Biscoint from 'biscoint-api-node';

const bc = new Biscoint({
  apiKey: 'ihihijiijijijijiji',
  apiSecret: 'uhuhuhuhuhuhuhuhu',
});


bc.balance().then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.error(err);
})

```