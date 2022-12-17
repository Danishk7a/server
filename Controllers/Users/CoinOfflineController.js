const connection = require('../../Connection')

const CoinOfflineController =(req, res)=>{
  
    // let sql = "INSERT INTO users (userid, name) VALUES ('09', 'Helloh')";
    
    // connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });
   


   
   
    connection.query("SELECT * from coinlist",(err, rows, fields)=>{
        if(!err){
        
        res.json(rows);
        
        }else{
        console.log(err);
        }
        
        
        })


    
        
}

module.exports = CoinOfflineController;