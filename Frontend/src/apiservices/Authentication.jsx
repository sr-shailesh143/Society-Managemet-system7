import api from "./api";

// Create society
export const createSociety = async (data) =>
  await api.post("society/createSociety", data);

// Get all societies
export const viewSociety = async () =>
  await api.get("society/viewSociety");

// Register
export const signup = async (data) => 
  await api.post("auth/signup", data);

// Login
export const login = async (data) => await api.post("auth/login", data);

// Logout
export const logout = async () => await api.post("auth/logout");

// Send otp
export const GetOtp = async (data) => await api.post("auth/GetOtp", data);

// Verify otp
export const Otpverification = async (data) =>
  await api.post("auth/Otpverification", data);

// Reset password
export const resetpass = async (data) =>
  await api.post("auth/resetpass", data);

// Update user profile
export const UpdateUserProfile = async (userId, data) =>
  await api.patch(`auth/${userId}`, data);

// View user profile
export const ViewUserProfile = async (userId) =>
  await api.get(`auth/${userId}`);