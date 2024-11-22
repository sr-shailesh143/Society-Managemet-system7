import api from "./api";

// create Announcement
export const createSecurityProtocol = async (data) =>
  await api.post("http://localhost:8001/api/security-protocols/createSecurityProtocol", data);

// get  Announcement
export const getAllSecurityProtocols = async () =>
  await api.get("http://localhost:8001/api/security-protocols/getAllSecurityProtocols");

// get single Announcement by id
export const getSecurityProtocolById = async (_id) =>
  await api.get(`http://localhost:8001/api/security-protocols/getSecurityProtocolById/${_id}`);

// delete Announcement by id
export const deleteSecurityProtocol = async (_id) =>
  await api.delete(`http://localhost:8001/api/security-protocols/deleteSecurityProtocol/${_id}`);

//update Announcement by id
export const updateSecurityProtocol = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/security-protocols/updateSecurityProtocol/${_id}`, data);