const connection = require('../../Connection')
const { client, testClient, Client, Config } = require('coingate-v2');

const WidthrawController =  async (req,res, next)=>{

    const testCongate = testClient('Npk11wrM5snF7ScEidhYdyTxhVEzXu2xxsLqbhiV');

    let refund  = await testCongate.createRefund({order_id: 'you7867', accept: 'application/json'})
  
    console.log(refund)
  
    

}

module.exports = WidthrawController