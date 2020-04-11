const TagSchema = require('../schema/TagSchema');

class TagModel {
    static async createTag(req, res) {
        try {
            let query = req.query;
            let tagSchema = new TagSchema(query);
            const resp = await tagSchema.save({new: true});
            return res.status(200).json({status: true, message: "Tag Successfully generated"});
        } catch (e) {
            
            return res.status(500).json({status: true, message: "Some error occured"}); 
        }
    }

    static async getTags(req, res) {
        try {
            let query = req.query;
            let resp = await TagSchema.find(query);
            return res.status(200).json({status: true, message: "Tag Successfully generated", data: resp});

        } catch (e) {

        }
    }

    static async updateCounter(tags) {
        console.log(tags);
        
        try {
            await TagSchema.update({title: {$in: tags}}, {$inc: {total_post: 1}}, {multi: true});
        } catch(e) {
            console.log("Some error occured", e);
        }
    }
}

module.exports = TagModel;