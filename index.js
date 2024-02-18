const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// express app initialization
const app = express();
app.use(cors());
app.use(express.json()); 


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