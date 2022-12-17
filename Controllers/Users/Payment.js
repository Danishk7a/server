const connection = require('../../Connection')
const { client, testClient, Client, Config } = require('coingate-v2');
// const sdk = require('api')('@coingate/v2#1hdfju4ml7en5i8t');
const Payment =  async (req,res, next)=>{

   let amount  = req.body.amount;
   let currency = req.body.currency;

  const testCongate = testClient('Npk11wrM5snF7ScEidhYdyTxhVEzXu2xxsLqbhiV');
  order_id = 'you7867'
  price_amount = amount
  price_currency = currency
  receive_currency = 'ETH'
  // callback_url = 'http://localhost:5000/cnpay'
  callback_url = 'https://bcex.requestcatcher.com/'

 const order =  await testCongate.createOrder({
  order_id, price_amount, price_currency, receive_currency,callback_url
    });


// //     const sdk = require('api')('@coingate/v2#fRps8aPyF6cF6SWLAKzpYsG1bbcZX42dZT5PnHDH');

// // sdk.checkout({id: order.order_id, accept: 'application/json'})
// //   .then(({ data }) => console.log(data))
// //   .catch(err => console.error(err));

res.json(order)
return next();

console.log(order);
  
    

}

module.exports = Payment