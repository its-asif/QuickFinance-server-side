const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },

}, {timestamps: true} );


module.exports = mongoose.model('Blog', blogSchema);