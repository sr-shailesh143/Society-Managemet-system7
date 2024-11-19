import api from "./api";

// create new Income
export const CreateIncome = async (data) =>
  await api.post("http://localhost:8001/api/income/createIncome", data);

// get all Income
export const GetIncomes = async () => await api.get("http://localhost:8001/api/income/getAllIncome");

// get single Income by id
export const GetIncome = async (id) =>
  await api.get(`http://localhost:8001/api/income/getIncomeById/${id}`);

// delete Income by id
export const DeleteIncome = async (id) =>
  await api.delete(`http://localhost:8001/api/income/deleteIncome/${id}`);

//update Income by id
export const UpdateIncome = async (id, data) =>
  await api.patch(`http://localhost:8001/api/income/updateIncome/${id}`, data);