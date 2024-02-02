const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Budget = require("../schema/budgetSchema");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await Budget.find();
    res.json(users);
  } catch (err) {
    res.send("Error " + err);
  }
});

// post a user
router.post("/", async (req, res) => {
  const budget = new Budget({
    subBudget: req.body.subBudget,
    budgetEmail: req.body.budgetEmail,
  });

  try {
    const newBudget = await budget.save();
    res.json(newBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
