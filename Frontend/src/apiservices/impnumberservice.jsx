import api from "./api";

// Add imp number
export const createnumber = async (data) =>
  await api.post("http://localhost:8001/api/createnumber", data);

// get all imp numbers
export const viewnumber = async () => await api.get("http://localhost:8001/api/viewnumber");

// get imp number by id
export const getimpNumber = async (id) => await api.get(`http://localhost:8001/api/number/${id}`);

// update imp number by id
export const updatenumber = async (id, data) =>
  await api.patch(`http://localhost:8001/api/number/${id}`, data);

// delete imp number by id
export const deletenumber = async (id) =>
  await api.delete(`http://localhost:8001/api/number/${id}`);