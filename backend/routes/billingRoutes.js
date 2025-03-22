const express = require("express");
const Bill = require("../models/Bill");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { patientName, services, total } = req.body;
    if (!patientName || !services.length) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newBill = new Bill({ patientName, services, total });
    await newBill.save();

    res.status(201).json({ message: "Bill saved successfully", bill: newBill });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Get a bill by ID
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Delete a bill
router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
