const connection = require('../../Connection')

const AllowUsers =(req, res)=>{
  

       console.log(req.body.Allow)
       console.log(req.body.email)
       console.log(req.body.userid)


       // if(req.body.Allow){

              connection.query('UPDATE users SET ? WHERE UserID = ?', [{ Active: req.body.Allow }, req.body.userid],(err, rows, fields)=>{
                     if(!err){
                     res.json({msg:'thik h'});
                     
                     }else{
                     console.log(err);
                     }
                     
                     
                     })

       // }else{


              // connection.query('UPDATE users SET ? WHERE UserID = ?', [{ Active: req.body.Allow }, req.body.userid],(err, rows, fields)=>{
              //        if(!err){
              //        res.json({msg:'thik h'});
                     
              //        }else{
              //        console.log(err);
              //        }
                     
                     
              //        })


       // }




}

module.exports = AllowUsers ;