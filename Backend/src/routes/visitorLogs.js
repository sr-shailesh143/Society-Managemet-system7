const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');
const upload = multer({ storage });
const visitorLogController = require('../controllers/visitorLogController');


// Route to create a new visitor log (with image upload)
router.post('/', upload.single('visitorImg'), visitorLogController.createVisitorLog);

// Route to get all visitor logs
router.get('/', visitorLogController.getVisitorLogs);

// Route to get a single visitor log by ID
router.get('/:id', visitorLogController.getVisitorLogById);

// Route to update an existing visitor log by ID (with optional image upload)
router.patch('/:id', upload.single('visitorImg'), visitorLogController.updateVisitorLog);

// Route to delete a visitor log by ID
router.delete('/:id', visitorLogController.deleteVisitorLog);

module.exports = router;
