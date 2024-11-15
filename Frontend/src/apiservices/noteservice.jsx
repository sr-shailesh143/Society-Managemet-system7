import api from "./api";

// create new Note
export const addNote = async (data) =>
  await api.post("http://localhost:8001/api/notes/addNote", data);

// get all Note
export const getAllNotes = async () => await api.get("http://localhost:8001/api/notes/getAllNotes");

// get single Note by id
export const GetNote = async (id) => await api.get(`http://localhost:8001/api/notes/note/${id}`);

// delete Note by id
export const deleteNote = async (id) =>
  await api.delete(`http://localhost:8001/api/notes/deleteNote/${id}`);

//update Note by id
export const updateNote = async (id, data) =>
  await api.patch(`http://localhost:8001/api/notes/updateNote/${id}`, data);