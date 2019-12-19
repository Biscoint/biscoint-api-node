const Biscoint = require("./index");

const bc = new Biscoint({
    apiKey: "e6534483b0434a42935853c59b84e4b95874bf8f5b7f4477a4cc12602fb2bba8",
    apiSecret: "c03922759353cb86305f26a8950654ab78db4adf2c4c31d9503905820448a679",
    apiUrl: "http://localhost:4000"
});

// bc.offer({
//     amount: 0.01,
//     base: "BTC",
//     op: "buy"
// }).then((res)=>{
//     bc.confirmOffer({ offerId: res.offerId }).then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.error(err);
//     });
// }).catch((err)=>{
//     console.error(err);
// });

bc.ticker().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.error(err);
});