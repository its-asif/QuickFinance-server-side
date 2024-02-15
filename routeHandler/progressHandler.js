const express = require('express')
const router = express.Router()
const Budget = require("../schema/budgetSchema");
const Goal = require('../schema/goalSchema')


// get progress data by user's email
router.get('/budget/:email', async(req, res) => {
    const email = req.params.email;

    try{
        const budgets = await Budget.find({ userEmail: email });
        const goals = await Goal.find({ userEmail : email });

        res.send({
            // budgets[0].totalIncome, budgets[0].totalExpense, budgets[0].totalSaving

            userBudget: {
                totalIncome: budgets[0].totalIncome,
                totalExpense: budgets[0].totalExpense,
                totalSaving: budgets[0].totalSaving,
            },
            goals
        })
        
    } catch(err){
        res.send('Error ' + err)
    }
})







module.exports = router;