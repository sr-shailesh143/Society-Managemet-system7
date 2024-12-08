import api from "./api";

// create new complaint
export const createComplaint = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/complaint/createComplaint", data);

// get all complaint
export const getAllComplaints = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/complaint/getAllComplaints");

// get single complaint by id
export const GetComplaint = async (_id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/complaint/complaints/${_id}`);

// delete complaint by id
export const deleteComplaint = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/complaint/deleteComplaint/${_id}`);

//update complaint by id
export const updateComplaint = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/complaint/updateComplaint/${_id}`, data);