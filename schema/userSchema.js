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
        required: true
    },
    subcriptionPlan : {
        type: String, 
        required: true,
        enum: ['personal', 'family', 'business']
    },
    
})

module.exports = mongoose.model('User', userSchema);