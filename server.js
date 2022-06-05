//IMPORT
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require('./server/database/connection');

const application = express();

//CONFIG DOTENV
dotenv.config({path:`config.env`});

//PORT 
const PORT = process.env.PORT || 8080;

//LOG REQUEST
application.use(morgan('tiny'));

//mongodb connection
connectDB();

//PARSER REQUEST TO BODY-PARSER
application.use(bodyparser.urlencoded({ extended:true}));

//SET VIEW ENGINE
application.set("view engine", "ejs")
//application.set("view",path.resolve(__dirname, "views/ejs"));

//LOAD ASSEST
application.use('/css', express.static(path.resolve(__dirname, "assests/css")));
application.use('/img', express.static(path.resolve(__dirname, "assests/img")));
application.use('/js', express.static(path.resolve(__dirname, "assests/js ")));

//load routers
application.use('/',require('./server/routes/router'));

application.listen(PORT, ()=>{console.log(`Sever is running on http://localhost:${PORT}`)});
