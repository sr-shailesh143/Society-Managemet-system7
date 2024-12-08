import api from "./api";

// create new Note
export const createAlert = async (data) =>
  await api.post("alerts/createAlert", data);

// get all Note
export const getAllAlerts = async () => await api.get("alerts/getAllAlerts");

// get single Note by id
export const getAlertById = async (id) => await api.get(`alerts/getAlertById/${id}`);

// delete Note by id
export const deleteAlert = async (id) =>
  await api.delete(`alerts/deleteAlert/${id}`);

//update Note by id
export const updateAlert = async (id, data) =>
  await api.patch(`alerts/updateAlert/${id}`, data);