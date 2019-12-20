const Biscoint = require("./index");

const bc = new Biscoint({
    apiKey: "df417ea7ead7e7ae4350d9c0d182cbbf26a323302bc45750d53b075f721d2899",
    apiSecret: "4a867f3413681fee68b744b2ada1d6ba46273914c7f86a77b96e7f226fc14311",
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