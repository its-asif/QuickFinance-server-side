const express = require("express");
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

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const userEmail = req.body.userEmail;
  const budgetData = req.body;

  try {
    // find and check if exists, 

    const result = await Budget.find ({ userEmail });
    console.log(result);

    if(!result.length) {
      const budget = new Budget(budgetData);
      const newBudget = await budget.save();
      res.json(newBudget);
    }
    else {
      const updatedBudget = await Budget.updateOne({
        userEmail
      }, {
        $set: budgetData
      });

      res.json(updatedBudget);
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
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
