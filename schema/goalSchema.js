const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goalName : {
        type: String, 
        required: true
    },
    userEmail : {
        type: String, 
        required: true
    },
    goalAmount : {
        type: Number, 
        required: true
    },
    amountSaved : {
        type: Number, 
        default: 0
    },
    amountNeeded : {
        type: Number, 
    },
    goalDate : {
        type: Date, 
    },
    remainingDays : {
        type: Number, 
    },
    goalStatus : {
        type: String, 
        enum: ['pending', 'completed'],
        default: 'pending'
    }

}, {timestamps: true} );

module.exports = mongoose.model('Goal', goalSchema);