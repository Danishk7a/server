// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();

// ========================admin Controllers==============================
const Getallusers = require('../Controllers/Admin/Getallusers')
const Airdrop = require('../Controllers/Admin/Airdrop')
const AllowUsers =require('../Controllers/Admin/AllowUsers')
const AddCustomCoin = require('../Controllers/Admin/AddCustomCoin')

// ============================Middlewares=================================
const Authjwt = require('../Middlewares/Authjwt');


// ===============================img====================================

const multer = require('multer')
const path =require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'./Public/images/Airdrop/')
    },
    filename:(req,file,cb)=>{
    
        cb(null, "airdrop" + path.extname(file.originalname))
    }

})
const upload = multer({storage:storage})

// =======================img=======================================










//============================= Routes=====================================
router.get('/getallusers',Getallusers)
router.post('/AllowUsers',AllowUsers)
router.post('/airdrop', upload.single('airdrop'),Airdrop)
router.post('/addcustomcoin',AddCustomCoin)

module.exports = router;