const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const Security = require('../models/Security');
const senData = require('../config/mailer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

// Utility function to generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
};
exports.addSecurity = async (req, res) => {
    try {
        const { fullName, MailOrPhone, gender, shift, shiftDate, shiftTime } = req.body;

        if (!["Male", "Female", "Other"].includes(gender) || !["Day", "Night"].includes(shift)) {
            return res.status(400).json({ error: "Invalid gender or shift value" });
        }

        if (!req.files || !req.files.photo || !req.files.aadharCard) {
            return res.status(400).json({ error: "Photo and Aadhar card are required" });
        }

        const photoUploadResult = await cloudinary.uploader.upload(req.files.photo[0].path, { resource_type: "image" });
        const aadharUploadResult = await cloudinary.uploader.upload(req.files.aadharCard[0].path, { resource_type: "image" });

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000; 

        // Send OTP using the provided mailer
        await senData(
            MailOrPhone, 
            'Your OTP for Security Registration', 
            otp
        );

        // Save Security Personnel with OTP
        const newSecurity = new Security({
            fullName,
            MailOrPhone,
            gender,
            shift,
            shiftDate,
            shiftTime,
            photo: photoUploadResult.secure_url,
            aadharCard: aadharUploadResult.secure_url,
            otp,
            otpExpiry
        });

        await newSecurity.save();
        res.status(201).json({ message: "Security personnel added successfully. OTP sent to email.", security: newSecurity });
    } catch (error) {
        console.error("Error adding security personnel:", error);
        res.status(500).json({ error: "Error adding security personnel" });
    }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
    try {
        const { id } = req.params;
        const security = await Security.findById(id);

        if (!security) {
            return res.status(404).json({ error: "Security personnel not found" });
        }

        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        security.otp = otp;
        security.otpExpiry = otpExpiry;
        await security.save();

        await senData(
            security.MailOrPhone,
            'Resend OTP',
            otp
        );

        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({ error: "Error resending OTP" });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { id, otp } = req.body;
        const security = await Security.findById(id);

        if (!security) {
            return res.status(404).json({ error: "Security personnel not found" });
        }

        if (security.otp !== parseInt(otp) || security.otpExpiry < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        security.otp = null; 
        security.otpExpiry = null;
        await security.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Error verifying OTP" });
    }
};

// Get All Security Personnel
exports.getAllSecurity = async (req, res) => {
    try {
        const security = await Security.find();
        res.json({
            success: security.length > 0,
            records: security,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch security personnel' });
    }
};

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
        console.log(error);
        res.status(500).json({ error: 'Error fetching security personnel' });
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
        console.error("Error updating security personnel:", error);
        res.status(500).json({ error: "Error updating security personnel" });
    }
};

// Delete Security Personnel by ID
exports.deleteSecurity = async (req, res) => {
    try {
        const { id } = req.params;
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
        console.log(error);
        res.status(500).json({ error: 'Error deleting security personnel' });
    }
};
