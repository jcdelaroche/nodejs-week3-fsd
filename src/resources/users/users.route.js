const express = require('express');
const { validateUser } = require('../middlewares/validateUser');
const { signUp, getAllUsers, logIn } = require('./users.controller');
const authentification = require('../middlewares/authentification')



const router = express.Router();

// midleware validate user 
router.route('').post(validateUser, signUp);
router.route('').get(authentification, getAllUsers);
router.route('/signup').post(validateUser, signUp);
router.route('/login').post(logIn);


module.exports = router;