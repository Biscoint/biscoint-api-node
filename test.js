const Biscoint = require("./index");

const bc = new Biscoint({
    apiKey: "",
    apiSecret: "",
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

bc.trades().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.error(err);
});