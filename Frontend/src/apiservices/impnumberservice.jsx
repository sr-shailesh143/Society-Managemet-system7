import api from "./api";

// Add imp number
export const createnumber = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/number/createnumber", data);

// get all imp numbers
export const viewnumber = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/number/viewnumber");

// get imp number by id
export const getimpNumber = async (_id) => await api.get(`https://society-managemet-system7-87o7.onrender.com/api/number/GetByIdnumber/${_id}`);

// update imp number by id
export const updatenumber = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/number/UpdateNumber/${_id}`, data);

// delete imp number by id
export const deletenumber = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/number/DeleteNumber/${_id}`);