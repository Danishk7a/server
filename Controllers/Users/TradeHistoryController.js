const connection = require('../../Connection')

const TradeHistoryController =(req, res)=>{
let Orderid = 797289  

// let sql = `INSERT INTO transaction-history (userid , Orderid , quantity , amount, currency , type) VALUES("${req.token.userid}","${Orderid}" , "${req.transaction.quantity}" , "${req.transaction.price}" , "${req.transaction.currency}" , ${req.transaction.type})`


let sql = `INSERT INTO transactionhistory (UserId ,Orderid ,quantity ,amount, currency , type) VALUES("${req.body.userid}","${Orderid}" , "${req.body.quantity}" , "${req.body.price}" , "${req.body.currency}" ,"${req.body.type}")`


// let sql = `INSERT INTO transactionhistory (UserId ,Orderid ,quantity ,amount, currency , type) VALUES("34","5092","4522","891782.223","eth","credit")`
    
connection.query(sql,(err, results)=>{
    if(err) throw err;
    console.log("histry add hogyi")


})


// console.log(req.transaction.Price)
        
}

module.exports = TradeHistoryController;