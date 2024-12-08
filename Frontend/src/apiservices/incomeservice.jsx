import api from "./api";

// create new Income
export const CreateIncome = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/income/createIncome", data);

// get all Income
export const GetIncomes = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/income/getAllIncome");

// get single Income by id
export const GetIncome = async (_id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/income/getIncomeById/${_id}`);

// delete Income by id
export const DeleteIncome = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/income/deleteIncome/${_id}`);

//update Income by id
export const UpdateIncome = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/income/updateIncome/${_id}`, data);