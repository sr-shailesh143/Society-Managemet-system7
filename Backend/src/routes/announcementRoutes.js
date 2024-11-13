
const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Create a new announcement
router.post('/create/announcement', announcementController.createAnnouncement);

// Get all announcements
router.get('/get/announcement', announcementController.getAllAnnouncements);

// Get a single announcement by ID
router.get('/announcement/:id', announcementController.getAnnouncementById);

// Update an announcement by ID
router.patch('/update/announcement/:id', announcementController.updateAnnouncement);

// Delete an announcement by ID
router.delete('/delete/announcement/:id', announcementController.deleteAnnouncement);

module.exports = router;
