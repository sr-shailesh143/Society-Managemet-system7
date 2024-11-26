const Maintenance = require('../models/maintenanceModel');
const { compare } = require("../utils/Machpass");
const User = require("../models/usermodel")


// Utility function to validate the password
const validatePassword = async (userId, providedPassword) => {
    const user = await User.findById(userId); // Find user by ID
    if (!user) throw new Error('User not found'); // Throw error if user doesn't exist
  
    const isMatch = await compare(providedPassword, user.password); // Compare password
    if (!isMatch) throw new Error('Incorrect password'); // Throw error if password is incorrect
  
    return true; // Return true if password is correct
  };
  
  // Add maintenance record with password validation
  exports.addMaintenance = async (req, res) => {
    const { maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays, password } = req.body;
  
    try {
      // Validate password
      await validatePassword(req.user.id, password);
  
      // Proceed to add maintenance record
      const maintenance = await Maintenance.create({
        maintenanceAmount,
        penaltyAmount,
        dueDate,
        penaltyAfterDays,
        user: req.user.id,
      });
  
      res.status(201).json({ message: 'Maintenance added successfully', data:maintenance });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update maintenance record with password validation
  exports.updateMaintenance = async (req, res) => {
    const { id } = req.params;
    const { maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays, password } = req.body;
  
    try {
      // Validate password
      await validatePassword(req.user.id, password);
  
      // Proceed to update the maintenance record
      const updatedRecord = await Maintenance.findOneAndUpdate(
        { _id: id, user: req.user.id }, // Ensure the logged-in user owns this record
        { maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays },
        { new: true, runValidators: true }
      );
  
      if (!updatedRecord) {
        return res.status(404).json({ message: 'Maintenance record not found' });
      }
  
      res.status(200).json({ message: 'Maintenance updated successfully', updatedRecord });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete maintenance record with password validation
  exports.deleteMaintenance = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
  
    try {
      // Validate password
      await validatePassword(req.user.id, password);
  
      // Proceed to delete the maintenance record
      const deletedRecord = await Maintenance.findOneAndDelete({ _id: id, user: req.user.id });
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Maintenance record not found' });
      }
  
      res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  