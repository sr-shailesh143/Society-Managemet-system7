import React, { useState } from 'react';
import { Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";

const initialAnnouncements = [
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },
  {
    date: "01/02/2024",
    time: "10:15 AM",
    title: "Community Initiatives",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in...",
  },

];

const Announcement = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    description: "",
    date: "",
    time: ""
  });
  const [viewModal, setViewModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setAnnouncementForm({ title: "", description: "", date: "", time: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedAnnouncements = [...announcements];
      updatedAnnouncements[editIndex] = announcementForm;
      setAnnouncements(updatedAnnouncements);
    } else {
      setAnnouncements([...announcements, announcementForm]);
    }
    handleCloseModal();
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setAnnouncementForm(announcements[index]);
    handleShowModal();
  };

  const handleViewClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setViewModal(true);
  };

  const handleDeleteClick = (announcement) => {
    setAnnouncementToDelete(announcement);
    setDeleteModal(true);
  };

  const confirmDelete = () => {

    setAnnouncements(announcements.filter((a) => a !== announcementToDelete));
    setDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
  };
  const isFormValid =
    announcementForm.title.trim() !== '' &&
    announcementForm.description.trim() !== '' &&
    announcementForm.date.trim() !== '' &&
    announcementForm.time.trim() !== '';
  return (

    <div className="container-fluid p-4" style={{ minHeight: '100vh', }}>
      <div className="container-fluid d-flex flex-column   p-0" style={{ width: "100%" }}>

        <div className="container-fluid p-4" style={{ minHeight: '100vh' }}>
          <div className="container-fluid d-flex flex-column bg-light shadow p-0">


            <div className="d-flex justify-content-between align-items-center mb-3 p-3">

              <h2>Announcement</h2>
              <Button
                style={{
                  background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                  border: "none"
                }}
                className="text-white fw-bold"
                onClick={() => {
                  setIsEditing(false);
                  handleShowModal();
                }}
              >
                Create Announcement
              </Button>
            </div>

            <div className="row flex-grow-1 p-3">
              {announcements.map((announcement, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                  <Card className="shadow-sm announcement-card" style={{ width: '370px', height: 'auto' }}>
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                      <span className="text-truncate" style={{ maxWidth: '85%' }}>{announcement.title}</span>
                      <Dropdown>
                        <Dropdown.Toggle as="div" bsPrefix="p-0 m-0 border-0 bg-transparent">
                          <a href="#"><BsThreeDotsVertical className="bi bi-three-dots-vertical text-white" /></a>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end" className="dropdown-menu">
                          <Dropdown.Item onClick={() => handleEditClick(index)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleViewClick(announcement)}>View</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteClick(announcement)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex flex-wrap">
                        <div className="d-flex align-items-center me-3 mb-1">
                          <h6 className="mb-1 me-2">Date:</h6>
                          <span>{announcement.date}</span>
                        </div>
                        <div className="d-flex align-items-center me-3 mb-1">
                          <h6 className="mb-1 me-2">Time:</h6>
                          <span>{announcement.time}</span>
                        </div>
                      </div>
                      <div className="text-truncate" style={{ maxHeight: '60px', overflow: 'hidden', marginTop: '5px' }}>
                        <h6 className="mb-1">Description:</h6>
                        <span>{announcement.description}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            {/* Modal for Adding or Editing Announcement */}
            <Modal show={showModal} onHide={handleCloseModal} >
              <Modal.Header>
                <Modal.Title>{isEditing ? "Edit Announcement" : "Add Announcement"}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ borderRadius: "15px" }}>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="announcementTitle">
                    <Form.Label>Announcement Title <span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={announcementForm.title}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={announcementForm.description}
                      onChange={handleInputChange}
                      placeholder="Enter Description"
                      required
                    />
                  </Form.Group>
                  <div className="d-flex gap-3 mt-3">
                    <Form.Group controlId="announcementDate" style={{ flex: 1 }}>
                      <Form.Label>Announcement Date <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={announcementForm.date}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="announcementTime" style={{ flex: 1 }}>
                      <Form.Label>Announcement Time <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={announcementForm.time}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      style={{ backgroundColor: "transparent", border: "1px solid grey", color: "black", width: "50%" }}
                      onClick={handleCloseModal}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{
                        background: !announcementForm.title || !announcementForm.description || !announcementForm.date || !announcementForm.time
                          ? "lightgrey"
                          : "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                        border: "none",
                        width: "50%",
                        cursor: !announcementForm.title || !announcementForm.description || !announcementForm.date || !announcementForm.time
                          ? "not-allowed"
                          : "pointer"
                      }}
                      disabled={!announcementForm.title || !announcementForm.description || !announcementForm.date || !announcementForm.time}
                    >
                      {isEditing ? "Save" : "Save"}
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Modal for Viewing Announcement */}
            <Modal show={viewModal} onHide={() => setViewModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>View Security Protocol</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedAnnouncement && (
                  <>
                    <p style={{ color: "grey" }}>Title <h6 className='text-dark'>{selectedAnnouncement.title}</h6></p>
                    <p style={{ color: "grey" }}>Description<h6 className='text-dark'>{selectedAnnouncement.description}</h6></p>

                    <div className='d-flex'>
                      <div className='p-2' style={{ textAlign: "right", color: "grey" }}>
                        <p style={{ textAlign: "center" }}>Date</p>
                        <h6 className='text-dark'>{new Date(selectedAnnouncement.date).toLocaleDateString('en-GB')}</h6>
                      </div>
                      <div className='p-2' style={{ textAlign: "right", color: "grey" }}>
                        <p style={{ textAlign: "center" }}> Time</p>
                        <h6 className='text-dark'> {new Date(selectedAnnouncement.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</h6>
                      </div>
                    </div>

                  </>
                )}
              </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onHide={cancelDelete}>
              <Modal.Header>
                <Modal.Title> Delete Announcement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this security?
              </Modal.Body>
              <Modal.Footer className='d-flex' style={{ textAlign: "center", justifyContent: "center" }}>
                <Button style={{ width: "45%", backgroundColor: "transparent", color: "black", border: "1px solid grey" }} onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button style={{ width: "45%" }} variant="danger" onClick={confirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Announcement;
