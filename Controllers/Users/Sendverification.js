const connection = require('../../Connection')
const bcrypt = require ('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid')
const nodemailer = require("nodemailer");

const Sendverification = ()=>{




    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'danish.k7a@gmail.com',
        pass: 'gzsmjbpllltuiqag'
      }
    });
    code  = Math.floor(100000 + Math.random() * 900000)
    var mailOptions = {
      from: 'danish@khan.com',
      to: req.body.email,
      subject: 'Verification Code',
      // text: `here is your ${code}`
      html:`<div><h1>Code : ${code}</h1></div>`


    };

    userId = 989798;
var sql = `INSERT INTO emailverification ( UserId, email, vcode) VALUES ("${userId}", "${req.body.email}","${code}")`;  
connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
      res.send("success")
      
    });

    
  

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send("email failed")
      } else {
        res.send('email sent')
        console.log('Email sent: ' + info.response);
      }
    });







}
module.exports =Sendverification;






