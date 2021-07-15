const Biscoint = require('./index');

const bc = new Biscoint({
  apiKey: '015e69836fc6001f1ff30c5cd14454449e04072b5a4b8c1d32023c42ffd2f579',
  apiSecret: '3f31b4c167f1acad1a8fd94eff45d72e14da0f26bbe37ae7d68d282d6b0867da',
  apiUrl: 'http://localhost:4000/'
});

bc.trades({
  op: 'buy',
  length: 1,
  page: 0
})
  .then((res)=>{
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err)=>{
    console.error(err);
  });
