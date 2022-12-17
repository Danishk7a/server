// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();
// =======================img=======================================
const multer = require('multer')
const path =require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'images')
    },
    filename:(req,file,cb)=>{
    
        cb(null,req.token.email + path.extname(file.originalname))
    }

})
const upload = multer({storage:storage})











// ========================Users Controllers==============================
const CoinOfflineController = require('../Controllers/Users/CoinOfflineController');
const adduserController = require('../Controllers/Users/adduserController')
const BuyCoinController = require('../Controllers/Users/BuyCoinController')
const SellCoinController = require('../Controllers/Users/SellCoinController')
const loginController = require('../Controllers/Users/loginController')
const Sendverification = require('../Controllers/Users/Sendverification')
const VerifyUser = require('../Controllers/Users/VerifyUser')
const payment = require('../Controllers/Users/Payment');
const UploadUserDoc = require('../Controllers/Users/UploadUserDocController')
const TestController = require('../Controllers/Users/TestController')
const TradeHistoryController = require('../Controllers/Users/TradeHistoryController')
const ConfirmPaymentController = require('../Controllers/Users/ConfirmPaymentController')
const ShowTradeHistoryController = require('../Controllers/Users/ShowTradeHistoryController')
const ShowWallet = require('../Controllers/Users/ShowWallet')
const TestPurpose = require('../Controllers/Users/TestPurpose')
const AvblController = require('../Controllers/Users/AvblController')
const WidthrawController = require('../Controllers/Users/WidthrawController')

// ============================Middlewares=================================
const Authjwt = require('../Middlewares/Authjwt');
const verifyPay = require('../Middlewares/verifyPay');

//============================= Routes=====================================


router.get('/getcoin',CoinOfflineController)
router.post('/adduser',adduserController)
router.post('/login',loginController)
router.post('/test',Sendverification)
router.post('/VerifyUser',Authjwt,VerifyUser)



// wallet Update
router.post('/buycoin' , Authjwt, BuyCoinController)
router.post('/sellcoin' ,Authjwt, SellCoinController)
router.post('/avbl' ,Authjwt, AvblController)


// Widthrawal
router.post('/Widthraw' ,Authjwt, WidthrawController)




// Transaction Routes
router.post('/addmoney',Authjwt,payment, BuyCoinController)
router.post('/cnpay',Authjwt,ConfirmPaymentController)
router.post('/pay',Authjwt,TestController, TradeHistoryController)


router.post('/uploaduserdoc',Authjwt,upload.single('image'),UploadUserDoc)
router.post('/verifyPay',Authjwt,verifyPay)

// Trade History
router.post('/tradehis',TradeHistoryController)
router.get('/showtrade',Authjwt,ShowTradeHistoryController)
router.get('/showwallet',Authjwt,ShowWallet)
router.get('/testpp',Authjwt,TestPurpose)


module.exports = router;