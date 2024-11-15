import api from "./api";

// create new SecurityGuard
export const CreateSecurityGuard = async (data) => {
  const response = await api.post("/addSecurity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// get all SecurityGuard
export const GetallSecurityGuards = async () =>
  await api.get("/getAllSecurity");

// get single SecurityGuard by id
export const GetSecurityGuard = async (id) =>
  await api.get(`/security/${id}`);

// delete SecurityGuard by id
export const DeleteSecurityGuard = async (id) =>
  await api.delete(`/deleteSecurity/${id}`);

//update SecurityGuard by id
export const UpdateSecurityGuard = async (id, data) => {
  const response = await api.patch(`/updateSecurity/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};