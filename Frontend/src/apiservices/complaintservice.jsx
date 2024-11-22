import api from "./api";

// create new complaint
export const createComplaint = async (data) =>
  await api.post("http://localhost:8001/api/complaint/createComplaint", data);

// get all complaint
export const getAllComplaints = async () =>
  await api.get("http://localhost:8001/api/complaint/getAllComplaints");

// get single complaint by id
export const GetComplaint = async (_id) =>
  await api.get(`http://localhost:8001/api/complaint/complaints/${_id}`);

// delete complaint by id
export const deleteComplaint = async (_id) =>
  await api.delete(`http://localhost:8001/api/complaint/deleteComplaint/${_id}`);

//update complaint by id
export const updateComplaint = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/complaint/updateComplaint/${_id}`, data);