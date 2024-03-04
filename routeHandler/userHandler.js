const express = require('express')
const router = express.Router()
const User = require('../schema/userSchema')
const verifyToken =require("../index")
// get all users
router.get('/',verifyToken, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.send('Error ' + err)
    }
}) 

// get a user
router.get('/:email',verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        res.json(user)
    } catch(err) {
        res.send('Error ' + err)
    }
})
router.patch('/admin/:id',verifyToken, async(req,res)=>{
    try{
        const id = req.params.id;
    
      
      const updatedDoc = {
        $set:{
          isAdmin :true
        }
      }
      const result = await User.findByIdAndUpdate(id,updatedDoc);
      res.send(result);
      
  
    }
    catch (error) {
      res.status(500).send({ error: 'An error occurred', message: error.message });
    }
   });
router.get('/admin/:email',verifyToken,  async (req, res) => {
    const email = req.params.email;
    
    const query = { email: email }
    const user = await User.findOne(query)
    let isAdmin = false;
    if (user) {
        isAdmin = user?.isAdmin === true;
    }
    res.send({isAdmin})
    console.log(isAdmin);
  });
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


// update a user
router.patch('/:email',verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.photoUrl) {
            user.photoUrl = req.body.photoUrl
        }
        if (req.body.profession) {
            user.profession = req.body.profession
        }
        if (req.body.subcriptionPlan) {
            user.subcriptionPlan = req.body.subcriptionPlan
        }
        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


// delete a user
router.delete('/admin/:email',verifyToken, async (req, res) => {
    try {
        // const user = await User.findOne({ email: req.params.email })
        // const deletedUser = await user.remove()
        const deletedUser = await User.findOneAndDelete({ email: req.params.email })
        res.json(deletedUser)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;