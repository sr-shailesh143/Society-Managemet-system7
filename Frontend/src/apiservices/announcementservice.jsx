import api from "./api";

// create Announcement
export const createAnnouncement = async (data) =>
  await api.post("https://society-managemet-system7-87o7.onrender.com/api/announcements/createAnnouncement", data);

// get  Announcement
export const getAnnouncements = async () =>
  await api.get("https://society-managemet-system7-87o7.onrender.com/api/announcements/getAllAnnouncements");

// get single Announcement by id
export const getAnnouncement = async (_id) =>
  await api.get(`https://society-managemet-system7-87o7.onrender.com/api/announcements/getAnnouncementById/${_id}`);

// delete Announcement by id
export const deleteAnnouncement = async (_id) =>
  await api.delete(`https://society-managemet-system7-87o7.onrender.com/api/announcements/deleteAnnouncement/${_id}`);

//update Announcement by id
export const updateAnnouncement = async (_id, data) =>
  await api.patch(`https://society-managemet-system7-87o7.onrender.com/api/announcements/updateAnnouncement/${_id}`, data);