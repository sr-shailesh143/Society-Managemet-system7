import api from "./api";


export const createProfile = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/profile/createProfile", data);

export const getProfiles = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/profile/getProfiles");

export const updateProfile = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/profile/updateProfile/${_id}`, data);