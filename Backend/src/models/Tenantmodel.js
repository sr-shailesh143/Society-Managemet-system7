const { Schema, model } = require("mongoose");

// Define the Tenant schema
const TenantSchema = new Schema(
  {
    tenantImage: {
      type: String,
      required: true,
    },
    ownerFullName: {
      type: String,
      required: true,
    },
    ownerPhoneNumber: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    wing: {
      type: String,
      required: true,
    },
    unit: {
      type: Number,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    aadharFront: {
      type: String,
      required: true,
    },
    aadharBack: {
      type: String,
      required: true,
    },
    addressProof: {
      type: String,
      required: true,
    },
    rentAgreement: {
      type: String,
      required: true,
    },
    familyMembers: [
      {
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        emailAddress: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        relation: { type: String, required: true },
      },
    ],
    vehicles: [
      {
        vehicleType: { type: String, required: true },
        vehicleName: { type: String, required: true },
        vehicleNumber: { type: String, required: true },
      },
    ],
    role: {
      type: String,
      enum: ["admin", "resident", "security"],
      default: "resident",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Tenant model
const Tenant = model("Tenant", TenantSchema);
module.exports = Tenant;