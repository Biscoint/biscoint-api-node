import Biscoint from "./biscoint";

const bc = new Biscoint({
  apiUrl: "http://localhost:3000/apiTrade",
  apiKey: "51a685ed8a12d28b30fca95eced21d2349b840e94ab84644bb5d158682e721dd",
  apiSecret: "3741582964006acd7be51f78241f0b642e5eda0972581af65397c5ba27a18048"
});

bc.balance()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

// bc.offer({ amount: "50", base: "BRL", op: "buy" })
//   .then(res => {
//     console.log("getoffer", res);
//     if (res.offerId)
//       bc.confirmOffer({ offerId: res.offerId })
//         .then(res => {
//           console.log("finaloffer", res);
//         })
//         .catch(err => {
//           console.error(err);
//         });
//   })
//   .catch(err => {
//     console.error(err);
//   });
