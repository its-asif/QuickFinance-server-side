const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userImg: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    blogImg: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    likedBy: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'public'
    },
    active: {
        type: Boolean,
        default: true
    }


}, {timestamps: true} );


module.exports = mongoose.model('Blog', blogSchema);