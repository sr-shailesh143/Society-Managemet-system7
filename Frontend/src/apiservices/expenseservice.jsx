import api from "./api";

// create  Expense
export const addExpense = async (data) => {
  const response = await api.post("http://localhost:8001/api/clexpenses/addExpense", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get  Expense
export const getAllExpenses = async () =>
  await api.get("http://localhost:8001/api/clexpenses/getAllExpenses");

// get single Expense by id
export const getExpense = async (id) =>
  await api.get(`http://localhost:8001/api/clexpenses/expense/${id}`);

// delete Expense by id
export const deleteExpense = async (id) =>
  await api.delete(`http://localhost:8001/api/clexpenses/deleteExpense/${id}`);

//update Expense by id
export const updateExpense = async (id, data) => {
  const response = await api.patch(`http://localhost:8001/api/clexpenses/updateExpense/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};