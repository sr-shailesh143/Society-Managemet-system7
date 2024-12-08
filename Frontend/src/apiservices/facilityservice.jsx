import api from "./api";

// create new Facility
export const createFacility = async (data) =>
  await api.post("facilities/createFacility", data);

// get all Facilities
export const getAllFacilities = async () =>
  await api.get("facilities/getAllFacilities");

// get single Facility by id
export const GetFacility = async (id) =>
  await api.get(`facilities/facility/${id}`);

// delete Facility by id
export const deleteFacility = async (id) =>
  await api.delete(`facilities/deleteFacility/${id}`);

// update Facility by id
export const updateFacility = async (id, data) =>
  await api.patch(`facilities/updateFacility/${id}`, data);