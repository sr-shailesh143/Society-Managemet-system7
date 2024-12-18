const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    MailOrPhone: {
        type: String,
        required: true,
       
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    shift: {
        type: String,
        enum: ["Day", "Night"],
        required: true
    },
    shiftDate: {
        type: String,
        required: true
    },
    shiftTime: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    },
    aadharCard: {
        type: String,
        // required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Security", securitySchema);
