const Security = require("../models/Security");
const cloudinary = require("../config/cloudinaryConfig");

// Add Security Personnel with File Uploads
exports.addSecurity = async (req, res) => {
    try {
        const { fullName, MailOrPhone, gender, shift, shiftDate, shiftTime } = req.body;

       
        if (!fullName || !MailOrPhone || !gender || !shift || !shiftDate || !shiftTime ) {
            return res.status(400).json({ error: "All fields, including phoneNumber, are required" });
        }



      
        if (!req.files || !req.files.photo || !req.files.aadharCard) {
            return res.status(400).json({ error: "Photo and Aadhar card are required" });
        }

      
        const photoUploadResult = await cloudinary.uploader.upload(req.files.photo[0].path, { resource_type: "image" });
        const aadharUploadResult = await cloudinary.uploader.upload(req.files.aadharCard[0].path, { resource_type: "image" });


        // Save to database
        const newSecurity = new Security({
            fullName,
            MailOrPhone,
            gender,
            shift,
            shiftDate,
            shiftTime,
            photo: photoUploadResult.secure_url,
            aadharCard: aadharUploadResult.secure_url,
        });

        await newSecurity.save();
        res.status(201).json({ message: "Security personnel added successfully.", security: newSecurity });
    } catch (error) {
        res.status(500).json({ error: "Server error while adding security personnel" });
    }
};


// Get All Security Personnel
exports.getAllSecurity = async(req,res)=>{
    try {
        const security = await Security.find();
        if(security.length>0){
            res.json({
                success: true,
                records: security,
            });
        }else{
            res.json({
                success: false,
                records: security,
            });
        }
    } catch (error) {
    }
  }

// Get Security Personnel by ID
exports.getSecurityById = async (req, res) => {
    try {
      const { id } = req.params;
      const security = await Security.findById(id);
      if (security) {
        res.json({
          success: true,
          record: security,
        });
      } else {
        res.json({
          success: false,
          message: "Security personnel not found",
        });
      }
    } catch (error) {
    }
  };

// Update Security Personnel by ID
exports.updateSecurity = async (req, res) => {
    try {
        const { fullName, MailOrPhone, gender, shift, shiftDate, shiftTime } = req.body;
        
        
        const security = await Security.findById(req.params.id);

        if (!security) {
            return res.status(404).json({ error: "Security personnel not found" });
        }

           // Validate gender and shift fields
        if (gender && !["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender value" });
        }
        if (shift && !["Day", "Night"].includes(shift)) {
            return res.status(400).json({ error: "Invalid shift value" });
        }

        // Update profile photo if provided
        if (req.files && req.files.photo) {
            const photoUploadResult = await cloudinary.uploader.upload(req.files.photo[0].path, { resource_type: "image" });
            security.photo = photoUploadResult.secure_url;
        }

        // Update Aadhar card if provided
        if (req.files && req.files.aadharCard) {
            const aadharUploadResult = await cloudinary.uploader.upload(req.files.aadharCard[0].path, { resource_type: "image" });
            security.aadharCard = aadharUploadResult.secure_url;
        }

        // Update other fields
        security.fullName = fullName || security.fullName;
        security.MailOrPhone = MailOrPhone || security.MailOrPhone;
        security.gender = gender || security.gender;
        security.shift = shift || security.shift;
        security.shiftDate = shiftDate || security.shiftDate;
        security.shiftTime = shiftTime || security.shiftTime;

        await security.save();
        res.status(200).json({ message: "Security personnel updated successfully", security });
    } catch (error) {
        res.status(500).json({ error: "Error updating security personnel" });
    }
};

// Delete Security Personnel by ID
exports.deleteSecurity = async (req, res) => {
    try {
      //const id =req.params.id;
      const { id } = req.params;
      // const security = await Security.findByIdAndDelete({_id:id})
      const security = await Security.findByIdAndDelete(id);
  
      if (security) {
        res.json({
          success: true,
          message: "Security personnel deleted successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Security personnel not deleted",
        });
      }
    } catch (error) {
    }
  };
