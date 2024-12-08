import api from "./api";

// create new Note
export const addNote = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/notes/addNote", data);

// get all Note
export const getAllNotes = async () => await api.get("https://society-managemet-system7-87o7.onrender.com/api/notes/getAllNotes");

// get single Note by id
export const GetNote = async (id) => await api.get(`https://society-managemet-system7-87o7.onrender.com/api/notes/note/${id}`);

// delete Note by id
export const deleteNote = async (id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/notes/deleteNote/${id}`);

//update Note by id
export const updateNote = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/notes/updateNote/${_id}`, data);