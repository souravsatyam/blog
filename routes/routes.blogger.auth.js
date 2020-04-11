const express = require('express');
const auth = express.Router();
const BlogController = require('../controller/blog.controller');
auth
.post('/create', BlogController.postBlogger)
.put('/update', BlogController.editBlogger)
.delete('/delete', BlogController.deleteBlogger)
.put('/like', BlogController.likeBlog);
module.exports = auth;