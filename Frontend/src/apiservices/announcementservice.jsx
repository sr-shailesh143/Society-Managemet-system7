import api from "./api";

// create Announcement
export const createAnnouncement = async (data) =>
  await api.post("announcements/createAnnouncement", data);

// get  Announcement
export const getAnnouncements = async () =>
  await api.get("announcements/getAllAnnouncements");

// get single Announcement by id
export const getAnnouncement = async (_id) =>
  await api.get(`announcements/getAnnouncementById/${_id}`);

// delete Announcement by id
export const deleteAnnouncement = async (_id) =>
  await api.delete(`announcements/deleteAnnouncement/${_id}`);

//update Announcement by id
export const updateAnnouncement = async (_id, data) =>
  await api.patch(`announcements/updateAnnouncement/${_id}`, data);