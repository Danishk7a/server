const connection = require('../../Connection')
const ExternalWithdrawController =(req,res)=>{
let coin = req.body.wcoin;
let amount = req.body.wamount;
let email = req.body.wemail;





// connection.query(`SELECT * FROM wallet WHERE `)


console.log(amount)
console.log(email)
console.log(coin)

res.json({msg:"working hogya sahi h "})







}

module.exports = ExternalWithdrawController;