import api from "./api";

// create new SecurityGuard
export const CreateSecurityGuard = async (data) => {
  const response = await api.post("security/addSecurity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// get all SecurityGuard
export const GetallSecurityGuards = async () =>
  await api.get("security/getAllSecurity");

// get single SecurityGuard by id
export const GetSecurityGuard = async (_id) =>
  await api.get(`security/getSecurityById/${_id}`);

// delete SecurityGuard by id
export const DeleteSecurityGuard = async (_id) =>
  await api.delete(`security/deleteSecurity/${_id}`);

//update SecurityGuard by id
export const UpdateSecurityGuard = async (_id, data) => {
  const response = await api.patch(`security/updateSecurity/${_id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};