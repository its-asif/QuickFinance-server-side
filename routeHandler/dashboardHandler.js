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


        // total transaction by trxCateogry of income
        let incomeByCategory = await Transaction.aggregate([
            {
                $match: {
                    userEmail: email,
                    trxType: 'income'
                }
            },
            {
                $group: {
                    _id: {
                        trxCategory: '$trxCategory'
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])

        // total transaction by trxCateogry of expense
        let expenseByCategory = await Transaction.aggregate([
            {
                $match: {
                    userEmail: email,
                    trxType: 'expense'
                }
            },
            {
                $group: {
                    _id: {
                        trxCategory: '$trxCategory'
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])
        

        // total income by trxCateogry of current month
        let incomeByCategoryOfCurrentMonth = await Transaction.aggregate([
            {
                $match: {
                    userEmail: email,
                    trxType: 'income',
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        trxCategory: '$trxCategory'
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])


        // total expense by trxCateogry of current month
        let expenseByCategoryOfCurrentMonth = await Transaction.aggregate([
            {
                $match: {
                    userEmail: email,
                    trxType: 'expense',
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        trxCategory: '$trxCategory'
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])


        // most expense category of current month
        let maxExpense = 0;
        let mostExpenseCategory = '';
        expenseByCategoryOfCurrentMonth.forEach(trx => {
            if(trx.totalAmount > maxExpense){
                maxExpense = trx.totalAmount
                mostExpenseCategory = trx._id.trxCategory
            }
        })

        // most income category of current month
        let maxIncome = 0;
        let mostIncomeCategory = '';
        incomeByCategoryOfCurrentMonth.forEach(trx => {
            if(trx.totalAmount > maxIncome){
                maxIncome = trx.totalAmount
                mostIncomeCategory = trx._id.trxCategory
            }
        })
        


        res.send({
            // transactions: transactions,
            email,
            totalExpense,
            totalIncome,
            balance: totalIncome - totalExpense,
            TrxByDate , 
            incomeByDate,
            expenseByDate,
            incomeByCategory,
            expenseByCategory,
            incomeByCategoryOfCurrentMonth,
            expenseByCategoryOfCurrentMonth,
            maxTrxOfCurrentMonth: 
            {
                mostExpenseCategory,
                maxExpense,
                mostIncomeCategory,
                maxIncome
            },

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