const { Schema, model, default: mongoose } = require("mongoose");

// Define the schema for Maintenance Fees
const maintenanceFeeSchema = new Schema(
  {
    // Monthly maintenance charge
    feeAmount: {
      type: Number,
      required: true,
    },
    // Late payment penalty charge
    lateFeeAmount: {
      type: Number,
      required: true,
    },
    // Payment deadline
    paymentDueDate: {
      type: Date,
      required: true,
    },
    // Penalty starts after this date
    penaltyStartDate: {
      type: Date,
      required: true,
    },
    // List of residents associated with this maintenance fee
    residentDetails: [
      {
        residentReferenceId: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: "residentDetails.residentType", // Reference type based on residentType
          required: true,
        },
        residentCategory: {
          type: String,
          enum: ["Owner", "Tenant"], // Ensures valid resident type
          required: true,
        },
        paymentState: {
          type: String,
          enum: ["Pending", "Paid"], // Clearer naming for payment status
          default: "Pending",
        },
        paymentMethod: {
          type: String,
          enum: ["Online", "Cash"], // Clearer naming for payment mode
          default: "Cash",
        },
        lateFeeApplied: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true } // Automatically include createdAt and updatedAt timestamps
);

// Create the Maintenance Fee model
const MaintenanceFee = model("MaintenanceFee", maintenanceFeeSchema);

module.exports = MaintenanceFee;
