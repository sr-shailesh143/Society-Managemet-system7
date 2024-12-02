const crypto = require("crypto");
const fs = require("fs");
const { cloudinary } = require("../utils/cloudinary");
const Owner = require("../models/OwnerModel");
const { hash } = require("../utils/hashPassword");
const { sendData } = require("../config/mailer");
const { ForgotFormatResident } = require("../utils/emailTemplates");

exports.addOwnerData = async (req, res) => {
  try {
    // Function to generate a random numeric password
    const generatePassword = (length = 6) => {
      const password = crypto.randomInt(0, Math.pow(10, length)).toString();
      return password.padStart(length, "0");
    };

    // Generate a random password and hash it
    const password = generatePassword();
    const hashedPassword = await hash(password);

    console.log("Generated Password:", password);

    // // Utility to upload files to Cloudinary and delete local files
    // const uploadAndDeleteLocal = async (fileArray) => {
    //   if (fileArray && fileArray[0]) {
    //     const filePath = fileArray[0].path;
    //     try {
    //       const result = await cloudinary.uploader.upload(filePath);
    //       fs.unlink(filePath, (err) => {
    //         if (err) console.error("Error deleting local file:", err);
    //       });
    //       return result.secure_url;
    //     } catch (error) {
    //       console.error("Error uploading file to Cloudinary:", error.message);
    //       throw error;
    //     }
    //   }
    //   return null;
    // };
    
    const uploadAndDeleteLocal = async (file) => {
      const { buffer, originalname } = file; // Ensure file contains these properties
      const folderName = 'your_folder_name';
  
      try {
          const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream({ folder: folderName }, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
              });
  
              // Pipe buffer to upload stream
              const stream = require('stream');
              const readableStream = new stream.PassThrough();
              readableStream.end(buffer);
              readableStream.pipe(uploadStream);
          });
  
          return result;
      } catch (err) {
          console.error('Error uploading file to Cloudinary:', err);
          throw err;
      }
  };
  
    

    // Extracting fields from request body
    const {
      Fullname,
      Phonenumber,
      Emailaddress,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Member_Counting,
      Vehicle_Counting,
      role,
      Resident_status,
      UnitStatus,
    } = req.body;

    // Log incoming files
    console.log("Received Files:", req.files);

    // Upload files to Cloudinary
    const filesToUpload = [
      { key: "profile", file: req.files?.profile },
      { key: "Aadharfront", file: req.files?.Aadharfront },
      { key: "Aadharback", file: req.files?.Aadharback },
      { key: "Addressproof", file: req.files?.Addressproof },
      { key: "Rent_Agreement", file: req.files?.Rent_Agreement },
    ];

    const uploadedFiles = await Promise.all(
      filesToUpload.map(({ file }) => uploadAndDeleteLocal(file))
    );

    const [profile, Aadharfront, Aadharback, Addressproof, Rent_Agreement] =
      uploadedFiles;

    // Validate required fields
    if (
      !Fullname ||
      !Phonenumber ||
      !Emailaddress ||
      !Age ||
      !Gender ||
      !Wing ||
      !Unit ||
      !Relation ||
      !Member_Counting ||
      !Vehicle_Counting ||
      !profile ||
      !Aadharfront ||
      !Aadharback ||
      !Addressproof ||
      !Rent_Agreement
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create a new Owner document
    const newOwner = new Owner({
      Fullname,
      Phonenumber,
      Emailaddress,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      profile,
      Aadharfront,
      Aadharback,
      Addressproof,
      Rent_Agreement,
      password: hashedPassword,
      role: role || "resident", // Default to "resident"
      Resident_status: Resident_status || "Owner", // Default to "Owner"
      UnitStatus: UnitStatus || "Occupied", // Default to "Occupied"
      Member_Counting: Member_Counting ? JSON.parse(Member_Counting) : [], // Parse if provided
      Vehicle_Counting: Vehicle_Counting ? JSON.parse(Vehicle_Counting) : [], // Parse if provided
    });

    await newOwner.save();

    // Send email with login details
    await sendData(
      Emailaddress,
      "Welcome to the Society",
      ForgotFormatResident(Fullname, Emailaddress, password)
    );

    res.status(201).json({
      success: true,
      message: "Owner data added successfully",
    });
  } catch (error) {
    console.error("Error adding owner data:", error);

    // Return a generic error response
    res.status(500).json({
      success: false,
      message: "Failed to add owner data",
    });
  }
};
