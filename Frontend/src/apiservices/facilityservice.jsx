import api from "./api";

// create new Facility
export const createFacility = async (data) =>
  await api.post("http://localhost:8001/api/facilities/createFacility", data);

// get all Facilities
export const getAllFacilities = async () =>
  await api.get("http://localhost:8001/api/facilities/getAllFacilities");

// get single Facility by id
export const GetFacility = async (id) =>
  await api.get(`http://localhost:8001/api/facilities/facility/${id}`);

// delete Facility by id
export const deleteFacility = async (id) =>
  await api.delete(`http://localhost:8001/api/facilities/deleteFacility/${id}`);

// update Facility by id
export const updateFacility = async (id, data) =>
  await api.patch(`http://localhost:8001/api/facilities/updateFacility/${id}`, data);