const express = require('express');
const AuthCtrl = require('../controller/auth.controller');
const unauth = express.Router();

unauth
.post('/register', AuthCtrl.register)
.post('/login', AuthCtrl.login);

module.exports = unauth;