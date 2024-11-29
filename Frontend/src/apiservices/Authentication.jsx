import api from "./api";

// Create society
export const createSociety = async (data) =>
  await api.post("http://localhost:8001/api/society/createSociety", data);

// Get all societies
export const viewSociety = async () =>
  await api.get("http://localhost:8001/api/society/viewSociety");

// Register
export const signup = async (data) => 
  await api.post("http://localhost:8001/api/auth/signup", data);

// Login
export const login = async (data) => await api.post("http://localhost:8001/api/auth/login", data);

// Logout
export const logout = async () => await api.post("http://localhost:8001/api/auth/logout");

// Send otp
export const GetOtp = async (data) => await api.post("http://localhost:8001/api/auth/GetOtp", data);

// Verify otp
export const Otpverification = async (data) =>
  await api.post("http://localhost:8001/api/auth/Otpverification", data);

// Reset password
export const resetpass = async (data) =>
  await api.post("http://localhost:8001/api/auth/resetpass", data);

// Update user profile
export const UpdateUserProfile = async (userId, data) =>
  await api.patch(`http://localhost:8001/api/auth/${userId}`, data);

// View user profile
export const ViewUserProfile = async (userId) =>
  await api.get(`http://localhost:8001/api/auth/${userId}`);