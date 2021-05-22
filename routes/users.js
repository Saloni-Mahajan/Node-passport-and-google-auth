const express = require('express');
const router= express.Router();

const {login,register,handleLogin,handleRegister,logout}=require('../app/controller/user.controller');

//Login
router.get('/login',login)

//Register
router.get('/register',register)

//Handle Register
router.post('/register',handleRegister);

//Handle Login
router.post('/login',handleLogin);
  
// Logout
router.get('/logout',logout);  

module.exports=router;