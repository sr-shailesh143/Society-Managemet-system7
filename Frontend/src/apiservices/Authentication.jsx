import api from "./api";

// Create society
export const createSociety = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/society/createSociety", data);

// Get all societies
export const viewSociety = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/society/viewSociety");

// Register
export const signup = async (data) => 
  await api.post("http://localhost:8001/api/auth/signup", data);

// Login
export const login = async (data) => await api.post("/auth/login", data);

// Logout
export const logout = async () => await api.post("https://society-managemet-system7-87o7.onrender.com/api/auth/logout");

// Send otp
export const GetOtp = async (data) => await api.post("https://society-managemet-system7-87o7.onrender.com/api/auth/GetOtp", data);

// Verify otp
export const Otpverification = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/auth/Otpverification", data);

// Reset password
export const resetpass = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/auth/resetpass", data);

// Update user profile
export const UpdateUserProfile = async (userId, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/auth/${userId}`, data);

// View user profile
export const ViewUserProfile = async (userId) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/auth/${userId}`);
