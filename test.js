const Biscoint = require('./index');

const bc = new Biscoint({
  apiKey: 'your api key',
  apiSecret: 'your api secret',
});

bc.ticker({
  amount: 1000
})
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

bc.fees()
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

bc.meta()
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

bc.balance()
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

bc.trades({
  op: 'buy',
  length: 1,
})
  .then((res)=>{
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err)=>{
    console.error(err);
  });

bc.offer({
  amount: 100,
  isQuote: true,
  op: 'buy',
})
  .then((res)=>{
    console.log(JSON.stringify(res, null, 2));
    // bc.confirmOffer({ offerId: res.offerId }).then((res)=>{
    //   console.log(JSON.stringify(res, null, 2));
    // }).catch((err)=>{
    //   console.error(err);
    // });
  })
  .catch((err)=>{
    console.error(err);
  });


bc.offer({
  amount: 100,
  isQuote: true,
  op: 'sell',
})
  .then((res)=>{
    console.log(JSON.stringify(res, null, 2));
    // bc.confirmOffer({ offerId: res.offerId }).then((res)=>{
    //   console.log(JSON.stringify(res, null, 2));
    // }).catch((err)=>{
    //   console.error(err);
    // });
  })
  .catch((err)=>{
    console.error(err);
  });


