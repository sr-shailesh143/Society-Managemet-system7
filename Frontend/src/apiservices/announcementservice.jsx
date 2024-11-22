import api from "./api";

// create Announcement
export const createAnnouncement = async (data) =>
  await api.post("http://localhost:8001/api/announcements/createAnnouncement", data);

// get  Announcement
export const getAnnouncements = async () =>
  await api.get("http://localhost:8001/api/announcements/getAllAnnouncements");

// get single Announcement by id
export const getAnnouncement = async (_id) =>
  await api.get(`http://localhost:8001/api/announcements/getAnnouncementById/${_id}`);

// delete Announcement by id
export const deleteAnnouncement = async (_id) =>
  await api.delete(`http://localhost:8001/api/announcements/deleteAnnouncement/${_id}`);

//update Announcement by id
export const updateAnnouncement = async (_id, data) =>
  await api.patch(`http://localhost:8001/api/announcements/updateAnnouncement/${_id}`, data);