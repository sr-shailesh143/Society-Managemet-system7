const Profile = require("../models/profileModel");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs"); // For cleaning up temporary files

exports.createProfile = async (req, res) => {
  console.log("createProfile");

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
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload file to Cloudinary");
      }
    };

    const cloudinaryResult = await uploadFileToCloudinary(req.file.path);
    console.log("Cloudinary result:", cloudinaryResult.secure_url);

    // Destructure profile details from request body
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
      image: cloudinaryResult.secure_url, // Cloudinary image URL
    });

    console.log("Profile created:", profile);

    // Cleanup: Delete the file from the server after uploading to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temporary file:", err);
    });

    // Send success response
    res.status(201).json({ message: "User created successfully", profile });
  } catch (error) {
    console.error("Error during profile creation:", error);

    // Handle specific errors (optional)
    if (error.message.includes("Cloudinary")) {
      return res.status(500).json({ error: "File upload failed, try again." });
    }

    // Send generic error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};