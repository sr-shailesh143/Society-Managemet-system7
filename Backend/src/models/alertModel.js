const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    alertType: {
        type: String,
        required: true,
        enum: ['Emergency', 'Warning', 'Fire alarm', 'Earth Quake', 'High Winds', 'Thunder'],
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Alert', alertSchema);
