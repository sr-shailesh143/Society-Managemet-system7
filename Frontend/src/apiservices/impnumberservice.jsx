import api from "./api";

// Add imp number
export const createnumber = async (data) =>
  await api.post("http://localhost:8001/api/number/createnumber", data);

// get all imp numbers
export const viewnumber = async () => await api.get("http://localhost:8001/api/number/viewnumber");

// get imp number by id
export const getimpNumber = async (_id) => await api.get(`http://localhost:8001/api/number/GetByIdnumber/${_id}`);

// update imp number by id
export const updatenumber = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/number/UpdateNumber/${_id}`, data);

// delete imp number by id
export const deletenumber = async (_id) =>
  await api.delete(`http://localhost:8001/api/number/DeleteNumber/${_id}`);