const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        unique: false,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    repeat_password: {
        type: String,
        minlength: 5
    },
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

module.exports = mongoose.model('user', UserSchema)