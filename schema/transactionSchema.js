const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userEmail : {
        type: String, 
        required: true
    },
    trxType : {
        type: String, 
        required: true,
        enum: ['expense', 'income']
    },
    trxCategory : {
        type: String, 
        required: true
    },
    amount : {
        type: Number, 
        required: true
    },
    trxDetails : {
        type: String, 
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema);