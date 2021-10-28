const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose')
const userController = require('../controllers/user')

router.get('/register', userController.renderRegister)


router.post('/register', catchAsync(userController.registerUser));

router.get('/login', userController.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login)

router.get('/logout', userController.logout)

module.exports = router;