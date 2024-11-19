const VisitorLog = require('../models/VisitorLog');
const { cloudinary } = require('../config/cloudinaryConfig');


// Create a new visitor log
exports.createVisitorLog = async (req, res) => {
  try {
    const log = new VisitorLog({
      visitorImg: req.file.path,
      visitorName: req.body.visitorName,
      phoneNumber: req.body.phoneNumber,
      date: req.body.date,
      unitNumber: req.body.unitNumber,
      time: req.body.time,
    });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all visitor logs
exports.getVisitorLogs = async (req, res) => {
  try {
    const logs = await VisitorLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single visitor log by ID
exports.getVisitorLogById = async (req, res) => {
  try {
    const log = await VisitorLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Visitor log not found" });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a visitor log by ID
exports.updateVisitorLog = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.visitorImg = req.file.path;  // Update image URL if new file uploaded
    }
    const log = await VisitorLog.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!log) return res.status(404).json({ message: "Visitor log not found" });
    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a visitor log by ID
exports.deleteVisitorLog = async (req, res) => {
  try {
    const log = await VisitorLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: "Visitor log not found" });
    
    // Delete image from Cloudinary
    const publicId = log.visitorImg.split('/').pop().split('.')[0];  // Extract public ID from URL
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ message: 'Visitor log deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
