const Maintenance = require("../models/maintenanceModel");
const Notification = require("../models/notificationModel");
const User = require("../models/usermodel");
const Owner = require("../models/OwnerModel");
const Tenant = require("../models/Tenantmodel");
const { compare } = require("bcryptjs");

// Check Maintenance Password
exports.verifyMaintenancePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "❌ User not authenticated. Please log in.",
      });
    }

    const isPasswordValid = await compare(password, req.user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "🔒 Incorrect password. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "✅ Password verified successfully!",
    });
  } catch (error) {
    console.error("Error verifying password:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};

// Create Maintenance
exports.addMaintenanceRecord = async (req, res) => {
  try {
    const { feeAmount, lateFeeAmount, paymentDueDate, penaltyStartDate } = req.body;

    if (!feeAmount || !lateFeeAmount || !paymentDueDate || !penaltyStartDate) {
      return res.status(400).json({
        success: false,
        message: "⚠️ All fields are required.",
      });
    }

    const newMaintenance = new Maintenance({
      feeAmount,
      lateFeeAmount,
      paymentDueDate,
      penaltyStartDate,
    });

    await newMaintenance.save();

    const owners = await Owner.find();
    const tenants = await Tenant.find();

    const residentData = [...owners, ...tenants];

    const residentDetails = residentData.map((resident) => ({
      residentId: resident.id,
      paymentStatus: "Pending",
      residentCategory: resident.status,
      paymentMethod: "Cash",
    }));

    newMaintenance.residentDetails = residentDetails;
    await newMaintenance.save();

    const adminUsers = await User.find({}, "_id");
    const notificationsUsers = [
      ...adminUsers.map((admin) => ({ _id: admin._id, model: "User" })),
      ...owners.map((owner) => ({ _id: owner._id, model: "Owner" })),
      ...tenants.map((tenant) => ({ _id: tenant._id, model: "Tenant" })),
    ];

    const notification = new Notification({
      title: "🛠️ New Maintenance Added",
      name: "Annual Maintenance",
      message: `💰 Maintenance fee: ₹${feeAmount}. 📅 Due date: ${paymentDueDate}.`,
      users: notificationsUsers,
    });

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "🎉 Maintenance record added successfully!",
    });
  } catch (error) {
    console.error("Error adding maintenance:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};

// Get All Maintenance Records
exports.fetchAllMaintenanceRecords = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find().populate("residentDetails.residentId");

    return res.status(200).json({
      success: true,
      maintenanceData: maintenanceRecords,
      message: "📋 Maintenance records retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching maintenance records:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};

// Update Payment Mode
exports.updatePaymentMethod = async (req, res) => {
  const { maintenanceId } = req.params;
  const { paymentMethod } = req.body;
  const residentId = req.user.id;

  try {
    const maintenanceRecord = await Maintenance.findById(maintenanceId);
    if (!maintenanceRecord) {
      return res.status(404).json({
        success: false,
        message: "❌ Maintenance record not found.",
      });
    }

    const updatedRecord = await Maintenance.findOneAndUpdate(
      { _id: maintenanceId, "residentDetails.residentId": residentId },
      {
        $set: {
          "residentDetails.$.paymentMethod": paymentMethod,
          "residentDetails.$.paymentStatus": "Completed",
        },
      },
      { new: true }
    ).populate("residentDetails.residentId");

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "❌ Resident not found in this maintenance record.",
      });
    }

    return res.status(200).json({
      success: true,
      updatedMaintenance: updatedRecord,
      message: "✅ Payment method updated successfully!",
    });
  } catch (error) {
    console.error("Error updating payment method:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};

// Apply Penalty for Overdue Payments
exports.applyOverduePenalties = async (req, res) => {
  try {
    const today = new Date();
    const maintenanceRecords = await Maintenance.find();

    for (const maintenance of maintenanceRecords) {
      const { paymentDueDate, lateFeeAmount, residentDetails } = maintenance;
      const dueDatePassed = new Date(paymentDueDate) < today;

      if (dueDatePassed) {
        residentDetails.forEach(async (resident) => {
          if (resident.paymentStatus === "Pending") {
            resident.penaltyAmount += lateFeeAmount;
            await Maintenance.updateOne(
              { _id: maintenance._id, "residentDetails._id": resident._id },
              { $set: { "residentDetails.$.penaltyAmount": resident.penaltyAmount } }
            );
          }
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "📌 Penalties applied successfully for overdue payments!",
    });
  } catch (error) {
    console.error("Error applying penalties:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};

// Fetch Maintenance with Completed Payments
exports.fetchCompletedPayments = async (req, res) => {
  try {
    const completedPayments = await Maintenance.find({
      "residentDetails.paymentStatus": "Completed",
    }).populate("residentDetails.residentId");

    return res.status(200).json({
      success: true,
      maintenanceData: completedPayments,
      message: "✅ Completed payments retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching completed payments:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Internal Server Error. Please try again later.",
    });
  }
};


// Find Maintenance Records by Logged-In User ID
exports.fetchUserAndMaintenanceById = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    // Fetch maintenance records for the logged-in user
    const maintenanceRecords = await Maintenance.find({
      "residentList.resident": loggedInUserId, // Match logged-in user in residentList
    }).populate({
      path: "residentList.resident", // Populate resident details
      match: { _id: loggedInUserId }, // Ensure matching user details
      select: "name email role", // Only select necessary fields
    });

    if (!maintenanceRecords || maintenanceRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "❌ No maintenance records found for the logged-in user.",
      });
    }

    // Filter records to only include pending payments for the user
    const filteredRecords = maintenanceRecords
      .map((record) => {
        record.residentList = record.residentList.filter(
          (residentEntry) =>
            residentEntry.resident &&
            String(residentEntry.resident._id) === loggedInUserId &&
            residentEntry.paymentStatus === "pending"
        );
        return record;
      })
      .filter((record) => record.residentList.length > 0); // Exclude empty records

    if (filteredRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "⚠️ No pending maintenance records found for the logged-in user.",
      });
    }

    return res.status(200).json({
      success: true,
      maintenance: filteredRecords,
      message: "✅ Maintenance records with pending payments retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching maintenance records:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ An error occurred while fetching maintenance records. Please try again later.",
    });
  }
};
