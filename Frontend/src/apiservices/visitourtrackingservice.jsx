import api from "./api";

// create new complaint
export const createVisitor = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/visitors-tracking/createVisitor", data);

// get all complaint
export const getAllVisitors = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/visitors-tracking/getAllVisitors");

// get single complaint by id
export const getVisitorById = async (id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/visitors-tracking/getVisitorById/${id}`);

// delete complaint by id
export const deleteVisitor = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/visitors-tracking/deleteVisitor/${_id}`);

//update complaint by id
export const updateVisitor = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/visitors-tracking/updateVisitor/${_id}`, data);