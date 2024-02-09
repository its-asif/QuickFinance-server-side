const express = require('express')
const router = express.Router()
const User = require('../schema/userSchema')

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.send('Error ' + err)
    }
}) 

// get a user
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        res.json(user)
    } catch(err) {
        res.send('Error ' + err)
    }
})

// post a user
router.post('/', async (req, res) => {
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     photoUrl: req.body.photoUrl,
    //     profession: req.body.profession,
    //     subcriptionPlan: req.body.subcriptionPlan
    // })

    const user = new User(req.body)
    console.log(user)

    try {
        const newUser =  await user.save() 
        res.json(newUser)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;