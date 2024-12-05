import api from "./api";

// create new Income
export const CreateIncome = async (data) =>
  await api.post("http://localhost:8001/api/income/createIncome", data);

// get all Income
export const GetIncomes = async () => await api.get("http://localhost:8001/api/income/getAllIncome");

// get single Income by id
export const GetIncome = async (_id) =>
  await api.get(`http://localhost:8001/api/income/getIncomeById/${_id}`);

// delete Income by id
export const DeleteIncome = async (_id) =>
  await api.delete(`http://localhost:8001/api/income/deleteIncome/${_id}`);

//update Income by id
export const UpdateIncome = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/income/updateIncome/${_id}`, data);