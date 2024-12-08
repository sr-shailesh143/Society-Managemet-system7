import api from "./api";

// create new complaint
export const createComplaint = async (data) =>
  await api.post("complaint/createComplaint", data);

// get all complaint
export const getAllComplaints = async () =>
  await api.get("complaint/getAllComplaints");

// get single complaint by id
export const GetComplaint = async (_id) =>
  await api.get(`complaint/complaints/${_id}`);

// delete complaint by id
export const deleteComplaint = async (_id) =>
  await api.delete(`complaint/deleteComplaint/${_id}`);

//update complaint by id
export const updateComplaint = async (_id, data) =>
  await api.patch(`complaint/updateComplaint/${_id}`, data);