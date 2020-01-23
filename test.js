const Biscoint = require("./index");

const bc = new Biscoint({
  apiKey: "qwe",
  apiSecret: "qwe"
});

// bc.offer({
//     amount: 0.01,
//     isQuote: false,
//     op: "buy"
// }).then((res)=>{
//     console.log(res);
//     bc.confirmOffer({ offerId: res.offerId }).then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.error(err);
//     });
// }).catch((err)=>{
//     console.error(err);
// });

bc.fees()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

bc.meta()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

// bc.ticker({
//   amount: 1000
// })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// bc.trades({
//     op: 'buy'
// }).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.error(err);
// });
