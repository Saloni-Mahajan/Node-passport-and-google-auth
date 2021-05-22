const express = require('express');
const router= express.Router();
const passport = require('passport');

const {dashboard,googleCallback}=require('.././app/controller/google.controller')

//Dashboard
router.get('/success',dashboard)

//Google Auth
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));

//Google Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),googleCallback);
  
module.exports=router