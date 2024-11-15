import api from "./api";

// create new Request
export const createRequest = async (data) =>
  await api.post("/createRequest", data);

// get all Request
export const getAllRequests = async () =>
  await api.get("/getAllRequests");

// get single Request by id
export const GetRequest = async (id) =>
  await api.get(`/requests/${id}`);

// delete Request by id
export const deleteRequest = async (id) =>
  await api.delete(`/deleteRequest/${id}`);

//update Request by id
export const updateRequest = async (id, data) =>
  await api.patch(`/updateRequest/${id}`, data);