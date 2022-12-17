// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();

// ========================Users Controllers==============================
const HomeController = require('../Controllers/Home/HomeController');


//============================= Routes=====================================
router.get('/',HomeController);









module.exports = router;