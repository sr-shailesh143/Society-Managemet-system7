const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  selectSociety: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String,  required: true}, 
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
