const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Budget = require("../schema/budgetSchema");

// get all budget
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.send("Error " + err);
  }
});

// get budget by user's email
router.get("/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const budgets = await Budget.find({ userEmail });

    if (!budgets || budgets.length === 0) {
      return res
        .status(404)
        .json({ message: `No budgets found for user with email ${userEmail}` });
    }

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const userEmail = req.body.userEmail;
  const budgetData = req.body;

  try {
    const result = await Budget.findOneAndUpdate(
      { userEmail: userEmail },
      { $set: budgetData },
      { upsert: true, new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const result = await Budget.deleteOne ({ userEmail });
    
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `No budgets found for user with email ${userEmail}` });
    } else {
      res.json({ message: `Budgets for user with email ${userEmail} deleted` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} );

// post a budget
// router.post("/", async (req, res) => {
//   // console.log(req.body);
//   // console.log(req.body.budgetData);
//   const budget = new Budget(req.body);
//   // console.log(budget);

//   try {
//     const newBudget = await budget.save();
//     res.json(newBudget);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
