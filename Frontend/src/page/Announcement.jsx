import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-hot-toast";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../apiservices/announcementservice";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      setAnnouncements(response.data.records || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleShowModal = (type, announcement = {}) => {
    setModalType(type);
    setCurrentAnnouncement(announcement);
    if (type === "view") {
      setViewModal(true);
    } else {
      setShowModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    setFacilityData({ facilityName: '', scheduleServiceDate: '', description: '', remindBefore: '4-day' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewModal(false);
    setDeleteModal(false);
    setCurrentAnnouncement({});
  };

  const handleDelete = async () => {
    try {
      await deleteAnnouncement(currentAnnouncement._id);
      toast.success("Announcement deleted successfully!");
      fetchAnnouncements();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "Invalid Time"; 
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "create") {
        await createAnnouncement(currentAnnouncement);
        toast.success("Announcement created successfully!");
      } else {
        await updateAnnouncement(currentAnnouncement._id, currentAnnouncement);
        toast.success("Announcement updated successfully!");
      }
      fetchAnnouncements();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  return (
    <div className="container-fluid p-4  bg-white" style={{ minHeight: "100vh",borderRadius:"10px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Announcements</h2>
        <Button
          onClick={() => handleShowModal("create")}
          style={{
            background: "linear-gradient(90deg, #fe512e 0%, #f09619 100%)",
            border: "none",
          }}
          className="text-white fw-bold"
        >
          Create Announcement
        </Button>
      </div>

      <div className="row">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between bg-primary text-white">
                  <span>{announcement.title}</span>
                  <Dropdown>
                    <Dropdown.Toggle as="div" bsPrefix="p-0">
                      <BsThreeDotsVertical className="text-white" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShowModal("edit", announcement)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShowModal("view", announcement)}>View</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentAnnouncement(announcement);
                          setDeleteModal(true);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body className="justify-content-between">
                  <p><strong style={{color:"grey"}}> Announcement Date:</strong> <span className="justify-content-between"style={{marginLeft:"150px"}}>{new Date(announcement.announcementDate).toLocaleDateString()}</span></p>
                  <p><strong style={{color:"grey"}}> Announcement Time:</strong><span style={{marginLeft:"150px"}}> {formatTime(announcement.announcementTime)}</span></p>
                  <p><strong style={{color:"grey"}}>description</strong></p>
                  <p className="text-truncate">{announcement.description}</p>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "create" ? "Create Announcement" : "Edit Announcement"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentAnnouncement.title || ""}
                onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentAnnouncement.description || ""}
                onChange={(e) =>
                  setCurrentAnnouncement({ ...currentAnnouncement, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentAnnouncement.announcementDate || ""}
                onChange={(e) =>
                  setCurrentAnnouncement({ ...currentAnnouncement, announcementDate: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={currentAnnouncement.announcementTime || ""}
                onChange={(e) =>
                  setCurrentAnnouncement({ ...currentAnnouncement, announcementTime: e.target.value })
                }
                required 
              />
            </Form.Group>
            <Modal.Footer>
            <Button onClick={handleModalClose} style={{width:"47%",alignItems:"center",justifyContent:"center",background:"lightgrey",border:"none",color:"white"}} className="mt-3 p-3">
              Cancel
            </Button>
            <Button type="submit"style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
            border: "none",
            color: "white",
            width:"47%",alignItems:"center",justifyContent:"center"}} className="mt-3 p-3">
              Save
            </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={viewModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Title:</strong> {currentAnnouncement.title}</p>
          <p><strong>Description:</strong> {currentAnnouncement.description}</p>
          <p><strong>Date:</strong> {new Date(currentAnnouncement.announcementDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {formatTime(currentAnnouncement.announcementTime)}</p>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this announcement?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}className="p-3">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}className="p-3">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Announcement;
