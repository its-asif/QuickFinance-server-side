const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

// express app initialization
const app = express();
app.use(express.json()); 
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5173', 'https://quickfinance-a948a.web.app', 'https://quickfinance-a948a.firebaseapp.com','https://quick-finance.netlify.app'],
    
    
    credentials:true
}))
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {                        
            return res.status(401).send({ message: 'unauthorized access' })
        }
        req.user = decoded;
        next();
    }) 
  } 

  // auth related api
app.post('/api/v1/jwt',  async (req, res) => {
    const user = req.body;
    console.log(user);
    // console.log('user for token', user);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
        .send({ success: true });
  })
  
  app.post('/api/v1/logout', async (req, res) => {
    const user = req.body;
    // console.log('logging out', user);
    res.clearCookie('token', { maxAge: 0 }).send({ success: true })
  })
   //Auth related api  end

// database connection with mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gf8ipgr.mongodb.net/${process.env.DB_NAME}`)    
    .then( () => console.log("Connected to MongoDB"))
    .catch( err => console.log("Error connecting to MongoDB", err)); 


// routes 
app.get('/', (req, res) => {
    res.send("Hello Stranger!!"); 
})

app.use('/api/users', require('./routeHandler/userHandler'));
app.use('/api/transactions',verifyToken, require('./routeHandler/transactionHandler'))
app.use('/api/dashboard',verifyToken, require('./routeHandler/dashboardHandler'))
app.use('/api/budget',verifyToken, require('./routeHandler/budgetHandler'))
app.use('/api/goals',verifyToken, require('./routeHandler/goalHandler'))
app.use('/api/progress',verifyToken, require('./routeHandler/progressHandler'))
app.use('/api/payments',verifyToken, require('./routeHandler/paymentHandler.js'))
app.use('/api/blogs', require('./routeHandler/blogHandler.js'))
// for asset 
app.use('/api/assets',verifyToken, require('./routeHandler/assetHandler.js'))


// default error handler
function errorHandler(err, req, res, next) {
    
    if( res.headersSent ) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 