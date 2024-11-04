const resident = require('../models/residentmodels'); 
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")

exports.addresidentData = async (req, res) => {
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
            Vehicle_Counting
        } = req.body;

        // Helper function to upload images to Cloudinary
        let result =  uploadImageToCloudinary = async (file) => {
             result = await cloudinary.uploader.upload(file, {
                folder: 'resident_documents' 
            });
            return result.secure_url; 
        };
        
        // Upload each image to Cloudinary
        const Adhar_front_side = req.files.Adhar_front_side ? await uploadImageToCloudinary(req.files.Adhar_front_side[0].path) : null;
        const Adhar_back_side = req.files.Adhar_back_side ? await uploadImageToCloudinary(req.files.Adhar_back_side[0].path) : null;
        const Address_proof = req.files.Address_proof ? await uploadImageToCloudinary(req.files.Address_proof[0].path) : null;
        const Rent_Agreement = req.files.Rent_Agreement ? await uploadImageToCloudinary(req.files.Rent_Agreement[0].path) : null;

        // Create a new resident document
        const newresident = new resident({
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Adhar_front_side:result.secure_url,
            Adhar_back_side:result.secure_url,
            Address_proof:result.secure_url,
            Rent_Agreement:result.secure_url,
            cloudinary_id: result.public_id
        });

      
        await newresident.save();
        [req.files.Adhar_front_side, req.files.Adhar_back_side, req.files.Address_proof, req.files.Rent_Agreement].forEach(fileArray => {
            if (fileArray) {
                fs.unlink(fileArray[0].path, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err);
                    } else {
                        console.log("File deleted from server.");
                    }
                });
            }
        });

        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            await resident.updateOne(
                { _id: newresident._id },
                { $push: { Member_Counting: { $each: members } } }
            );
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            await resident.updateOne(
                { _id: newresident._id },
                { $push: { Vehicle_Counting: { $each: vehicles } } }
            );
        }

        // Send success response
        res.status(201).json({
            success: true,
            message: "resident data added successfully 👍",
            
        });
    } catch (error) {
        console.error("Error adding resident data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add resident data 👎"
        });
    }
};