const mongoose = require("mongoose");

const ClexpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    bill:{
        type: String,
        required: true,
    }
   
}, {
    timestamps: true,
});

module.exports = mongoose.model("ClExpense", ClexpenseSchema);
