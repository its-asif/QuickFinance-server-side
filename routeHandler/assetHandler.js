const express = require('express')
const router = express.Router()
const Asset = require('../schema/assetSchema')

router.get('/', async (req, res) => {
    try {
        const asset = await Asset.find()
        res.json(asset)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// get asset by user's email
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail

    try {
        const asset = await Asset.find({ userEmail })

        if (!asset || asset.length === 0) {
            return res.status(404).json({ message: `No asset found for user with email ${userEmail}` })
        } else {
            res.json(asset)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// post a asset
router.post('/', async (req, res) => {
    console.log(req.body);
    const asset = new Asset({
        userEmail: req.body.userEmail,
        category: req.body.category,
        asset_name: req.body.asset_name,
        magnitude: req.body.magnitude,
        purchase_date: req.body.purchase_date,
        locale: req.body.locale,
        value: req.body.value,
        status: req.body.status,
        JewelrySymbol:req.body.JewelrySymbol,
    })



    try {
        const newAsset = await asset.save()
        res.json(newAsset)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// update a asset
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const assetData = req.body

    try {
        const result = await Asset.findByIdAndUpdate(id, { $set: assetData }, { new: true })
        console.log(result);
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// delete a asset
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await Asset.findByIdAndDelete(id)
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// dummy goal data for postman testing
// {
//     "userEmail": "xxxx@xxxxx"
//     "category": "Real Estate",
//     "asset_name": "Property A",
//     "magnitude": "5000",
//     "purchase_date": "2024-02-15",
//     "locale": "New York",
//     "value": 180000,
//     "status": "down"
// }



module.exports = router;