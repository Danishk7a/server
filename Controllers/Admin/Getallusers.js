const connection = require('../../Connection')

const Getallusers =(req, res)=>{
  
    connection.query("SELECT * from users",(err, rows, fields)=>{
        if(!err){
        
        res.json(rows);
        
        }else{
        console.log(err);
        }
        
        
        })

    
        





}

module.exports = Getallusers ;