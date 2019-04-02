const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
 
const app = express();
app.use(bodyParser.json());


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials:true,
    
  }))

  
  


app.use(session({
   secret: 'keyboard green car',
   resave: false,
   saveUninitialized: false,
  
  })) 
  

require('./config/mongoose');
require('./config/route')(app);


  app.listen(9000, ()=> console.log('server now is working on port 9000'));