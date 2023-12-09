const route = require('express').Router();
const userCtrl = require('../controllers/user.controller')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded({extended: false})

route.post('/auth/register',encoder, userCtrl.userSignup);

module.exports = route