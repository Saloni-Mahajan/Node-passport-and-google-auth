const express = require('express');
const app = express();
const mongoose=require('mongoose');
const expressLayout=require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv/config');
require('./config/google-auth');

// Passport Config
require('./config/passport')(passport)
//require('./config/google-auth')(passport)

//DB config
const db=require('./config/keys').MongoURL;

//Connection to db
mongoose.connect(
    db,
 { useNewUrlParser: true, useUnifiedTopology: true} ,
()=>{
    console.log('connected to db');
    
})

//EJS
app.use(expressLayout);
app.set('view engine','ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const index=require('./routes/index');
const users=require('./routes/users');
const google=require('./routes/google');

//Routes
app.use('/',index);
app.use('/users',users);
app.use('/',google);

app.listen(process.env.PORT,()=>{
    console.log("Port listening to 5000");
})