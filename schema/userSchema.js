const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true
    },
    email : {
        type: String, 
        required: true, 
        unique: true
    },
    photoUrl : {
        type: String, 
        required: true
    },
    createdAt : {
        type: Date, 
        default: Date.now
    },
    profession : {
        type: String, 
    },
    subcriptionPlan : {
        type: String, 
        enum: ['personal', 'family', 'business']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('User', userSchema);