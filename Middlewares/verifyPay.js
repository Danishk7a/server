const connection = require('../Connection')
const axios  = require('axios');
const { compareSync } = require('bcrypt');
const verifyPay = (req,res,next)=>{

// console.log(req.body.symbol)
// console.log(req.body.amount)
let amount = req.body.amount;
let symbol = req.body.symbol;
let backedCoin = symbol.substr(symbol.length - 4);
let rawSymbol = symbol.substring(0, symbol.length - 4);
// console.log("Backed :" + backedCoin)
// console.log("Symbol :" + rawSymbol)

connection.query(`SELECT * FROM wallet WHERE Userid ='${req.token.userid}'  AND currency ='${backedCoin}'`, (err,result)=>{

if(err) throw err;
if(result.length){

    axios.get(`https://stablecoinstats.com/api/summary/${backedCoin.toUpperCase()}`)
    .then((response) => {
      let data = response.data
      // let Coinprice  = data.price * 81.52;
      let Coinprice = 81;
     

      if(result[0].quantity * Coinprice > amount){
        // console.log(Coinprice)
        // console.log(result[0].quantity * Coinprice)
        // console.log(amount)

      let newAmount =   result[0].quantity*Coinprice - amount;
      let newQuantity = newAmount / Coinprice
      // console.log("new added dekho : "+ newQuantity)
       
        connection.query(`START TRANSACTION`,(err, res)=>{
            if(err) throw err;
           

            let sql  = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;
            connection.query(sql,[{quantity:newQuantity} , req.token.userid , backedCoin],(err,result)=>{
             if(err) throw err;
             console.log('hogya ')
             
             let sqll = `SELECT * FROM wallet WHERE  UserId='${req.token.userid}' AND currency = '${rawSymbol}' `
             connection.query(sqll , (err,result)=>{
       
               
              if(result.length){
                axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${symbol.toUpperCase()}`).then((res)=>{
                  console.log(res.data)
                  let Xprice = 1155.86;
                  let newrawquan = amount / Xprice;
                  
                  let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;
                  connection.query(sql,[{quantity:newrawquan}, req.token.userid, rawSymbol],(err,res)=>{

                      connection.query(`COMMIT`)




                  })
                       
       
             
             })




              }
              
              
           
       
       
       
       
       
       
             })
       
       
       
            } )





          
        })

    





        }







    });


    // connection.query('UPDATE wallet SET ? WHERE UserID = ?', [{ quantity:quantity }, req.token.userid],(err,result)=>{

    //     if (err) throw err;
    //     console.log("updatd")
      
      
    //   })



}



})





}

module.exports =verifyPay;