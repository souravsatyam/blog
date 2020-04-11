const BlogModel = require('../model/blog.model.js');
class BlogController {
    static async postBlogger(req, res) {
        BlogModel.createBlog(req, res);
    }

    static async getBlogger(req, res) {
        BlogModel.getBlogger(req.query, res);
    }

    static async editBlogger(req, res) {
        BlogModel.updateBlogger(req, res);
    }

    static async deleteBlogger(req, res) {
        BlogModel.deleteBlogger(req, res);
    }

    static async likeBlog(req, res) {
        BlogModel.likeBlog(req, res);
    }
}

module.exports = BlogController;