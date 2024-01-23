const express = require('express')
const mongoose = require('mongoose')
const User = require('../schema/userSchema')
const router = express.Router()

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.send('Error ' + err)
    }
}) 

// post a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
        profession: req.body.profession,
        subcriptionPlan: req.body.subcriptionPlan
    })


    try {
        const newUser =  await user.save() 
        res.json(newUser)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;