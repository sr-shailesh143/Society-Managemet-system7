const { Schema, default: mongoose, model } = require("mongoose");
const Owner = require("../models/OwnerModel");
const Tenant = require("../models/Tenantmodel");
const User = require("../models/usermodel");

const notificationSchema = new Schema(
  {
    notificationTitle: {
      type: String,
      required: true,
    },
    notificationType: {
      type: String,
      required: true,
    },
    notificationMessage: {
      type: String,
      required: true,
    },
    notificationDate: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
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
    timestamps: true, 
  }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
