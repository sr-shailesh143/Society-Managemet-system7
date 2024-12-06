const Owner = require('../models/OwnerModel');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require("fs");
const crypto = require("crypto");
const sendOtpUi = require('../config/mailer');
const { hash } = require('../utils/hashpassword');




exports.CreateOwnerData = async (req, res) => {
    try {
        // Function to generate a 6-digit random password
        function generatePassword(length = 6) {
            const password = crypto.randomInt(0, Math.pow(10, length)).toString();
            return password.padStart(length, "0");
        }

        // Destructure data from the request body
        const {
            fullName,
            phoneNumber,
            emailAddress,
            age,
            gender,
            wing,
            unit,
            relation,
            memberCounting,
            vehicleCounting,
            role,
            residentStatus,
            unitStatus,
        } = req.body;

        // Validate required fields
        if (!fullName || !phoneNumber || !emailAddress || !age || !gender || !wing || !unit || !relation) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        // Generate password and hash it
        const password = generatePassword();
        const hashedPassword = await hash(password, 10);

        // Helper function to upload files to Cloudinary
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting local file:", err);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return "";
        };

        // Upload required documents
        const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
        const aadharFront = await uploadAndDeleteLocal(req.files?.aadharFront);
        const aadharBack = await uploadAndDeleteLocal(req.files?.aadharBack);
        const addressProof = await uploadAndDeleteLocal(req.files?.addressProof);
        const rentAgreement = await uploadAndDeleteLocal(req.files?.rentAgreement);

        // Validate if required files are uploaded
        if (!profileImage || !aadharFront || !aadharBack || !addressProof || !rentAgreement) {
            return res.status(400).json({
                success: false,
                message: "All files are required.",
            });
        }

        // Check if the Wing and Unit combination already exists
        const existingWingUnit = await Owner.findOne({ wing, unit });
        if (existingWingUnit) {
            return res.status(400).json({
                success: false,
                message: "This Wing and Unit combination already exists.",
            });
        }

        // Parse and validate the member and vehicle data, defaulting to empty arrays
        let members = [];
        if (memberCounting) {
            try {
                members = JSON.parse(memberCounting);
                if (!Array.isArray(members)) {
                    return res.status(400).json({
                        success: false,
                        message: "Member data must be an array.",
                    });
                }
            } catch (err) {
                console.error("Invalid member data format:", err);
                // Default to empty array if there's an error
                members = [];
            }
        }

        let vehicles = [];
        if (vehicleCounting) {
            try {
                vehicles = JSON.parse(vehicleCounting);
                if (!Array.isArray(vehicles)) {
                    return res.status(400).json({
                        success: false,
                        message: "Vehicle data must be an array.",
                    });
                }
            } catch (err) {
                console.error("Invalid vehicle data format:", err);
                // Default to empty array if there's an error
                vehicles = [];
            }
        }

        // Create a new Owner document
        const newOwner = new Owner({
            profileImage,
            fullName,
            phoneNumber,
            emailAddress,
            age,
            gender,
            wing,
            unit,
            relation,
            aadharFront,
            aadharBack,
            addressProof,
            rentAgreement,
            role: role || "resident",
            residentStatus: residentStatus || "Owner",
            unitStatus: unitStatus || "Occupied",
            password: hashedPassword,
            familyMembers: members, // Default to empty array if invalid data
            vehicles: vehicles, // Default to empty array if invalid data
        });

        // Save the Owner document to the database
        const savedOwner = await newOwner.save();

        // Send email with login details
        await sendOtpUi(
            savedOwner.emailAddress,
            "Registration Successful - Login Details",
            `Dear ${savedOwner.fullName},\n\nYou have successfully registered as a resident.\n\nHere are your login details:\nEmail: ${savedOwner.emailAddress}\nPassword: <b>${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
        );

        return res.status(201).json({
            success: true,
            message: "Owner data added successfully.",
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding owner data.",
        });
    }
};



// Get All Owners
exports.GetAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        if (!owners.length) {
            return res.status(404).json({
                success: false,
                message: "❌ No owner data found!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Owners retrieved successfully!",
            owners,
        });
    } catch (error) {
        console.error("❌ Error retrieving owners:", error);
        return res.status(500).json({
            success: false,
            message: "🚨 Something went wrong while retrieving owners.",
        });
    }
};


// Get Owner by ID
exports.getOwnerById = async (req, res) => {
  try {
      const { id } = req.params;

      const owner = await Owner.findById(id);
      if (!owner) {
          return res.status(404).json({
              success: false,
              message: "❌ Owner not found!",
          });
      }

      return res.status(200).json({
          success: true,
          message: "✅ Owner retrieved successfully!",
          owner,
      });
  } catch (error) {
      console.error("❌ Error retrieving owner by ID:", error);
      return res.status(500).json({
          success: false,
          message: "🚨 Something went wrong while retrieving the owner.",
      });
  }
};

// Update Owner Data
exports.updateOwner = async (req, res) => {
  try {
      const { id } = req.params;

      // Destructure request body
      const {
          fullName,
          phoneNumber,
          emailAddress,
          age,
          gender,
          wing,
          unit,
          relation,
          residentStatus,
          unitStatus,
      } = req.body;

      // Validate required fields
      if (!fullName || !phoneNumber || !emailAddress || !age || !gender || !wing || !unit || !relation) {
          return res.status(400).json({
              success: false,
              message: "🚫 All fields are required!",
          });
      }

      // Update owner details
      const updatedOwner = await Owner.findByIdAndUpdate(
          id,
          {
              fullName,
              phoneNumber,
              emailAddress,
              age,
              gender,
              wing,
              unit,
              relation,
              residentStatus,
              unitStatus,
          },
          { new: true }
      );

      if (!updatedOwner) {
          return res.status(404).json({
              success: false,
              message: "❌ Owner not found!",
          });
      }

      return res.status(200).json({
          success: true,
          message: "✅ Owner updated successfully!",
          owner: updatedOwner,
      });
  } catch (error) {
      console.error("❌ Error updating owner:", error);
      return res.status(500).json({
          success: false,
          message: "🚨 Something went wrong while updating the owner.",
      });
  }
};

// Delete Owner by ID
exports.deleteOwnerById = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedOwner = await Owner.findByIdAndDelete(id);
      if (!deletedOwner) {
          return res.status(404).json({
              success: false,
              message: "❌ Owner not found!",
          });
      }

      return res.status(200).json({
          success: true,
          message: "✅ Owner deleted successfully!",
      });
  } catch (error) {
      console.error("❌ Error deleting owner:", error);
      return res.status(500).json({
          success: false,
          message: "🚨 Something went wrong while deleting the owner.",
      });
  }
};

// Update Owner by ID (Partial Update)
exports.updateOwnerById = async (req, res) => {
  try {
      const { id } = req.params;

      const updateFields = req.body;

      const updatedOwner = await Owner.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedOwner) {
          return res.status(404).json({
              success: false,
              message: "❌ Owner not found!",
          });
      }

      return res.status(200).json({
          success: true,
          message: "✅ Owner data updated successfully!",
          owner: updatedOwner,
      });
  } catch (error) {
      console.error("❌ Error updating owner by ID:", error);
      return res.status(500).json({
          success: false,
          message: "🚨 Something went wrong while updating the owner.",
      });
  }
};


// Get total occupied units
exports.getTotalOccupiedUnits = async (req, res) => {
  try {
    const tenantUnits = await Tenant.find({ UnitStatus: "Occupied" }).select("Unit");
    const ownerUnits = await Owner.find({ UnitStatus: "Occupied" }).select("Unit");

    const uniqueOccupiedUnits = new Set([...tenantUnits, ...ownerUnits].map(unit => unit.Unit));
    res.status(200).json({ success: true, UnitTotal: uniqueOccupiedUnits.size });
  } catch (error) {
    console.error("Error calculating occupied units:", error);
    res.status(500).json({ success: false, message: "Error calculating occupied units" });
  }
};