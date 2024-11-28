const Owner = require("../models/OwnerModel");
const cloudinary = require("../utils/cloudinary");
const { hash } = require("../utils/hashPassword");
const { sendData} = require("../config/mailer");
const { ForgotFormatResident } = require("../utils/emailTemplates");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.addOwnerData = async (req, res) => {
  try {
    // Function to generate a random numeric password
    const generatePassword = (length = 6) => {
      const password = crypto.randomInt(0, Math.pow(10, length)).toString();
      return password.padStart(length, "0");
    };

    // Function to upload files to Cloudinary and delete from local storage
    const uploadAndDeleteLocal = async (fileArray) => {
      if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
          const result = await cloudinary.uploader.upload(filePath);
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
          return result.secure_url;
        } catch (error) {
          throw error;
        }
      }
      return "";
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

    // Generate a random password and hash it
    const password = generatePassword();
    const hashedPassword = await hash(password);

    // Uploading files to Cloudinary
    const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
    const Aadharfront = await uploadAndDeleteLocal(req.files?.Aadharfront);
    const Aadharback = await uploadAndDeleteLocal(req.files?.Aadharback);
    const Addressproof = await uploadAndDeleteLocal(req.files?.Addressproof);
    const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

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
      !profileImage ||
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
      profileImage,
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
    res.status(500).json({
      success: false,
      message: "Failed to add owner data",
    });
  }
};
