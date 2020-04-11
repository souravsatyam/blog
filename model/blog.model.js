const BlogSchema = require('../schema/BloggerSchema');
const TagController = require('../controller/tag.controller');
class BlogModel {
    static async createBlog(req, res) {
        
        try {
            let body = {...req.body};
            body.userId = res.locals.userId;
            let blogSchema = new BlogSchema(body);
            
            await TagController.updateCounter(body.tags);
            const resp = await blogSchema.save({new: true});
            return res.status(200).json({status: true, message: "Blog Successfully created", blog: resp});
        } catch (e) {
            return res.status(500).json({status: false, message: 'Some internal server error occured. Please try after some time'})
        }
        


        // BlogSchema.findOne({_id: req.query.blog_id, userId: res.locals.userId}).then(function(resp) {
        //     if (!resp) {
        //         if (req.query.blog_id) {
        //             body.parentBloggerId = req.query.blog_id;
        //         }
            
        //         let blogSchema = new BlogSchema(body);
        //     blogSchema.save(()=> {
        //         return res.status(200).json({status: true, message: 'Blogger Created'});
        //     })
        //     } else {
        //         return res.status(403).json({status: false, message: 'Cannot create Blogger'});
        //     }
            
        // }).catch(function(err) {
        //     return res.status(500).json({status: false, message: 'Some error Occured', err: err});
        // });
    }

    static async getBlogger(body, res) {
        let  querySearch = {};
      
        if (body.user) {
            querySearch.userId = {_id: body.user};
        }
       
        if (body.tags && !body.filter) {
            querySearch.tags = {$in: [body.tags]};
        }
        if (body.search != '' && body.search != undefined) {
            querySearch.title = {$regex: body.search, $options: 'i'}
        }
        if (body._id) {
            querySearch._id =  body._id;
        }
        console.log(body.search);
        BlogSchema.find(querySearch).populate('userId').exec().then(function(data) {
            return res.status(200).json({status: true, data: data});
        }).catch(function(err) {
            return res.status(500).json({status: false, err: err});
        });
    }

    static async updateBlogger(req, res) {
        let id = req.body.blogId;
        //Validate if the same user has created Blog--- //

        // BlogSchema.findOne({_id: id, userId: res.locals.userId}).exec().then(function(resp) {
        //     console.log(resp);
        // })
    
        const {title, description , tags} = req.body;
        try {
            let resp= await BlogSchema.updateOne({_id: req.body.blog_id}, 
                {userId: res.locals.userId, 
                title: title, 
                description: description, tags: tags});
            return res.status(200).json({status: true, data: 'Successfully updated'});
        } catch (e) {
            console.log(e);
        }
        
    }

    static async deleteBlogger(req, res) {
        let id = req.query.blogId;

        BlogSchema.remove({_id: id, userId: res.locals.userId}).then(function(resp) {
            return res.status(200).json({status: true, data: resp});
        }).catch(function(err) {
            return res.status(403).json({status: false, err: err});
        });
    }

    static async likeBlog(req, res) {
        
        try {
            const getRecord = await BlogSchema.findOne({"_id" : req.query.blog_id});
            let query = {};
            console.log(res.locals.userId);
            console.log(getRecord.liked_user)
            if (getRecord.liked_user.indexOf(res.locals.userId) > -1) {
                query = {$inc: {like_count: -1}, $pullAll: {liked_user: [res.locals.userId]}};
            } else {
                query = {$inc: {like_count: 1}, $push: {liked_user: res.locals.userId}};
            }
                const resp = await BlogSchema.findOneAndUpdate({"_id" : req.query.blog_id}, query);
           
        } catch (e) {
            console.log(e);
        }
        
        return res.status(200).json({status: true});
    }
}

module.exports = BlogModel;