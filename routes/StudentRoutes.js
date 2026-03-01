const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ➤ Add New Student
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Add Extra Meal
router.post("/:id/extra-meal", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    student.extraMeals.push(req.body);
    student.totalExtraAmount += req.body.price;
    student.pendingAmount =
      student.basicMessBill +
      student.totalExtraAmount +
      student.carryForwardBalance -
      student.totalPaidAmount;

    await student.save();
    res.json({ message: "Extra meal added", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Add Payment
router.post("/:id/payment", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    student.payments.push(req.body);
    student.totalPaidAmount += req.body.amount;

    student.pendingAmount =
      student.basicMessBill +
      student.totalExtraAmount +
      student.carryForwardBalance -
      student.totalPaidAmount;

    await student.save();
    res.json({ message: "Payment added", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get Single Student Bill
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
