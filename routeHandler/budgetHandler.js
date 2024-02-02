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

// post a budget
router.post("/", async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.budgetData);
  const budget = new Budget(req.body);
  // console.log(budget);

  try {
    const newBudget = await budget.save();
    res.json(newBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
