
const router = require("express").Router();
const announcementController = require('../controllers/announcementController');

// Create a new announcement
router.post("/createAnnouncement", announcementController.createAnnouncement);

// Get all announcements
router.get('/getAllAnnouncements', announcementController.getAllAnnouncements);

// Get a single announcement by ID
router.get('/getAnnouncementById/:id', announcementController.getAnnouncementById);

// Update an announcement by ID
router.patch('/updateAnnouncement/:id', announcementController.updateAnnouncement);

// Delete an announcement by ID
router.delete('/deleteAnnouncement/:id', announcementController.deleteAnnouncement);

module.exports = router;
