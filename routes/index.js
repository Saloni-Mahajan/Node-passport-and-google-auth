const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const {homePage,dashboard}=require('../app/controller/index.controller');

// Welcome Page
router.get('/', forwardAuthenticated,homePage );

//Dashboard
router.get('/dashboard', ensureAuthenticated,dashboard);
module.exports = router;