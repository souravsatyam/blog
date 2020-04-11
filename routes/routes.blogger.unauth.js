const express = require('express');
const unauth = express.Router();
const BlogController = require('../controller/blog.controller');
unauth
.get('/get', BlogController.getBlogger);
module.exports = unauth;