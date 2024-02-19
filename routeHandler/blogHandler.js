const express = require('express')
const router = express.Router()
const Blog = require('../schema/blogSchema')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.json(blogs)
    } catch(err) {
        res.send('Error ' + err)
    }
})

// get blogs by user's email
router.get('/:userEmail', async(req,res) =>{
    const userEmail = req.params.userEmail;

    try{
        const blogs = await Blog.find({userEmail})
        res.send(blogs)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// post a blog
router.post('/', async(req,res)=>{
    try{
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            userImage: req.body.userImage
        })

        const blog = await newBlog.save()
        res.json(blog)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})



module.exports = router;