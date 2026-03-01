const mongoose = require("mongoose");

const extraMealSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const paymentSchema = new mongoose.Schema({
  amount: Number,
  paymentMode: {
    type: String,
    enum: ["Cash", "Online"]
  },
  receiptNumber: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  rollNumber: String,
  course: String,
  fatherName: String,
  gender: {
    type: String,
    enum: ["Boy", "Girl"]
  },

  basicMessBill: {
    type: Number,
    default: function () {
      return this.gender === "Boy" ? 2510 : 2210;
    }
  },

  carryForwardBalance: {
    type: Number,
    default: 0
  },

  extraMeals: [extraMealSchema],
  payments: [paymentSchema],

  totalExtraAmount: {
    type: Number,
    default: 0
  },

  totalPaidAmount: {
    type: Number,
    default: 0
  },

  pendingAmount: {
    type: Number,
    default: 0
  },

  month: String,
  year: Number
});

module.exports = mongoose.model("Student", studentSchema);
