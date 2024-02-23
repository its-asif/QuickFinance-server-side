const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    // {
    //     "category": "Land",
    //     "asset": "Real Estate",
    //     "magnitude": "5000 sqft",
    //     "locale": "New York",
    //     "value": "180000"
    // },
    userEmail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    locale: {
        type: String,
        required: true
    },
    magnitude: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
    }

}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);