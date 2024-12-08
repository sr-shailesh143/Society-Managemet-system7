import api from "./api";

// create new Income
export const CreateIncome = async (data) =>
  await api.post("income/createIncome", data);

// get all Income
export const GetIncomes = async () => await api.get("income/getAllIncome");

// get single Income by id
export const GetIncome = async (_id) =>
  await api.get(`income/getIncomeById/${_id}`);

// delete Income by id
export const DeleteIncome = async (_id) =>
  await api.delete(`income/deleteIncome/${_id}`);

//update Income by id
export const UpdateIncome = async (_id, data) =>
  await api.patch(`income/updateIncome/${_id}`, data);