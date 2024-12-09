import api from "./api";

// create new Request
export const createRequest = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/request/createRequest", data);

// get all Request
export const getAllRequests = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/request/getAllRequests");

// get single Request by id
export const GetRequest = async (_id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/request/getRequestById/${_id}`);


// delete Request by id
export const deleteRequest = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/request/deleteRequest/${_id}`);

//update Request by id
export const updateRequest = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/request/updateRequest/${_id}`, data);