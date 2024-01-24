const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Transaction = require('../schema/transactionSchema')


// get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        .select({
            _id: 1,
            userEmail: 1,
            trxType: 1,
            trxCategory: 1,
            amount: 1,
            trxDetails: 1,
            createdAt: 1
        })
        res.json(transactions)
    } catch(err) {
        res.send('Error ' + err)
    }
})


// post a transaction
router.post('/', async (req, res) => {
    console.log(req.body);
    
    try {
        const transaction = new Transaction(req.body);
        const newTransaction = await transaction.save()
        res.json(newTransaction)
    } catch(err) {
        res.send('Error ' + err)
    }
})

// demo post 
// {
//     "userEmail" : "Googler@femail.com",
//     "trxType" : "income",
//     "trxCategory" : "salary",
//     "amount" : 9569,
//     "trxDetails" : "Google Office"
// }


// put transaction by id
router.put( '/:id', async (req, res) =>{
    try{
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
        )

        // send updated transaction
        const updatedTransaction = await Transaction.findById(req.params.id)
        .select({
            _id: 0,
            userEmail: 1,
            trxType: 1,
            trxCategory: 1,
            amount: 1,
            trxDetails: 1,
        })
        res.json(updatedTransaction)
    } catch(err){
        res.send('Error ' + err)
    }
})

// delete transaction by id
router.delete('/:id', async (req, res) => {
    try{
        const transaction = await Transaction.deleteOne({ _id: req.params.id })
        res.json(transaction)
    } catch(err){
        res.send('Error : \n' + err)
    }
})

module.exports = router;