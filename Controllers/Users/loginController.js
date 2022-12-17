const connection = require('../../Connection')
const bcrypt = require ('bcrypt');
const {sign} = require('jsonwebtoken')

const loginController = async (req,res)=>{



    // connection.connect(function(err) {
        let email = req.body.email;
    
        connection.query("SELECT * FROM users WHERE email = ? ", [email], function(error, results, fields) {
     

           if(results.length === 0 ){
             return res.status(400).json({status:400, msg:'Please Register first'})

           }else{



            // if(results[0].verified == 0){
            //   return res.send("verifiy yourself first")  
 
            //  }else{
          if(results[0].verified){

            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
              console.log('>>>>>> ', req.body.password)
              console.log('>>>>>> ', results[0].password)
              if(result) {

                 const accesstoken = sign({userid: results[0].userid, email:results[0].email}, "showmethemeaningofbeinglonelythisisthefeelingimeantobe")
               

                 res.cookie("acessToken" , accesstoken, {
                  expires:new Date(Date.now()+3000000),
                  httpOnly:true
                  
                  })



                 res.status(200).json({status: 200, accesstoken:accesstoken})
               
              }
              else {
                return res.status(400).json({status:400,msg:"Enter valid Credentials"});
              }
            })
          



          }else{

          res.json({msg:"verified kro pehle"})

          }

               
              
             
             
             
             
              }






          //  }
        
        
        
          
          
          });
    
      // });





// end
}
module.exports =loginController;