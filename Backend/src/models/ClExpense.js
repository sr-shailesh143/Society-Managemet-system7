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
        type: String,
        required: false,
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
