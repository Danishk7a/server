const connection = require('../../Connection')
const bcrypt = require ('bcrypt');
const uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
const nodemailer = require("nodemailer");
const {sign} = require('jsonwebtoken')

const adduserController = async (req,res)=>{

// generate unique ID for users
 const userId =  uuidv4()
         
  




// convert passwrd to hash
const salt = await bcrypt.genSalt(10);
password = await bcrypt.hash(req.body.password, salt);



connection.query("SELECT * FROM users WHERE email = ? ", [req.body.email], function(error, results, fields) {

      if(error) throw error;

    if(results.length === 0){
     
      
      var sql = `INSERT INTO users ( userid,name, email, password, Active, Role, verified) VALUES ("${userId}","${req.body.name}", "${req.body.email}","${password}","0","0","0")`;


  
      connection.query(sql, function (err, result) {
        if (err) { res.json({status:500, msg:'Server Busy'})};
        console.log("1 record inserted, ID: " + result.insertId);
       
        const accesstoken = sign({userid:userId , email:req.body.email}, "showmethemeaningofbeinglonelythisisthefeelingimeantobe")
        // res.json({status:200,msg:'success',accesstoken:accesstoken})

        res.cookie("acessToken" , accesstoken, {
          expires:new Date(Date.now()+3000000),
          httpOnly:true
          
          })



         res.status(200).json({status: 200, accesstoken:accesstoken})


        let code  =  Math.floor(100000 + Math.random() * 900000)
        
        
        connection.query(`SELECT * FROM emailverification WHERE email = "${req.body.email}"` ,(errrr, result)=>{

console.log("first err chance")
console.log(result)
          if(result.length){

            console.log("2 err chance")



            var sql = `UPDATE  emailverification SET  UserId="${userId}", vcode="${code}" WHERE  email="${req.body.email}" `;

            connection.query(sql, function (errr, result) {
                  if (errr) {throw errr}else{
          
                    console.log("1 record inserted, ID: " + result.insertId);
                    
                    let transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'danish.k7a@gmail.com',
                        pass: 'gzsmjbpllltuiqag'
                      }
                    });
              
                    
                    
                    var mailOptions = {
                      from: 'danish.k7a@gmail.com',
                      to: req.body.email,
                      subject: 'Verification Code',
                      // text: `here is your ${code}`
                      html:`<div><h1>Code : ${code}</h1></div>`
                
                
                    };
                   
                
                  
                
                
                    
                try{
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log("Hi" + error);
                      res.status(400).send("email failed")
                    } else {
                      // res.send('email sent')
                      console.log('Email sent: ' + info.response);
                      
                        // res.status(200).send("new user added") 
                        res.json({status:200 , msg:'success'})
                    }
                  }); 
                }catch(e){
              
                  print(e)
              
                }
                
          
          
          
                  }
                  
                });
                








          }else{

            var sql = `INSERT INTO emailverification ( UserId, email, vcode) VALUES ("${userId}", "${req.body.email}","${code}")`;  
  connection.query(sql, function (errr, result) {
        if (errr) {throw errr}else{

          console.log("1 record inserted, ID: " + result.insertId);
          
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'danish.k7a@gmail.com',
              pass: 'gzsmjbpllltuiqag'
            }
          });
    
          
          
          var mailOptions = {
            from: 'danish.k7a@gmail.com',
            to: req.body.email,
            subject: 'Verification Code',
            // text: `here is your ${code}`
            html:`<div><h1>Code : ${code}</h1></div>`
      
      
          };
         
      
        
      
      
          
      try{
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log("Hi" + error);
            res.status(400).send("email failed")
          } else {
            // res.send('email sent')
            console.log('Email sent: ' + info.response);
            
              // res.status(200).send("new user added") 
              res.json({status:200 , msg:'success'})
          }
        }); 
      }catch(e){
    
        print(e)
    
      }
      



        }
        
      });
      


          }



        })
        
        
        






        
      });
    
      
  


      
     
    }else{
      return res.json({status:400,msg:'User Already Exists'})  

          
 


      
    }
    
  
  
  
 
 
 
  })







    // const Sendverification = ()=>{




  
     
  
  
  
  
  
  
  
  // }




  




  




// end
}
module.exports =adduserController;