const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  wing: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true // Store time as a string in HH:mm format
  },
  // visitorImg: {
  //   type: String, // URL for the image stored on Cloudinary
  //   required: true
  // }
});

module.exports = mongoose.model('Visitortracking', visitorSchema);
