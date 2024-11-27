const Maintenance = require('../models/maintenanceModel');
const { compare } = require("../utils/Machpass");
const User = require("../models/usermodel")


// Controller for validating password
exports.validatePassword = async (req, res) => {
  const { password } = req.body; // Extract password from request body

  try {
    // Compare the provided password with the stored hashed password
    const isMatch = await compare(password,req.user.password);

    // If password doesn't match
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Password is correct
    return res.status(200).json({ message: "Password is correct" });
  } catch (error) {
    // Catch and handle any errors
    return res.status(500).json({ message: error.message });
  }
};

  // Add maintenance record 
  exports.addMaintenance = async (req, res) => {
    const { maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays} = req.body;
  
    try {
     // Proceed to add maintenance record
      const maintenance = await Maintenance.create({
        maintenanceAmount,
        penaltyAmount,
        dueDate,
        penaltyAfterDays,
       
      });
  
      res.status(201).json({ message: 'Maintenance added successfully', data:maintenance });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
// // Get all announcements  
exports.getAllMaintenance = async(req,res)=>{
    try {
        const maintenance = await Maintenance.find();
        if(maintenance.length>0){
            res.json({
                success: true,
                records: maintenance,
            });
        }else{
            res.json({
                success: false,
                records: "Maintenance not found",
            });
        }
    } catch (error) {
        console.log(error);
    }
  }
  // Update maintenance record 
  exports.updateMaintenance = async (req, res) => {
    const { id } = req.params;
    const { maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays,} = req.body;
  
    try {
     
  
      // Proceed to update the maintenance record
      const updatedRecord = await Maintenance.findOneAndUpdate(
        { _id: id }, 
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
  
  // Delete maintenance record 
  exports.deleteMaintenance = async (req, res) => {
    const { id } = req.params;
 
  
    try {
    // Proceed to delete the maintenance record
      const deletedRecord = await Maintenance.findOneAndDelete({ _id: id});
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Maintenance record not found' });
      }
  
      res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  