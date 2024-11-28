import api from "./api";


export const createProfile = async (data) =>
  await api.post("http://localhost:8001/api/profile/createProfile", data);

export const getProfiles = async () =>
  await api.get("http://localhost:8001/api/profile/getProfiles");

export const updateProfile = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/profile/updateProfile/${_id}`, data);