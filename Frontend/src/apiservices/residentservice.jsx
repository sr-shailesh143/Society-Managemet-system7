import api from "./api";
// for owner

// create new Owner
export const CreateOwner = async (data) => {
  const response = await api.post("https://society-managemet-system7-87o7.onrender.com/api/Resident/addowner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify({ members: data }),
  });
  return response;
};

// get all Owner
export const GetOwners = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/Resident/viewowner");

// get single Owner by id
export const GetOwner = async (id) => await api.get(`https://society-managemet-system7-87o7.onrender.com/api/Resident/Owner/${id}`);

//update Owner by id
export const UpdateOwner = async (id, data) => {
  const response = await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/Resident/Owner/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

//update Tenant by id
export const UpdateTenant = async (id, data) => {
  const response = await api.put(`https://society-managemet-system7-87o7.onrender.com/api/Resident/tenante/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// for tenant

// create new Tenant
export const CreateTenant = async (data) => {
  const response = await api.post("https://society-managemet-system7-87o7.onrender.com/api/Resident/addtenante", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get all Tenant
export const GetTenants = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/Resident/viewtenante");

// get single Tenant by id
export const GetTenant = async (id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/Resident/tenante/${id}`);

// get all resident
export const GetResidents = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/Resident/allresident");

// get resident by id
export const GetResident = async (id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/Resident/resident/${id}`);

// delete resident by id
export const VacantResident = async (id) =>
  await api.put(`https://society-managemet-system7-87o7.onrender.com/api/Resident/update/${id}`, {});
