const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  maintenanceAmount: { type: Number, required: true },
  penaltyAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  penaltyAfterDays: { type: String, required: true, enum: ['1Days', '2Days', '3Days','4Days', '5Days', '6Days'],default: '4-Days'},
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
