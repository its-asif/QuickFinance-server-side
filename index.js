const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// express app initialization
const app = express();
app.use(express.json()); 
app.use(cors({
    origin:['http://localhost:5173', 'https://quickfinance-a948a.web.app', 'https://quickfinance-a948a.firebaseapp.com','https://quick-finance.netlify.app'],
    
    
    credentials:true
}))


// database connection with mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gf8ipgr.mongodb.net/${process.env.DB_NAME}`)    
    .then( () => console.log("Connected to MongoDB"))
    .catch( err => console.log("Error connecting to MongoDB", err)); 


// routes 
app.get('/', (req, res) => {
    res.send("Hello Stranger!!"); 
})

app.use('/api/users', require('./routeHandler/userHandler'));
app.use('/api/transactions', require('./routeHandler/transactionHandler'))
app.use('/api/dashboard', require('./routeHandler/dashboardHandler'))
app.use('/api/budget', require('./routeHandler/budgetHandler'))
app.use('/api/goals', require('./routeHandler/goalHandler'))
app.use('/api/progress', require('./routeHandler/progressHandler'))
app.use('/api/payments', require('./routeHandler/paymentHandler.js'))
app.use('/api/blogs', require('./routeHandler/blogHandler.js'))
// for asset 
app.use('/api/assets', require('./routeHandler/assetHandler.js'))


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