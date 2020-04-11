var express = require('express');
const AuthCtrl = require('../controller/auth.controller');
var router = express.Router();

/* GET home page. */
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
module.exports = router;
