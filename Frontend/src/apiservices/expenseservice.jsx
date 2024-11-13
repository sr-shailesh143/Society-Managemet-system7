import api from "./api";

// create  Expense
export const createExpense = async (data) => {
  const response = await api.post("http://localhost:8001/api/create/expense", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get  Expense
export const getExpenses = async () =>
  await api.get("http://localhost:8001/api/get/expense");

// get single Expense by id
export const getExpense = async (id) =>
  await api.get(`http://localhost:8001/api/expense/${id}`);

// delete Expense by id
export const deleteExpense = async (id) =>
  await api.delete(`http://localhost:8001/api/delete/expense/${id}`);

//update Expense by id
export const updateExpense = async (id, data) => {
  const response = await api.patch(`http://localhost:8001/api/update/expense/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};