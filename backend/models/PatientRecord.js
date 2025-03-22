const mongoose = require("mongoose");

const PatientRecordSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  prescription: { type: String, required: true },
  image: { type: String }, // Image path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PatientRecord", PatientRecordSchema);
