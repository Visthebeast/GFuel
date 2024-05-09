const Complaint = require("../model/ComplaintModel")

// Get complaints by employeeId
const getComplaintsByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const complaints = await Complaint.find({ employeeId });
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get complaints by employerId
const getComplaintsByEmployerId = async (req, res) => {
  try {
    const { employerId } = req.params;
    const complaints = await Complaint.find({ employerId });
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new complaint
const createComplaint = async (req, res) => {
    const newComplaint = req.body;
  try {
    const complaint = await Complaint.create(newComplaint);
    res.status(200).json(complaint);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getComplaintsByEmployeeId,
  getComplaintsByEmployerId,
  createComplaint,
};
