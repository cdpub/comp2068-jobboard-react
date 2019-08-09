require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth:   {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    useNewUrlParser: true            
}).catch(err => console.log(`ERROR: ${err}`));

const express = require(`express`);                      
const app = express();                              

//add cookies and session support to app
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser());
app.use(session({
  secret: (process.env.secret || 'yeah'),
  cookie: {
    max: 10800000
  },
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash('success') || null;
  res.locals.flash.error = req.flash('error') || null;

  next();
});

//import and register body parser library
const bodyParser = require('body-parser');
app.use(bodyParser.json());                 
app.use(bodyParser.urlencoded({             
    extended: true
}));

// Create path and configure views
const path = require('path');          

//auth helper utility , returns users id
const jwt = require("jsonwebtoken");
const isAuthenticated = (req) => {
  const token = 
    (req.cookies && req.cookies.token) ||
    (req.body && req.body.token) || 
    (req.query && req.query.token) || 
    (req.headers && req.header["x-access-token"]);

  if (req.session.userId) return true;  
  if (!token) return false;

  jwt.verify(token, "cdpub", function(err, decoded)  {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if(!isAuthenticated(req)) return false;
    return true;
  };
  
  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});

//create and register routes
const routes = require(`./routes.js`);
app.use(`/api`, routes);                                       

//handles any request that don't match those above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

// create dynamic port
const port = process.env.PORT || 4000;       
app.listen(port, () => console.log(`Listening on port ${port}`));    