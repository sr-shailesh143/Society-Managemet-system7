import api from "./api";

// create new Note
export const createAlert = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/alerts/createAlert", data);

// get all Note
export const getAllAlerts = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/alerts/getAllAlerts");

// get single Note by id
export const getAlertById = async (id) => await api.get(`https://society-managemet-system7-87o7.onrender.com/api/alerts/getAlertById/${id}`);

// delete Note by id
export const deleteAlert = async (id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/alerts/deleteAlert/${id}`);

//update Note by id
export const updateAlert = async (id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/alerts/updateAlert/${id}`, data);