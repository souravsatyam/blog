const TagModel = require('../model/tag.model.js');
class TagController {
    static async createTag(req, res) {
        TagModel.createTag(req, res);
    }

    static async getTags(req, res) {
        TagModel.getTags(req, res);
    }

    static  updateCounter(tags) {
        
        TagModel.updateCounter(tags)
    }

}

module.exports = TagController;