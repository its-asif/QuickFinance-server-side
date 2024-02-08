const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  // General Information
  planName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },

  // Income
  homePay: { type: Number, default: 0 },
  partnerPay: { type: Number, default: 0 },
  bonusPay: { type: Number, default: 0 },
  investmentsPay: { type: Number, default: 0 },
  familyPay: { type: Number, default: 0 },
  otherPay: { type: Number, default: 0 },

  // Insurance
  carInsurance: { type: Number, default: 0 },
  homeContentsInsurance: { type: Number, default: 0 },
  personalLifeInsurance: { type: Number, default: 0 },
  healthInsurance: { type: Number, default: 0 },
  carLoan: { type: Number, default: 0 },
  creditCardInterest: { type: Number, default: 0 },
  otherLoans: { type: Number, default: 0 },
  payingOffDebt: { type: Number, default: 0 },
  charityDonations: { type: Number, default: 0 },
  otherInsuranceFinancial: { type: Number, default: 0 },

  // Housing Expenses
  mortgageRent: { type: Number, default: 0 },
  bodyCorporateFees: { type: Number, default: 0 },
  councilRates: { type: Number, default: 0 },
  furnitureAppliances: { type: Number, default: 0 },

  // Utilities
  electricity: { type: Number, default: 0 },
  gas: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  internet: { type: Number, default: 0 },
  payTV: { type: Number, default: 0 },
  homePhone: { type: Number, default: 0 },
  mobile: { type: Number, default: 0 },
  otherHomeUtilities: { type: Number, default: 0 },

  // Groceries
  supermarket: { type: Number, default: 0 },
  fruitAndVegMarket: { type: Number, default: 0 },
  fishShop: { type: Number, default: 0 },
  deliAndBakery: { type: Number, default: 0 },
  petFood: { type: Number, default: 0 },
  otherGroceries: { type: Number, default: 0 },
  totalGroceries: { type: Number, default: 0 },

  // Personal Care
  cosmeticsToiletries: { type: Number, default: 0 },
  hairBeauty: { type: Number, default: 0 },
  medicinesPharmacy: { type: Number, default: 0 },
  glassesEyeCare: { type: Number, default: 0 },
  dental: { type: Number, default: 0 },
  doctorsMedical: { type: Number, default: 0 },

  // Personal and Leisure
  hobbies: { type: Number, default: 0 },
  clothingShoes: { type: Number, default: 0 },
  jewelleryAccessories: { type: Number, default: 0 },
  computersGadgets: { type: Number, default: 0 },
  sportsGym: { type: Number, default: 0 },
  education: { type: Number, default: 0 },
  petCareVet: { type: Number, default: 0 },
  otherPersonalMedical: { type: Number, default: 0 },

  // Food and Drinks
  coffeeTea: { type: Number, default: 0 },
  lunchesBought: { type: Number, default: 0 },
  takeAwaySnacks: { type: Number, default: 0 },
  drinksAlcohol: { type: Number, default: 0 },

  // Entertainment
  barsClubs: { type: Number, default: 0 },
  restaurants: { type: Number, default: 0 },
  books: { type: Number, default: 0 },
  newspaperMagazines: { type: Number, default: 0 },
  moviesMusic: { type: Number, default: 0 },
  holidays: { type: Number, default: 0 },
  celebrationsGifts: { type: Number, default: 0 },
  otherEntertainment: { type: Number, default: 0 },

  // Transportation
  busTrainFerry: { type: Number, default: 0 },
  petrol: { type: Number, default: 0 },
  roadTollsParking: { type: Number, default: 0 },
  repairsMaintenance: { type: Number, default: 0 },
  fines: { type: Number, default: 0 },
  airfares: { type: Number, default: 0 },
  otherTransportAuto: { type: Number, default: 0 },

  // Children and Family
  babyProducts: { type: Number, default: 0 },
  toys: { type: Number, default: 0 },
  babysitting: { type: Number, default: 0 },
  childcare: { type: Number, default: 0 },
  sportsActivities: { type: Number, default: 0 },
  schoolFees: { type: Number, default: 0 },
  excursions: { type: Number, default: 0 },
  schoolUniforms: { type: Number, default: 0 },
  otherSchoolNeeds: { type: Number, default: 0 },
  otherChildren: { type: Number, default: 0 },



  // summary
  totalIncome: {
    type: Number,
    validate: {
      validator: Number.isFinite,
      message: "{VALUE} is not a valid number for totalIncome",
    },
    default: function () {
      return this.homePay + this.partnerPay + this.bonusPay + this.investmentsPay + this.familyPay + this.otherPay;
    },
  },
  totalExpense: {
    type: Number,
    validate: {
      validator: Number.isFinite,
      message: "{VALUE} is not a valid number for totalExpense",
    },
    default: function () {
      return this.carInsurance + this.homeContentsInsurance + this.personalLifeInsurance + this.healthInsurance + this.carLoan + this.creditCardInterest + this.otherLoans + this.payingOffDebt + this.charityDonations + this.otherInsuranceFinancial + this.mortgageRent + this.bodyCorporateFees + this.councilRates + this.furnitureAppliances + this.electricity + this.gas + this.water + this.internet + this.payTV + this.homePhone + this.mobile + this.otherHomeUtilities + this.totalGroceries + this.cosmeticsToiletries + this.hairBeauty + this.medicinesPharmacy + this.glassesEyeCare + this.dental + this.doctorsMedical + this.hobbies + this.clothingShoes + this.jewelleryAccessories + this.computersGadgets + this.sportsGym + this.education + this.petCareVet + this.otherPersonalMedical + this.coffeeTea + this.lunchesBought + this.takeAwaySnacks + this.drinksAlcohol + this.barsClubs + this.restaurants + this.books + this.newspaperMagazines + this.moviesMusic + this.holidays + this.celebrationsGifts + this.otherEntertainment + this.busTrainFerry + this.petrol + this.roadTollsParking + this.repairsMaintenance + this.fines + this.airfares + this.otherTransportAuto + this.babyProducts + this.toys + this.babysitting + this.childcare + this.sportsActivities + this.schoolFees + this.excursions + this.schoolUniforms + this.otherSchoolNeeds + this.otherChildren;
    },
  },
  totalSaving: {
    type: Number,
    validate: {
      validator: Number.isFinite,
      message: "{VALUE} is not a valid number for totalSaving",
    },
    default: function () {
      return this.totalIncome - this.totalExpense;
    },
  },

});

module.exports = mongoose.model("Budget", budgetSchema);
