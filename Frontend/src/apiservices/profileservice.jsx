import api from "./api";


export const createProfile = async (data) =>
  await api.post("profile/createProfile", data);

export const getProfiles = async () =>
  await api.get("profile/getProfiles");

export const updateProfile = async (_id, data) =>
  await api.patch(`profile/updateProfile/${_id}`, data);