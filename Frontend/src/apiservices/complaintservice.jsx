import api from "./api";

// create new complaint
export const createComplaint = async (data) =>
  await api.post("http://localhost:8001/api/createComplaint", data);

// get all complaint
export const getAllComplaints = async () =>
  await api.get("http://localhost:8001/api/getAllComplaints");

// get single complaint by id
export const GetComplaint = async (id) =>
  await api.get(`http://localhost:8001/api/complaints/${id}`);

// delete complaint by id
export const deleteComplaint = async (id) =>
  await api.delete(`http://localhost:8001/api/deleteComplaint/${id}`);

//update complaint by id
export const updateComplaint = async (id, data) =>
  await api.patch(`http://localhost:8001/api/updateComplaint/${id}`, data);