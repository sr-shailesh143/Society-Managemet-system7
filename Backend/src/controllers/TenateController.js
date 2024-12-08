const Tenant = require("../models/Tenantmodel");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");
const crypto = require("crypto");
const sendOtpUi = require("../config/mailer");
const { hash } = require("../utils/hashpassword");



// Add Tenant Data
exports.addTenantData = async (req, res) => {
  try {
      // Function to generate a 6-digit random password
      function generatePassword(length = 6) {
          const password = crypto.randomInt(0, Math.pow(10, length)).toString();
          return password.padStart(length, "0");
      }

      // Destructure data from the request body
      const {
        ownerFullName,
        ownerPhoneNumber,
        ownerAddress,
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
      if (!ownerFullName || ownerPhoneNumber || ownerAddress || fullName || !phoneNumber || !emailAddress || !age || !gender || !wing || !unit || !relation) {
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
      const tenantImage = await uploadAndDeleteLocal(req.files?.tenantImage);
      const aadharFront = await uploadAndDeleteLocal(req.files?.aadharFront);
      const aadharBack = await uploadAndDeleteLocal(req.files?.aadharBack);
      const addressProof = await uploadAndDeleteLocal(req.files?.addressProof);
      const rentAgreement = await uploadAndDeleteLocal(req.files?.rentAgreement);

      // Validate if required files are uploaded
      if (!tenantImage || !aadharFront || !aadharBack || !addressProof || !rentAgreement) {
          return res.status(400).json({
              success: false,
              message: "All files are required.",
          });
      }

      // Check if the Wing and Unit combination already exists
      const existingWingUnit = await Tenant.findOne({ wing, unit });
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
      const newTenant = new Tenant({
          profileImage,
          ownerFullName,
        ownerPhoneNumber,
        ownerAddress,
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
          residentStatus: residentStatus || "Tenant",
          unitStatus: unitStatus || "Occupied",
          password: hashedPassword,
          familyMembers: members, // Default to empty array if invalid data
          vehicles: vehicles, // Default to empty array if invalid data
      });

      // Save the Owner document to the database
      const savedTenant = await newTenant.save();

      // Send email with login details
      await sendOtpUi(
        savedTenant.emailAddress,
          "Registration Successful - Login Details",
          `Dear ${savedTenant.fullName},\n\nYou have successfully registered as a resident.\n\nHere are your login details:\nEmail: ${savedOwner.emailAddress}\nPassword: <b>${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
      );

      return res.status(201).json({
          success: true,
          message: "Tenant data added successfully.",
      });
  } catch (error) {
      console.error("Error adding Tenant data:", error);
      return res.status(500).json({
          success: false,
          message: "Something went wrong while adding Tenant data.",
      });
  }
};




// Get All Tenants
exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    if (!tenants || tenants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "⚠️ No tenant data found. Please add tenants first.",
      });
    }

    return res.status(200).json({
      success: true,
      tenants,
      message: "✅ Tenant data retrieved successfully! 📋",
    });
  } catch (error) {
    console.error("❌ Error fetching tenant data:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Oops! Failed to fetch tenant data. Please try again later.",
    });
  }
};

exports.updateTenantData = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        ownerFullName,
        ownerPhoneNumber,
        ownerAddress,
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
      } = req.body;
  
      // Function to upload files to Cloudinary and delete them locally
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            const result = await cloudinary.uploader.upload(filePath);
            fs.unlink(filePath, (err) => {
              if (err) console.error("❌ Error deleting file from server:", err);
            });
            return result.secure_url;
          } catch (error) {
            console.error("❌ Error uploading to Cloudinary:", error);
            throw error;
          }
        }
        return "";
      };
  
      // Upload new files if provided
      const tenantImage = await uploadAndDeleteLocal(req.files?.tenantImage);
      const aadharFront = await uploadAndDeleteLocal(req.files?.aadharFront);
      const aadharBack = await uploadAndDeleteLocal(req.files?.aadharBack);
      const addressProof = await uploadAndDeleteLocal(req.files?.addressProof);
      const rentAgreement = await uploadAndDeleteLocal(req.files?.rentAgreement);
  
      // Find the tenant to update
      const tenant = await Tenant.findById(id);
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: "🚫 Tenant not found. Please check the ID.",
        });
      }
  
      // Check for duplicate Wing and Unit
      if (wing && unit) {
        const existingTenant = await Tenant.findOne({ wing, unit });
        if (existingTenant && existingTenant._id.toString() !== id) {
          return res.status(400).json({
            success: false,
            message: "🚫 Wing and Unit combination already exists for another tenant.",
          });
        }
      }
  
      // Update tenant fields
      if (ownerFullName) tenant.ownerFullName = ownerFullName;
      if (ownerPhoneNumber) tenant.ownerPhoneNumber = ownerPhoneNumber;
      if (ownerAddress) tenant.ownerAddress = ownerAddress;
      if (fullName) tenant.fullName = fullName;
      if (phoneNumber) tenant.phoneNumber = phoneNumber;
      if (emailAddress) tenant.emailAddress = emailAddress;
      if (age) tenant.age = age;
      if (gender) tenant.gender = gender;
      if (wing) tenant.wing = wing;
      if (unit) tenant.unit = unit;
      if (relation) tenant.relation = relation;
      if (role) tenant.role = role;
      if (tenantImage) tenant.tenantImage = tenantImage;
      if (aadharFront) tenant.aadharFront = aadharFront;
      if (aadharBack) tenant.aadharBack = aadharBack;
      if (addressProof) tenant.addressProof = addressProof;
      if (rentAgreement) tenant.rentAgreement = rentAgreement;
  
      // Handle member counting
      if (memberCounting) {
        const members = JSON.parse(memberCounting);
        if (Array.isArray(members)) {
          tenant.familyMembers = members;
        }
      }
  
      // Handle vehicle counting
      if (vehicleCounting) {
        const vehicles = JSON.parse(vehicleCounting);
        if (Array.isArray(vehicles)) {
          tenant.vehicles = vehicles;
        }
      }
  
      // Save updated tenant data
      await tenant.save();
  
      return res.status(200).json({
        success: true,
        message: "✅ Tenant data updated successfully! ✨",
      });
    } catch (error) {
      console.error("❌ Error updating tenant data:", error);
      return res.status(500).json({
        success: false,
        message: "❌ Oops! Failed to update tenant data. Please try again later.",
      });
    }
  };
