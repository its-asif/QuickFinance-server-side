const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email : {
        type: String, 
        required: true
    },
    trxType : {
        type: String, 
        required: true,
        
    },
    amount : {
        type: Number, 
        required: true
    },
    currency_type : {
        type: String, 
        required: true
    },
    organizer_name: {
        type: String, 
        required: true
    },
    name: {
        type:String,
        required:true 
    },
    address:{
        type:String,
        require:true
    },
    post_code:{
        type:Number,
        required:true
    },
    phone_no: {
        type: Number,
        require:true

    },
    tran_id : {
        type: String,
        unique : true ,
    },
    
   payment_status:{
    type:String
   },
}, {timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema);