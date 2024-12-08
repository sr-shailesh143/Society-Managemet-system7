import api from "./api";

// create new complaint
export const createVisitor = async (data) =>
  await api.post("visitors-tracking/createVisitor", data);

// get all complaint
export const getAllVisitors = async () =>
  await api.get("visitors-tracking/getAllVisitors");

// get single complaint by id
export const getVisitorById = async (id) =>
  await api.get(`visitors-tracking/getVisitorById/${id}`);

// delete complaint by id
export const deleteVisitor = async (_id) =>
  await api.delete(`visitors-tracking/deleteVisitor/${_id}`);

//update complaint by id
export const updateVisitor = async (_id, data) =>
  await api.patch(`visitors-tracking/updateVisitor/${_id}`, data);