 const mysql = require('mysql');  


 const Connection = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "",
database:"bynance"
 });  


 Connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });
 
   
module.exports = Connection;