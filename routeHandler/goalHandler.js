const express = require('express')
const router = express.Router()
const Goal = require('../schema/goalSchema')
router.get('/',  async (req, res) => {
    try {
        const goals = await Goal.find()
        res.json(goals)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// get goals by user's email
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail

    try {
        const goals = await Goal.find({ userEmail })

        if (!goals || goals.length === 0) {
            return res.status(404).json({ message: `No goals found for user with email ${userEmail}` })
        } else {
            res.json(goals)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// post a goal
router.post('/', async (req, res) => {
    
    const goal = new Goal({
        goalName: req.body.goalName,
        userEmail: req.body.userEmail,
        goalAmount: req.body.goalAmount,
        goalDate: req.body.goalDate,
        amountSaved: req.body.amountSaved,
        amountNeeded: req.body.goalAmount - req.body.amountSaved,
        remainingDays: Math.floor((new Date(req.body.goalDate) - new Date()) / (1000 * 60 * 60 * 24)),
        goalStatus: req.body.goalAmount > req.body.amountSaved ? "pending" : "completed"
    })

    console.log(goal)

    try {
        const newGoal = await goal.save()
        res.json(newGoal)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// update a goal
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const goalData = req.body

    try {
        const result = await Goal.findByIdAndUpdate(id, { $set: goalData }, { new: true })
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// add amount to amountSaved
router.patch('/addAmount/:id', async (req, res) => {
    const id = req.params.id
    const amount = req.body.amount

    try {
        const goal = await Goal.findById(id);
        const goalAmount = goal.goalAmount;
        let amountSaved = goal.amountSaved;
        const newAmountSaved = amountSaved + amount;
        
        // Preserve the original goal date
        const goalDate = new Date(goal.goalDate);
        
        // Calculate amount needed and handle negative case
        let amountNeeded = goalAmount - newAmountSaved;
        amountNeeded = Math.max(0, amountNeeded);
        
        const goalStatus = goalAmount > newAmountSaved ? "pending" : "completed";
        
        let remainingDays = 0;
        
        if (goalAmount === newAmountSaved || goalStatus === "completed") {
            remainingDays = 0;
        } else {
            const daysRemaining = Math.ceil((goalDate - new Date()) / (1000 * 60 * 60 * 24));
        
            if (daysRemaining === 0) {
                remainingDays = 0;
            } else {
                // Calculate average daily saving rate based on original goal period
                const originalDaysRemaining = Math.ceil((goalDate - new Date()) / (1000 * 60 * 60 * 24));
                const averageDailySavingRate = amountSaved / originalDaysRemaining;
                
                // Calculate remaining days based on average daily saving rate
                remainingDays = Math.ceil(amountNeeded / averageDailySavingRate);
            }
        }
        
        const result = await Goal.findByIdAndUpdate(
            id,
            { $set: { amountSaved: newAmountSaved, amountNeeded, goalStatus, remainingDays } },
            { new: true }
        );
        
        res.json(result);
        

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// delete a goal
router.delete('/:id',  async (req, res) => {
    const id = req.params.id

    try {
        const result = await Goal.findByIdAndDelete(id)
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// dummy goal data for postman testing
// {
//     "goalName": "Macbook Pro",
//     "userEmail": "xxxx@xxxxx",
//     "goalAmount": 2000,
//     "goalDate": "2021-12-31",
//     "amountSaved": 0
// }



module.exports = router;