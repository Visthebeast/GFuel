const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    complaint: { type: String, required: true },
    employeeid: { type: String, required: true },
    employerid: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
