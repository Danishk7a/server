const connection = require('../../Connection')
const multer = require('multer')


const AddCustomCoin =(req, res)=>{
    let symbol  = req.body.symbol;
    let quantity = req.body.quantity;
    let price = req.body.price;
    
  let sql = `INSERT INTO customcoin (symbol,quantity, price,img) VALUES ("${symbol}", "${quantity}","${price}", "http://localhost:5000/static/images/coinimage/${symbol}.png")`

 connection.query(sql, (err,result)=>{

if(err) throw err;

        res.send('hogyi insert')


  })
    

    
        
            
    }
    
module.exports = AddCustomCoin ;
