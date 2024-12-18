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
    required: true 
  },

});

module.exports = mongoose.model('Visitortracking', visitorSchema);
