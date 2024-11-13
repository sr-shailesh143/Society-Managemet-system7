const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requesterName: {
    type: String,
    required: true,
  },
  requestName: {
    type: String,
    required: true,
  },
  requestDate: {
    type: Date,
    required: false,
  },
  wing: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Open', 'Pending', 'Solve'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
