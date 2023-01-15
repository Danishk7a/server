const express = require('express')
const app = express()
const HomeRoute = require('./Routes/HomeRoute');
const UserRoute = require('./Routes/UserRoute');
const AdminRoute = require('./Routes/AdminRoute');
const connection = require('./Connection');
const bodyParser = require('body-parser');
const path = require('path')
var cors = require('cors')
const cookieParser = require('cookie-parser')
const Authjwt = require('./Middlewares/Authjwt')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.use(cookieParser());
app.use('/static',express.static(__dirname + '/Public'))

const port = 5000


app.use('/',HomeRoute)
app.use('/',UserRoute)
app.use('/',AdminRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})