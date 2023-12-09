const route = require('express').Router();
const loginCtrl = require('../controllers/login.controller')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded({extended: false})

route.post('/auth/login',encoder, loginCtrl.UserAuthentication);


module.exports = route