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
  homePay: { type: Number },
  partnerPay: { type: Number },
  bonusPay: { type: Number },
  investmentsPay: { type: Number },
  familyPay: { type: Number },
  otherPay: { type: Number },

  // Insurance
  carInsurance: { type: Number },
  homeContentsInsurance: { type: Number },
  personalLifeInsurance: { type: Number },
  healthInsurance: { type: Number },
  carLoan: { type: Number },
  creditCardInterest: { type: Number },
  otherLoans: { type: Number },
  payingOffDebt: { type: Number },
  charityDonations: { type: Number },
  otherInsuranceFinancial: { type: Number },

  // Housing Expenses
  mortgageRent: { type: Number },
  bodyCorporateFees: { type: Number },
  councilRates: { type: Number },
  furnitureAppliances: { type: Number },

  // Utilities
  electricity: { type: Number },
  gas: { type: Number },
  water: { type: Number },
  internet: { type: Number },
  payTV: { type: Number },
  homePhone: { type: Number },
  mobile: { type: Number },
  otherHomeUtilities: { type: Number },

  // Groceries
  supermarket: { type: Number },
  fruitAndVegMarket: { type: Number },
  fishShop: { type: Number },
  deliAndBakery: { type: Number },
  petFood: { type: Number },
  otherGroceries: { type: Number },
  totalGroceries: { type: Number },

  // Personal Care
  cosmeticsToiletries: { type: Number },
  hairBeauty: { type: Number },
  medicinesPharmacy: { type: Number },
  glassesEyeCare: { type: Number },
  dental: { type: Number },
  doctorsMedical: { type: Number },

  // Personal and Leisure
  hobbies: { type: Number },
  clothingShoes: { type: Number },
  jewelleryAccessories: { type: Number },
  computersGadgets: { type: Number },
  sportsGym: { type: Number },
  education: { type: Number },
  petCareVet: { type: Number },
  otherPersonalMedical: { type: Number },

  // Food and Drinks
  coffeeTea: { type: Number },
  lunchesBought: { type: Number },
  takeAwaySnacks: { type: Number },
  drinksAlcohol: { type: Number },

  // Entertainment
  barsClubs: { type: Number },
  restaurants: { type: Number },
  books: { type: Number },
  newspaperMagazines: { type: Number },
  moviesMusic: { type: Number },
  holidays: { type: Number },
  celebrationsGifts: { type: Number },
  otherEntertainment: { type: Number },

  // Transportation
  busTrainFerry: { type: Number },
  petrol: { type: Number },
  roadTollsParking: { type: Number },
  repairsMaintenance: { type: Number },
  fines: { type: Number },
  airfares: { type: Number },
  otherTransportAuto: { type: Number },

  // Children and Family
  babyProducts: { type: Number },
  toys: { type: Number },
  babysitting: { type: Number },
  childcare: { type: Number },
  sportsActivities: { type: Number },
  schoolFees: { type: Number },
  excursions: { type: Number },
  schoolUniforms: { type: Number },
  otherSchoolNeeds: { type: Number },
  otherChildren: { type: Number },



  // summary
  totalIncome: { 
    type: Number,
    default: function() {
      return this.homePay + this.partnerPay + this.bonusPay + this.investmentsPay + this.familyPay + this.otherPay;
    }
  },
  totalExpense: { 
    type: Number,
    default: function() {
      return this.carInsurance + this.homeContentsInsurance + this.personalLifeInsurance + this.healthInsurance + this.carLoan + this.creditCardInterest + this.otherLoans + this.payingOffDebt + this.charityDonations + this.otherInsuranceFinancial + this.mortgageRent + this.bodyCorporateFees + this.councilRates + this.furnitureAppliances + this.electricity + this.gas + this.water + this.internet + this.payTV + this.homePhone + this.mobile + this.otherHomeUtilities + this.totalGroceries + this.cosmeticsToiletries + this.hairBeauty + this.medicinesPharmacy + this.glassesEyeCare + this.dental + this.doctorsMedical + this.hobbies + this.clothingShoes + this.jewelleryAccessories + this.computersGadgets + this.sportsGym + this.education + this.petCareVet + this.otherPersonalMedical + this.coffeeTea + this.lunchesBought + this.takeAwaySnacks + this.drinksAlcohol + this.barsClubs + this.restaurants + this.books + this.newspaperMagazines + this.moviesMusic + this.holidays + this.celebrationsGifts + this.otherEntertainment + this.busTrainFerry + this.petrol + this.roadTollsParking + this.repairsMaintenance + this.fines + this.airfares + this.otherTransportAuto + this.babyProducts + this.toys + this.babysitting + this.childcare + this.sportsActivities + this.schoolFees + this.excursions + this.schoolUniforms + this.otherSchoolNeeds + this.otherChildren;
    }
  },
  totalSaving: { 
    type: Number, 
    default: function() {
      return this.totalIncome - this.totalExpense;
    }
  },

});

module.exports = mongoose.model("Budget", budgetSchema);