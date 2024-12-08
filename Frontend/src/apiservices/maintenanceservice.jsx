import api from "./api";

// create new Maintenance
export const verifyMaintenancePassword = async (data) =>
  await api.post("maintenance/verifyMaintenancePassword", data);

// create new Maintenance
export const addMaintenanceRecord = async (data) =>
  await api.post("maintenance/addMaintenanceRecord", data);

// get all Maintenance
export const fetchAllMaintenanceRecords = async () =>
  await api.get("maintenance/fetchAllMaintenanceRecords");

// get all Maintenance
export const fetchUserAndMaintenanceById = async () =>
  await api.get("maintenance/fetchUserAndMaintenanceById");

// Update Maintenance status by id
export const updatePaymentMethod = async (_id, data) =>
  await api.put(`maintenance/maintenance/${_id}/resident/updatePaymentMethod`, data);

// get paid Maintenance list
export const fetchCompletedPayments = async () =>
  await api.get("maintenance/fetchCompletedPayments");