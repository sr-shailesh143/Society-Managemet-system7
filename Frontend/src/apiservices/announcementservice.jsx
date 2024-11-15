import api from "./api";

// create Announcement
export const createAnnouncement = async (data) =>
  await api.post("http://localhost:8001/api/createAnnouncement", data);

// get  Announcement
export const getAnnouncements = async () =>
  await api.get("http://localhost:8001/api/announcements/getAllAnnouncements");

// get single Announcement by id
export const getAnnouncement = async (id) =>
  await api.get(`http://localhost:8001/api/announcement/${id}`);

// delete Announcement by id
export const deleteAnnouncement = async (id) =>
  await api.delete(`http://localhost:8001/api/delete/announcement/${id}`);

//update Announcement by id
export const updateAnnouncement = async (id, data) =>
  await api.patch(`http://localhost:8001/api/update/announcement/${id}`, data);