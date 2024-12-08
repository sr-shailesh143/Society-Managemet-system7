import api from "./api";

// create new SecurityGuard
export const CreateSecurityGuard = async (data) => {
  const response = await api.post("https://society-managemet-system7-87o7.onrender.com/api/security/addSecurity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// get all SecurityGuard
export const GetallSecurityGuards = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/security/getAllSecurity");

// get single SecurityGuard by id
export const GetSecurityGuard = async (_id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/security/getSecurityById/${_id}`);

// delete SecurityGuard by id
export const DeleteSecurityGuard = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/security/deleteSecurity/${_id}`);

//update SecurityGuard by id
export const UpdateSecurityGuard = async (_id, data) => {
  const response = await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/security/updateSecurity/${_id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};