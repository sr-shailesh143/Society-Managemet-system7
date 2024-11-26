const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  maintenanceAmount: { type: Number, required: true },
  penaltyAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  penaltyAfterDays: { type: Number, required: true, enum: ['2days', '4days', '6days'], },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
