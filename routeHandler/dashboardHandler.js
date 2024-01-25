const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Transaction = require('../schema/transactionSchema')

// get transaction by email
router.get('/:email', async (req,res) => {
    const email = req.params.email;
    try{
        const transactions = await Transaction.find({
            userEmail: email
        })

        // sum of all expenses & income
        let totalExpense = 0;
        let totalIncome = 0;
        transactions.forEach(trx => {
            if(trx.trxType === 'expense'){
                totalExpense += trx.amount
            }
            if(trx.trxType === 'income'){
                totalIncome += trx.amount
            }
        })



        // aggregate by date
        let TrxByDate = await Transaction.aggregate([
            {
                $match: {
                    userEmail: email,
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }},
                        trxType: '$trxType'
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])

        // separate income and expense by date
        let incomeByDate = []
        let expenseByDate = []
        TrxByDate.forEach(trx => {
            if(trx._id.trxType === 'income'){
                incomeByDate.push(trx)
            }
            if(trx._id.trxType === 'expense'){
                expenseByDate.push(trx)
            }
        })



        res.send({
            // transactions: transactions,
            totalExpense,
            totalIncome,
            balance: totalIncome - totalExpense,
            TrxByDate , 
            incomeByDate,
            expenseByDate,
        })
    } catch(err){
        res.send('Error ' + err)
    }
})


// get expense/:email
router.get('/expense/:email', async (req,res) => {
    const email = req.params.email;
    try{
        const transactions = await Transaction.find({
            userEmail: email,
            trxType: 'expense'
        })
        
        // sum of all expenses
        let sum = 0;
        transactions.forEach(transaction => {
            sum += transaction.amount
        })
        res.json({sum: sum})
        // res.send(sum)
    } catch(err){
        res.send('Error ' + err)
    }
})


module.exports = router;