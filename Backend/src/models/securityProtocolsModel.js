const mongoose = require('mongoose');

// Function to format the time in "hh:mm AM/PM"
const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

const securityProtocolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // sets the default date to the current date
  },
  time: {
    type: String,
    default: getCurrentTime, // sets the default time to the current time in "hh:mm AM/PM" format
  },
});

module.exports = mongoose.model('SecurityProtocol', securityProtocolSchema);
