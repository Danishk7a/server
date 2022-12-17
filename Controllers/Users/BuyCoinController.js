const connection = require('../../Connection')

const BuyCoinController =(req, res)=>{
  // symbol = "btc"
  // quantity = 50

  symbol = req.body.currency
  quantity = req.body.amount

  var sql = `SELECT * FROM wallet WHERE Userid ='${req.token.userid}'  AND currency ='${symbol}'`;

connection.query(sql,function (err, result) {
     
    if (err) throw err;
    console.log(result.length)
    if(result.length){
      console.log('result hai ')

connection.query('UPDATE wallet SET ? WHERE UserID = ? AND currency = ?', [{ quantity:quantity }, req.token.userid, symbol],(err,result)=>{

  if (err) throw err;
  console.log("updatd")


})




    }
    else{

      console.log("result ni hai")

      var sql = `INSERT INTO wallet ( Userid,quantity, currency) VALUES ("${req.token.userid}","${quantity}", "${symbol}")`;


   connection.query(sql,(err,result)=>{

if(err) throw err;

console.log('new added ')

  
})

   
   
   
   
    }
      
    });


    
        
}

module.exports = BuyCoinController ;















//     // input Filed
//     // fetch from database having USDT  
//     let USDTwallet = 540; 
      
//        let ETHwallet  = 0;
//     //    fetch from server to get ETH price
//        let Current_ETh_price = 80;
//      let User_input_amount = req.body.amount;

//   if(amount<USDTwallet){

//     let numberofcoins  = User_input_amount/Current_ETh_price;

//     let final  = numberofcoins*ETHprice;
//     res.json({msg:`Now you have ${numberofcoins} ETH in your wallet worth $ ${final}`,history:`Credit ${numberofcoins} at $${ETHprice}`})


// }else{

//     res.json({msg:`NO ${amount}`})
 
// }
