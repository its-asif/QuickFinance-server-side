const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  homePay: {
    type: Number,
  },
  partnerPay: {
    type: Number,
  },
  bonusPay: {
    type: Number,
  },
  investmentsPay: {
    type: Number,
  },
  familyPay: {
    type: Number,
  },
  otherPay: {
    type: Number,
  },
  rentExpense: {
    type: Number,
  },
  utilitiesExpense: {
    type: Number,
  },
  medicalExpense: {
    type: Number,
  },
  groceriesExpense: {
    type: Number,
  },
  entertainmentExpense: {
    type: Number,
  },
  otherExpense: {
    type: Number,
  },
  planName: {
    type: "String",
    required: true,
  },
  userEmail: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
