const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BloggerSchema = new Schema({
    title: {type: String, default: 'New Blogger Without title', required: true},
    description: {type: String, min: 100, max: 600},
    tags: {type: Array, minlength: 3},
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    parentBloggerId: {type: ObjectId},
    like_count: {type: Number, default: 0},
    liked_user: {type: Array, default: []},
    createDate: {type: Date, default: Date.now()}
});

module.exports  = mongoose.model('blogs', BloggerSchema);