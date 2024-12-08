const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  announcementDate: {
    type: Date,
    required: true
  },
  announcementTime: {
    type: String, // Store time in HH:mm format as a string
    required: true
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
