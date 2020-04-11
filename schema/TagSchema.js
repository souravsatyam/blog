const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
    title: {type: String, default: 'New Blogger Without title', required: true},
    description: {type: String, min: 100, max: 600},
    total_post: {type: Number, default: 0},
    createDate: {type: Date, default: Date.now()}
});

module.exports  = mongoose.model('tags', TagSchema);