const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    postHeader: {
        type: String,
        required: true,
    },
    postDescription: {
        type: String,
        required: false
    },
    // likes: {
    //     type: Number,
    //     default: 0
    // } ,
    deleted: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', PostSchema);