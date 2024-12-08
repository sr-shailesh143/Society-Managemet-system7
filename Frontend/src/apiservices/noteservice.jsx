import api from "./api";

// create new Note
export const addNote = async (data) =>
  await api.post("notes/addNote", data);

// get all Note
export const getAllNotes = async () => await api.get("notes/getAllNotes");

// get single Note by id
export const GetNote = async (id) => await api.get(`notes/note/${id}`);

// delete Note by id
export const deleteNote = async (id) =>
  await api.delete(`notes/deleteNote/${id}`);

//update Note by id
export const updateNote = async (_id, data) =>
  await api.patch(`notes/updateNote/${_id}`, data);