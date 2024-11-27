import api from "./api";

// create new Request
export const createRequest = async (data) =>
  await api.post("http://localhost:8001/api/request/createRequest", data);

// get all Request
export const getAllRequests = async () =>
  await api.get("http://localhost:8001/api/request/getAllRequests");

// get single Request by id
export const GetRequest = async (_id) =>
  await api.get(`http://localhost:8001/api/request/getRequestById/${_id}`);

// delete Request by id
export const deleteRequest = async (_id) =>
  await api.delete(`http://localhost:8001/api/request/deleteRequest/${_id}`);

//update Request by id
export const updateRequest = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/request/updateRequest/${_id}`, data);