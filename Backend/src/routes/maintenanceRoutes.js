const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth"); // Middleware to validate user authentication
const {
  validatePassword,
  addMaintenance,
  getAllMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

// Routes for maintenance management

// Password validation and authentication required
router.post("/validate-password",auth,validatePassword);

// Route to add a new maintenance record
router.post("/add", auth, addMaintenance);

// Get all maintenance records 
router.get('/all', auth, getAllMaintenance);

// Route to update an existing maintenance record
router.patch("/update/:id", auth, updateMaintenance);

// Route to delete a maintenance record
router.delete("/delete/:id", auth, deleteMaintenance);

module.exports = router;
