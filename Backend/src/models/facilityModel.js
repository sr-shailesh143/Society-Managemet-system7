const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  scheduleServiceDate: {
    type: Date,
    required: true
  },
  remindBefore: {
    type: String,
    enum: ['1-day', '2-day', '3-day', '4-day', '5-day', '6-day'],
    default: '4-day',
    required: true
  }
});

module.exports = mongoose.model('Facility', facilitySchema);
