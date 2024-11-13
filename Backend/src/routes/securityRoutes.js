const express = require("express");
const router = express.Router();
const securityController = require("../controllers/securityController");
const upload = require("../utils/Clupload");

// Create a new security personnel
router.post(
    "/Create/security", 
    upload.fields([{ name: "photo", maxCount: 1 }, { name: "aadharCard", maxCount: 1 }]), 
    securityController.addSecurity
);

// Get all security personnel
router.get("/get/security", securityController.getAllSecurity);

// Get a specific security personnel by ID
router.get("/:id", securityController.getSecurityById);

// Update a specific security personnel by ID
router.patch(
    "/update/security/:id",
    upload.fields([{ name: "photo", maxCount: 1 }, { name: "aadharCard", maxCount: 1 }]), 
    securityController.updateSecurity
);

// Delete a specific security personnel by ID
router.delete("/delete/security/:id", securityController.deleteSecurity);

module.exports = router;
