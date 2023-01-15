const LogOutController = async (req,res)=>{



                 res.cookie("acessToken" , null, {
                  expires:new Date(Date.now()+300),
                  httpOnly:true
                  
                  })

                res.json({msg:"hello logout"})
    
               
            


}
module.exports =LogOutController;