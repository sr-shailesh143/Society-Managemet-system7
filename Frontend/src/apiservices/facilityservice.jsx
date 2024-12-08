import api from "./api";

// create new Facility
export const createFacility = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/facilities/createFacility", data);

// get all Facilities
export const getAllFacilities = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/facilities/getAllFacilities");

// get single Facility by id
export const GetFacility = async (id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/facilities/facility/${id}`);

// delete Facility by id
export const deleteFacility = async (id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/facilities/deleteFacility/${id}`);

// update Facility by id
export const updateFacility = async (id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/facilities/updateFacility/${id}`, data);