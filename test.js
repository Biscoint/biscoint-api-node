const Biscoint = require("./index");

const bc = new Biscoint({
    apiKey: '',
    apiSecret: ''
});

bc.trades().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.error(err);
});