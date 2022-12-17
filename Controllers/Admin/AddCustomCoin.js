const connection = require('../../Connection')
const multer = require('multer')
const path =require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'./Public/images/CustomCoin/')
    },
    filename:(req,file,cb)=>{
    
        cb(null, "symbol" + path.extname(file.originalname))
    }

})
const upload = multer({storage:storage})




const AddCustomCoin =(req, res)=>{
    upload.single('symbol')




}

module.exports = AddCustomCoin ;