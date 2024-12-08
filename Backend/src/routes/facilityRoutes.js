const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');

// Create a new facility
router.post('/createFacility', facilityController.createFacility);

// Get all facilities
router.get('/getAllFacilities', facilityController.getAllFacilities);

// Get a single facility by ID
router.get('/facility/:id', facilityController.getFacilityById);

// Update a facility by ID
router.patch('/updateFacility/:id', facilityController.updateFacility);

// Delete a facility by ID
router.delete('/deleteFacility/:id', facilityController.deleteFacility);

module.exports = router;
