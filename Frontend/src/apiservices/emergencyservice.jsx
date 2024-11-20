import api from "./api";

// create new Note
export const createAlert = async (data) =>
  await api.post("http://localhost:8001/api/alerts/createAlert", data);

// get all Note
export const getAllAlerts = async () => await api.get("http://localhost:8001/api/alerts/getAllAlerts");

// get single Note by id
export const getAlertById = async (id) => await api.get(`http://localhost:8001/api/alerts/getAlertById/${id}`);

// delete Note by id
export const deleteAlert = async (id) =>
  await api.delete(`http://localhost:8001/api/alerts/deleteAlert/${id}`);

//update Note by id
export const updateAlert = async (id, data) =>
  await api.patch(`http://localhost:8001/api/alerts/updateAlert/${id}`, data);