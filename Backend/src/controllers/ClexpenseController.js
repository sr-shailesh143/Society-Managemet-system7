const Expense = require("../models/ClExpense");
const mongoose = require('mongoose');
const cloudinary = require("../config/cloudinaryConfig")

// Add Expense with File Upload
exports.addExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
       
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req?.file?.path, { resource_type: "auto" });
      
        const newExpense = new Expense({
            title,
            description,
            date,
            amount,
            bill: result.secure_url,  // Cloudinary URL
        });
        
        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ error: "Error adding expense" });
    }
};

// Get All Expenses
exports.getAllExpenses = async(req,res)=>{
    try {
        const user = await Expense.find();
        if(user.length>0){
            res.json({
                success: true,
                records: user,
            });
        }else{
            res.json({
                success: false,
                records: user,
            });
        }
    } catch (error) {
    }
  }

// Get Expense by ID
exports.getExpenseById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Expense.findById(id);
      if (user) {
        res.json({
          success: true,
          record: user,
        });
      } else {
        res.json({
          success: false,
          message: "Expense not found",
        });
      }
    } catch (error) {
    }
  };

// Update Expense by ID
exports.updateExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
        
        // Check if a new file is uploaded
        let billUrl = req.body.bill;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
            billUrl = result.secure_url;
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, description, date, amount, bill: billUrl },
            { new: true }
        );

        res.status(200).json({ message: "Expense updated successfully", updatedExpense });
    } catch (error) {
        res.status(500).json({ error: "Error updating expense" });
    }
};



// Delete Expense by ID
exports.deleteExpense = async (req, res) => {
  const { id } = req.params; // Extract 'id' from the request parameters

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Expense ID' });
  }

  try {
    const expense = await Expense.findByIdAndDelete(id); // Delete the expense by id
    if (expense) {
      return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting expense' });
  }
};