const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// express app initialization
const app = express();
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


app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 