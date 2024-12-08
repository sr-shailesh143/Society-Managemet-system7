import api from "./api";

// create new Request
export const createRequest = async (data) =>
  await api.post("request/createRequest", data);

// get all Request
export const getAllRequests = async () =>
  await api.get("request/getAllRequests");

// get single Request by id
export const GetRequest = async (_id) =>
  await api.get(`request/getRequestById/${_id}`);


// delete Request by id
export const deleteRequest = async (_id) =>
  await api.delete(`request/deleteRequest/${_id}`);

//update Request by id
export const updateRequest = async (_id, data) =>
  await api.patch(`request/updateRequest/${_id}`, data);