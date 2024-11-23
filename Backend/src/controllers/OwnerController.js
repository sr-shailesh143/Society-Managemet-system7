const Owner = require("../models/OwnerModel");
const cloudinary = require("../config/cloudinaryConfig");
const { hash } = require("../utils/hashPassword");
const { sendEmail } = require("../config/mailer");
const { ForgotFormatResident } = require("../utils/emailTemplates");
const fs = require("fs/promises");

exports.addOwnerData = async (req, res) => {
  try {
    const {
      Full_name,
      Phone_number,
      Email_address,
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

    const password = Math.random().toString(36).slice(-8); // Generate random password
    const hashedPassword = await hash(password);

    const uploadAndDeleteLocal = async (fileArray) => {
      if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        const result = await cloudinary.uploader.upload(filePath);
        await fs.unlink(filePath); // Delete local file after upload
        return result.secure_url;
      }
      return "";
    };

    const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
    const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
    const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
    const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
    const Rent_Agreement = await uploadAndDeleteLocal(
      req.files?.Rent_Agreement
    );

    if (
      !Full_name ||
      !Phone_number ||
      !Email_address ||
      !Age ||
      !Gender ||
      !Wing ||
      !Unit ||
      !Relation ||
      !Member_Counting ||
      !Vehicle_Counting ||
      !profileImage ||
      !Adhar_front ||
      !Adhar_back ||
      !Address_proof ||
      !Rent_Agreement
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newOwner = new Owner({
      profileImage,
      Full_name,
      Phone_number,
      Email_address,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Adhar_front,
      Adhar_back,
      Address_proof,
      Rent_Agreement,
      role: role || "resident",
      Resident_status: Resident_status || "Owner",
      UnitStatus: UnitStatus || "Occupied",
      password: hashedPassword,
    });

    await newOwner.save();

    await sendEmail(
      Email_address,
      "Welcome to the Society",
      ForgotFormatResident(Full_name, Email_address, password)
    );

    return res
      .status(201)
      .json({ success: true, message: "Owner data added " });
  } catch (error) {
    console.error("Error adding owner data:", error);
    res.status(500).json({ success: false, message: "Failed owner data" });
  }
};
