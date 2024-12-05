const express = require("express");
const router = express.Router();
const FinancialController = require("../controllers/maintenanceController");
const { auth } = require("../middlewares/Auth");

// Verify Maintenance Password
router.post(
  "/verifyMaintenancePassword",
  auth,
  FinancialController.verifyMaintenancePassword
);

// Add Maintenance Record
router.post(
  "/addMaintenanceRecord",
  auth,
  FinancialController.addMaintenanceRecord
);

// Get All Maintenance Records
router.get(
  "/fetchAllMaintenanceRecords",
  auth,
  FinancialController.fetchAllMaintenanceRecords
);

// Update Payment Mode for a Resident in Maintenance
router.put(
  "/maintenance/:maintenanceId/resident/updatePaymentMethod",
  auth,
  FinancialController.updatePaymentMethod
);

// Get User and Maintenance Data by ID
router.get(
  "/maintenance/fetchUserAndMaintenanceById",
  auth,
  FinancialController.fetchUserAndMaintenanceById
);

// Apply Penalty for Overdue Payments
router.post(
  "/maintenance/applyOverduePenalties",
  auth,
  FinancialController.applyOverduePenalties
);

// Fetch Maintenance Records with Completed Payments
router.get(
  "/maintenance/fetchCompletedPayments",
  auth,
  FinancialController.fetchCompletedPayments
);

module.exports = router;
