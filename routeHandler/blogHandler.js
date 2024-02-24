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

// get blogs by id
router.get('/blog/:id', async(req,res) =>{
    try{
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// handle like
router.patch('/like/:id', async(req,res) =>{
    console.log(req.body);
    try{
        const blog = await Blog.findById(req.params.id);
        if( blog.likedBy.indexOf(req.body.userEmail) > -1){
            blog.likes -= 1;
            blog.likedBy = blog.likedBy.filter(email => email !== req.body.userEmail); 
        } else {
            blog.likes += 1;
            blog.likedBy.push(req.body.userEmail);
        }
        
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch(err){
        res.status(500).json({message: err.message})
    }
})


// get blogs by tag
router.get('/tag/:tag', async(req,res) =>{
    try{
        const blogs = await Blog.find({tags: req.params.tag});
        res.json(blogs);
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// post a blog
router.post('/', async(req,res)=>{
    try{
        const blog = new Blog({
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            userImg: req.body.userImg,
            title: req.body.title,
            tags: req.body.tags,
            blogImg: req.body.blogImage,
            content: req.body.content
        })
        console.log(blog)
        const newBlog = await blog.save();
        console.log(newBlog);

        res.status(200).json(newBlog);
    
    } catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message})
    }
})

// update a blog
router.patch('/:id', async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        blog.title = req.body.title;
        blog.tags = req.body.tags;
        blog.content = req.body.content;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// delete a blog
router.delete('/:id', async(req,res)=>{
    try{
        const blog = await Blog.findOneAndDelete(req.params.id);
        res.status(200).send('Blog deleted successfully')
    } catch(err){
        res.status(500).json({message: err.message})
    }
})



module.exports = router;