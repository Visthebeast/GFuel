const express = require("express");
const router = express.Router();
// const complaintController = require("../../controllers/complaintsController");
const {
    getComplaintsByEmployeeId,
    getComplaintsByEmployerId,
    createComplaint,
    deleteComplaintById
    } = require("../../controllers/complaintsController")

router.get("/", (req, res) => {
  res.json({ mssg: "GET all complaints" });
});

// Get complaints by employeeId
router.get("/employee/:employeeId", getComplaintsByEmployeeId);

// Get complaints by employerId
router.get("/employer/:employerId", getComplaintsByEmployerId);

// Create a new complaint
router.post("/filecomplaint",createComplaint);

//delete a complaint by id
router.delete("/:id",deleteComplaintById)

module.exports = router;
