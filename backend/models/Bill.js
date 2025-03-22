const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  services: [
    {
      name: { type: String, required: true },
      cost: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;
