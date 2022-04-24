const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
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
    },
    confirmationNumber: Number,
    confirmed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', UserSchema)