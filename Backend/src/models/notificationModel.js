const { Schema, default: mongoose, model } = require("mongoose");

// Import related models
const Owner = require("../models/OwnerModel");
const Tenant = require("../models/Tenantmodel");
const User = require("../models/usermodel");

// Define Notification Schema
const notificationSchema = new Schema(
  {
    // Notification Title
    notificationTitle: {
      type: String,
      required: true,
    },
    // Notification Type or Name
    notificationType: {
      type: String,
      required: true,
    },
    // Notification Message Content
    notificationMessage: {
      type: String,
      required: true,
    },
    // Date of Notification
    notificationDate: {
      type: Date,
      default: Date.now,
    },
    // Read Status
    isRead: {
      type: Boolean,
      default: false,
    },
    // List of Users associated with the Notification
    associatedUsers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, refPath: "associatedUsers.userModel" },
        userModel: {
          type: String,
          enum: ["Owner", "Tenant", "User"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt timestamps
  }
);

// Create Notification Model
const Notification = model("Notification", notificationSchema);

// Export Notification Model
module.exports = Notification;
