import api from "./api";

// create new Maintenance
export const verifyMaintenancePassword = async (data) =>
  await api.post("http://localhost:8001/api/maintenance/verifyMaintenancePassword", data);

// create new Maintenance
export const addMaintenanceRecord = async (data) =>
  await api.post("http://localhost:8001/api/maintenance/addMaintenanceRecord", data);

// get all Maintenance
export const fetchAllMaintenanceRecords = async () =>
  await api.get("http://localhost:8001/api/maintenance/fetchAllMaintenanceRecords");

// get all Maintenance
export const fetchUserAndMaintenanceById = async () =>
  await api.get("http://localhost:8001/api/maintenance/fetchUserAndMaintenanceById");

// Update Maintenance status by id
export const updatePaymentMethod = async (_id, data) =>
  await api.put(`http://localhost:8001/api/maintenance/maintenance/${_id}/resident/updatePaymentMethod`, data);

// get paid Maintenance list
export const fetchCompletedPayments = async () =>
  await api.get("http://localhost:8001/api/maintenance/fetchCompletedPayments");