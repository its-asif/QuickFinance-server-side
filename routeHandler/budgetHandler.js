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

  // adding summary"
    budgets.forEach((budget) => {
      let totalIncome =
        budget.homePay +
        budget.partnerPay +
        budget.bonusPay +
        budget.investmentsPay +
        budget.familyPay +
        budget.otherPay;

      let totalExpense =
        budget.carInsurance +
        budget.homeContentsInsurance +
        budget.personalLifeInsurance +
        budget.healthInsurance +
        budget.carLoan +
        budget.creditCardInterest +
        budget.otherLoans +
        budget.payingOffDebt +
        budget.charityDonations +
        budget.otherInsuranceFinancial +
        budget.mortgageRent +
        budget.bodyCorporateFees +
        budget.councilRates +
        budget.furnitureAppliances +
        budget.electricity +
        budget.gas +
        budget.water +
        budget.internet +
        budget.payTV +
        budget.homePhone +
        budget.mobile +
        budget.otherHomeUtilities +
        budget.supermarket +
        budget.fruitAndVegMarket +
        budget.fishShop +
        budget.deliAndBakery +
        budget.petFood +
        budget.otherGroceries +
        budget.totalGroceries +
        budget.cosmeticsToiletries +
        budget.hairBeauty +
        budget.medicinesPharmacy +
        budget.glassesEyeCare +
        budget.dental +
        budget.doctorsMedical +
        budget.hobbies +
        budget.clothingShoes +
        budget.jewelleryAccessories +
        budget.computersGadgets +
        budget.sportsGym +
        budget.education +
        budget.petCareVet +
        budget.otherPersonalMedical +
        budget.coffeeTea +
        budget.lunchesBought +
        budget.takeAwaySnacks +
        budget.drinksAlcohol +
        budget.barsClubs +
        budget.restaurants +
        budget.books +
        budget.newspaperMagazines +
        budget.moviesMusic +
        budget.holidays +
        budget.celebrationsGifts +
        budget.otherEntertainment +
        budget.busTrainFerry +
        budget.petrol +
        budget.roadTollsParking +
        budget.repairsMaintenance +
        budget.fines +
        budget.airfares +
        budget.otherTransportAuto +
        budget.babyProducts +
        budget.toys +
        budget.babysitting +
        budget.childcare +
        budget.sportsActivities +
        budget.schoolFees +
        budget.excursions +
        budget.schoolUniforms +
        budget.otherSchoolNeeds +
        budget.otherChildren;
        
      let totalSaving = totalIncome - totalExpense;

      budget.totalIncome = totalIncome;
      budget.totalExpense = totalExpense;
      budget.totalSaving = totalSaving;

    });

    
    // console.log(budgets);
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
