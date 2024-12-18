const Profile = require("../models/profileModel");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs"); 

exports.createProfile = async (req, res) => {

  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const uploadFileToCloudinary = async (filePath) => {
      try {
        return await cloudinary.uploader.upload(filePath, {
          resource_type: "auto",
        });
      } catch (error) {
        throw new Error("Failed to upload file to Cloudinary");
      }
    };

    const cloudinaryResult = await uploadFileToCloudinary(req.file.path);

  
    const {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      selectSociety,
      country,
      state,
      city,
    } = req.body;

    // Create profile in the database
    const profile = await Profile.create({
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      selectSociety,
      country,
      state,
      city,
      image: cloudinaryResult.secure_url, 
    });


   
    fs.unlink(req.file.path, (err) => {
      
    });

   
    res.status(201).json({ message: "User created successfully", profile });
  } catch (error) {

   
    if (error.message.includes("Cloudinary")) {
      return res.status(500).json({ error: "File upload failed, try again." });
    }

   
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **Get All Profiles**
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **Update Profile**
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    let updatedData = {};

    // If a new file is uploaded, upload it to Cloudinary
    if (req.file) {
      const cloudinaryResult = await uploadFileToCloudinary(req.file.path);
      updatedData.image = cloudinaryResult.secure_url;
      fs.unlink(req.file.path, (err) => {
      });
    }

    const profile = await Profile.findByIdAndUpdate(id, { ...updates, ...updatedData }, { new: true });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};