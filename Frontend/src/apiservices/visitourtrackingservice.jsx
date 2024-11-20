import api from "./api";

// create new complaint
export const createVisitor = async (data) =>
  await api.post("http://localhost:8001/api/visitors-tracking/createVisitor", data);

// get all complaint
export const getAllVisitors = async () =>
  await api.get("http://localhost:8001/api/visitors-tracking/getAllVisitors");

// get single complaint by id
export const getVisitorById = async (id) =>
  await api.get(`http://localhost:8001/api/visitors-tracking/getVisitorById/${id}`);

// delete complaint by id
export const deleteVisitor = async (_id) =>
  await api.delete(`http://localhost:8001/api/visitors-tracking/deleteVisitor/${_id}`);

//update complaint by id
export const updateVisitor = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/visitors-tracking/updateVisitor/${_id}`, data);