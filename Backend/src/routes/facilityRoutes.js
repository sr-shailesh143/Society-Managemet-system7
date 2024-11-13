const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');

// Create a new facility
router.post('/create/facility', facilityController.createFacility);

// Get all facilities
router.get('/get/facility', facilityController.getAllFacilities);

// Get a single facility by ID
router.get('/facility/:id', facilityController.getFacilityById);

// Update a facility by ID
router.patch('/update/facility/:id', facilityController.updateFacility);

// Delete a facility by ID
router.delete('/delete/facility/:id', facilityController.deleteFacility);

module.exports = router;
