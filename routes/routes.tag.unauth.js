const express = require('express');
const unauth = express.Router();
const TagController = require('../controller/tag.controller');
unauth
.get('/create', TagController.createTag)
.get('/get', TagController.getTags);
module.exports = unauth;