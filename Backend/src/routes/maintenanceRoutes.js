

const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth"); // Middleware to validate user authentication
const {
  addMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

// Routes for maintenance management

// Route to add a new maintenance record
// Password validation and authentication required
router.post("/add", auth, addMaintenance);

// Route to update an existing maintenance record
// Password validation and authentication required
router.put("/update/:id", auth, updateMaintenance);

// Route to delete a maintenance record
// Password validation and authentication required
router.delete("/delete/:id", auth, deleteMaintenance);

module.exports = router;
