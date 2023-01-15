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
  // callback_url = 'http://localhost:5000/callback'

 const order =  await testCongate.createOrder({
  order_id, price_amount, price_currency, receive_currency,callback_url
    });


res.json(order)
console.log(order);


return next();


  
    

}

module.exports = Payment