const connection = require('../../Connection')




const VerifyUser = async (req,res)=>{


 

connection.query("SELECT * FROM emailverification WHERE email = ? ", [req.token.email], function(error, results, fields) {
     
    console.log("yaha thik hai")
    if(results[0].vcode == req.body.code){
        console.log("yaha tk toh thik hai")
        connection.query("UPDATE users SET verified = '1' WHERE email = ?" , [req.token.email] , (err,result, fields)=>{
            if(!err){
                return res.json({status:200, msg:'success udate'})
                console.log('hogya bhai tension mt le')
            }else{
                return res.json({status:400, msg:'error'})
                console.log("pta ni bro")
            }
        })

       
    
    
    
    
    }else{

        return res.json({msg:'invalid code'})
        console.log("aayi kch maut")
     }

    })



}
module.exports =VerifyUser;






