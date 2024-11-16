import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { toast } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from '../apiservices/announcementservice';


const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const checkFormFilled = (announcement) => {
    return (
      announcement?.title?.trim() !== "" &&
      announcement?.description?.trim() !== "" &&
      announcement?.announcementDate?.trim() !== "" &&
      announcement?.announcementTime?.trim() !== ""
    );
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setAnnouncementForm({ title: "", description: "", announcementDate: "", announcementTime: "" });
  };

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    description: "",
    announcementDate: "",
    announcementTime: ""
  });

  const handleAnnouncementChange = (field, value) => {
    const updatedAnnouncement = {
      ...currentAnnouncement,
      [field]: value,
    };
    setCurrentAnnouncement(updatedAnnouncement);
    setIsFormFilled(checkFormFilled(updatedAnnouncement));
  };

  const handleCreateAnnouncement = () => {
    setModalType("create");
    setCurrentAnnouncement({ title: "", announcementDate: "", announcementTime: "", description: "" });
    setIsModalOpen(true);
    setIsFormFilled(false);
  };

  const handleEditClick = (announcement) => {
    setModalType("edit");
    setCurrentAnnouncement({ ...announcement });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (announcement) => {
    setModalType("delete");
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleViewClick = (announcement) => {
    setModalType("view");
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setCurrentAnnouncement(null);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (modalType === "create") {
      try {
        setIsModalOpen(false);
        const response = await createAnnouncement(currentAnnouncement);
        fetchAnnouncement();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (modalType === "edit") {
      try {
        const response = await updateAnnouncement(
          currentAnnouncement._id,
          currentAnnouncement
        );
        fetchAnnouncement();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    handleCloseModal();
    setDropdownOpen(false);
  };

  const handleDelete = async () => {
    try {
      setAnnouncements(
        announcements.filter((a) => a._id !== currentAnnouncement._id)
      );
      const response = await deleteAnnouncement(currentAnnouncement._id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      handleCloseModal();
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const fetchAnnouncement = async () => {
    try {
      const response = await getAnnouncements();
      console.log("API Response:", response); // Debug: Check API response
  
      if (response?.data?.Announcement && Array.isArray(response.data.Announcement)) {
        setAnnouncements(response.data.Announcement);
      } else {
        console.warn("Unexpected API structure, setting announcements to an empty array.");
        setAnnouncements([]); // Set to an empty array if response is not as expected
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error(error?.response?.data?.message || "Failed to load announcements");
      setAnnouncements([]); // Ensure announcements is set to an empty array on error
    }
  };
  
  // Call fetchAnnouncement in useEffect
  useEffect(() => {
    fetchAnnouncement();
  }, []);
  
  return (

    <div className="container-fluid " style={{ minHeight: '100vh', }}>
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
                onClick={() => {setIsEditing(false);
                handleShowModal();
                handleCreateAnnouncement();}}
              >
                Create Announcement
              </Button>
            </div>

            <div className="row flex-grow-1 p-3">
            {announcements?.length > 0 ? (
    announcements.map((announcement, index) => (
      <div key={announcement._id} className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
        
<Card className="shadow-sm announcement-card" style={{ width: '370px', height: 'auto' }}>
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                      <span className="text-truncate" style={{ maxWidth: '85%' }}>{announcement.title}</span>
                      <Dropdown>
                        <Dropdown.Toggle as="div" bsPrefix="p-0 m-0 border-0 bg-transparent" onClick={() => toggleDropdown(announcement._id)}>
                          <a href="#"><BsThreeDotsVertical  className="bi bi-three-dots-vertical text-white" /></a>
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
                          <span> {new Date(announcement.announcementDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}</span>
                        </div>
                        <div className="d-flex align-items-center me-3 mb-1">
                          <h6 className="mb-1 me-2">Time:</h6>
                          <span>{announcement.announcementTime}</span>
                        </div>
                      </div>
                      <div className="text-truncate" style={{ maxHeight: '60px', overflow: 'hidden', marginTop: '5px' }}>
                        <h6 className="mb-1">Description:</h6>
                        <span>{announcement.description}</span>
                      </div>
                    </Card.Body>
                  </Card>
      </div>
    ))
  ) : (
    <p>No announcements to display</p>
  )}
            </div>

            {/* Modal for Adding or Editing Announcement */}
            <Modal show={showModal} onHide={handleCloseModal} >
              <Modal.Header>
                <Modal.Title>{isEditing ? "Edit Announcement" : "Add Announcement"}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ borderRadius: "15px" }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="announcementTitle">
                    <Form.Label>Announcement Title <span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name='title'
                      value={currentAnnouncement?.title || ""}
                      placeholder="Enter Name"
                      required
                      onChange={(e) =>
                        handleAnnouncementChange("title", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      name='description'
                      value={currentAnnouncement?.description || ""}
                      placeholder="Enter Description"
                      required
                      onChange={(e) =>
                        handleAnnouncementChange("description", e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex gap-3 mt-3">
                    <Form.Group controlId="announcementDate" style={{ flex: 1 }}>
                      <Form.Label>Announcement Date <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name='announcementDate'
                        defaultValue={ currentAnnouncement?.announcementDate
                          ? new Date(currentAnnouncement.announcementDate)
                            .toISOString()
                            .split("T")[0]
                          : ""}
                        required
                        onChange={(e) =>
                          handleAnnouncementChange("announcementDate", e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="announcementTime" style={{ flex: 1 }}>
                      <Form.Label> Time <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control
                        type="time"
                        name='announcementTime'
                        value={currentAnnouncement?.announcementTime || ""}
                        required
                        onChange={(e) =>
                          handleAnnouncementChange("announcementTime", e.target.value)}
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
                        background: !announcementForm.title || !announcementForm.description || !announcementForm.announcementDate || !announcementForm.announcementTime
                          ? "lightgrey"
                          : "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                        border: "none",
                        width: "50%",
                        cursor: !announcementForm.title || !announcementForm.description || !announcementForm.announcementDate || !announcementForm.announcementTime
                          ? "not-allowed"
                          : "pointer"
                      }}
                      disabled={!announcementForm.title || !announcementForm.description || !announcementForm.announcementDate || !announcementForm.announcementTime}
                    >
                      {isEditing ? "Save" : "Save"}
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Modal for Viewing Announcement */}
            {isModalOpen && modalType === "view" && (
            <Modal show={viewModal} onHide={() => setViewModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>View Security Protocol</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {currentAnnouncement && (
                  <>
                    <p style={{ color: "grey" }}>Title <h6 className='text-dark'>{currentAnnouncement.title}</h6></p>
                    <p style={{ color: "grey" }}>Description<h6 className='text-dark'>{currentAnnouncement.description}</h6></p>

                    <div className='d-flex'>
                      <div className='p-2' style={{ textAlign: "right", color: "grey" }}>
                        <p style={{ textAlign: "center" }}>Date</p>
                        <h6 className='text-dark'> {new Date(currentAnnouncement.announcementDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}</h6>
                      </div>
                      <div className='p-2' style={{ textAlign: "right", color: "grey" }}>
                        <p style={{ textAlign: "center" }}> Time</p>
                        <h6 className='text-dark'> {new Date(currentAnnouncement.announcementTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</h6>
                      </div>
                    </div>

                  </>
                )}
              </Modal.Body>
            </Modal>
          )}

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onHide={handleCloseModal}>
              <Modal.Header>
                <Modal.Title> Delete Announcement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this security?
              </Modal.Body>
              <Modal.Footer className='d-flex' style={{ textAlign: "center", justifyContent: "center" }}>
                <Button style={{ width: "45%", backgroundColor: "transparent", color: "black", border: "1px solid grey" }} onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button style={{ width: "45%" }} variant="danger" onClick={handleDelete}>
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
