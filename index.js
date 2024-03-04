const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const secret = process.env.ACCESS_TOKEN_SECRET ;

// express app initialization
const app = express();

// app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173', 'https://quickfinance-a948a.web.app', 'https://quickfinance-a948a.firebaseapp.com'],
    credentials: true
}));
app.use(express.json()); 
app.use(cookieParser());

// database connection with mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gf8ipgr.mongodb.net/${process.env.DB_NAME}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB", err)); 

  

     //verify token and grant access
     const verifyToken = (req, res , next) => {
        const { token } = req.cookies
    
        //if client does not send token
        if(!token){
            return res.status(401).send({message:'You are not authorized'})
        }

        // verify a token symmetric
        jwt.verify(token,secret, function (err, decoded) {
            if(err){
                return res.status(401).send({message:'You are not authorized'})
            }
        // attach decoded user so that others can get it
          req.user= decoded
        next()
        });

      
    }
    module.exports = verifyToken;

// Handle OPTIONS requests
app.options('*', cors());

// Auth related APIs

app.post('/api/v1/jwt', (req, res) => {
    // creating token and send to client
    const user = req.body
    const token = jwt.sign(user, secret, { expiresIn: 60 * 60 })
    // res.send(token)
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }).send({ success: true })
})
app.post('/api/v1/logout', async (req, res) => {
    res.clearCookie('token', { maxAge: 0 }).send({ success: true });
});

// Your existing routes and handlers
app.get('/', (req, res) => {
    res.send("Hello Stranger!!"); 
});

app.use('/api/users', require('./routeHandler/userHandler'));
app.use('/api/transactions', verifyToken, require('./routeHandler/transactionHandler'));
app.use('/api/dashboard', verifyToken, require('./routeHandler/dashboardHandler'));
app.use('/api/budget', verifyToken, require('./routeHandler/budgetHandler'));
app.use('/api/goals', verifyToken, require('./routeHandler/goalHandler'));
app.use('/api/progress', verifyToken, require('./routeHandler/progressHandler'));
app.use('/api/payments', verifyToken, require('./routeHandler/paymentHandler.js'));
app.use('/api/blogs', require('./routeHandler/blogHandler.js'));
// for asset 
app.use('/api/assets',verifyToken, require('./routeHandler/assetHandler.js'));

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
}
app.use(errorHandler);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
