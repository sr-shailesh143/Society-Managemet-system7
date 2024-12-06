const NotificationController = require("../controllers/notificationController");
const { auth } = require("../middlewares/Auth");
const express = require("express");
const router = express.Router();

// Route to fetch all notifications (filtered or unfiltered)
router.get("/notifications", auth, NotificationController.fetchFilteredNotifications);

// Export the router
module.exports = router;
