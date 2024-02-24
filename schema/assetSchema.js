const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    asset_name: {
        type: String,
        required: true
    },
    magnitude: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: String,
        required: true
    },
    locale: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }

}, { timestamps: true });

// Virtual property to calculate netAsset
// assetSchema.virtual('netAsset').get(function () {
//     let totalValue = 0;
//     this.asset.forEach((item) => {
//         totalValue += item.value;
//     });
//     return totalValue;
// });

module.exports = mongoose.model('Asset', assetSchema);
