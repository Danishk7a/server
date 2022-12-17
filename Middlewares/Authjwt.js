const {verify} = require('jsonwebtoken')

const Authjwt = (req,res,next)=>{
// const accessToken = req.header('accessToken')
const accessToken = req.cookies.acessToken


if(!accessToken){return res.status(400).json({msg:'not found token'})}

try{
    const validate = verify(accessToken,"showmethemeaningofbeinglonelythisisthefeelingimeantobe")
   
    if(validate) {
        req.token = validate
        return  next();

    }
}catch(err){
    console.log(err)

}


   



    


}

module.exports =Authjwt;