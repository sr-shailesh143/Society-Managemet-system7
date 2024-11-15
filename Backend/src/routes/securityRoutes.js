const express = require("express");
const router = express.Router();
const securityController = require("../controllers/securityController");
const upload = require("../utils/Clupload");

// Create a new security personnel
router.post(
    "/addSecurity", 
    upload.fields([{ name: "photo", maxCount: 1 }, { name: "aadharCard", maxCount: 1 }]), 
    securityController.addSecurity
);

// Get all security personnel
router.get("/getAllSecurity", securityController.getAllSecurity);

// Get a specific security personnel by ID
router.get("/security/:id", securityController.getSecurityById);

// Update a specific security personnel by ID
router.patch(
    "/updateSecurity/:id",
    upload.fields([{ name: "photo", maxCount: 1 }, { name: "aadharCard", maxCount: 1 }]), 
    securityController.updateSecurity
);

// Delete a specific security personnel by ID
router.delete("/deleteSecurity/:id", securityController.deleteSecurity);

module.exports = router;
