import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  createVisitor,
  getAllVisitors,
  deleteVisitor,
  updateVisitor,
} from "../apiservices/visitourtrackingservice";

const VisitorTracking = () => {
  const [visitors, setVisitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVisitorId, setEditingVisitorId] = useState(null);
  const [newVisitor, setNewVisitor] = useState({
    visitorName: "",
    phoneNumber: "",
    wing: "",
    unit: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await getAllVisitors();
      const visitorData = response.data?.records || response.data || [];
      if (Array.isArray(visitorData)) {
        setVisitors(visitorData);
      } else {
        console.error("Unexpected response format:", response.data);
        setVisitors([]);
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setVisitors([]);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    resetVisitorForm();
  };

  const handleCloseModal = () => setShowModal(false);

  const resetVisitorForm = () => {
    setNewVisitor({
      visitorName: "",
      phoneNumber: "",
      wing: "",
      unit: "",
      date: "",
      time: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateVisitor = async () => {
    try {
      if (isEditing) {
        await updateVisitor(editingVisitorId, newVisitor);
      } else {
        await createVisitor(newVisitor);
      }
      handleCloseModal();
      fetchVisitors(); // Fetch updated visitors list
    } catch (error) {
      console.error(isEditing ? "Error updating visitor:" : "Error adding visitor:", error);
    }
  };

  const handleEditVisitor = (visitor) => {
    setNewVisitor(visitor);
    setIsEditing(true);
    setEditingVisitorId(visitor._id);
    setShowModal(true);
  };

  const handleDeleteVisitor = async (id) => {
    try {
      await deleteVisitor(id);
      fetchVisitors(); // Fetch updated visitors list
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Visitor Tracking</h3>
        <div className="d-flex align-items-center">
          <select
            className="form-select m-1"
            style={{ width: "auto", minWidth: "100px", height: "44px", fontSize: "13px" }}
          >
            <option>Month</option>
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last Year</option>
          </select>
          <button
            className="btn me-2"
            onClick={handleShowModal}
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              color: "white",
              border: "none",
            }}
          >
            Add Visitor Detail
          </button>
        </div>
      </div>

      {/* Visitor Table */}
      <div className="table-responsive">
        <table className="table table-borderless align-middle">
          <thead>
            <tr>
              <th className="p-3" style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>
                Visitor Name
              </th>
              <th className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
              <th className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Date</th>
              <th className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Unit</th>
              <th className="p-3" style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td className="d-flex align-items-center">
                  <img
                    src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
                    alt="visitor"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <span>{visitor.visitorName}</span>
                </td>
                <td>{visitor.phoneNumber}</td>
                <td>{new Date(visitor.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className="badge text-primary rounded-circle"
                    style={{ background: "#F6F8FB", textAlign: "center" }}
                  >
                    {visitor.wing.toUpperCase()}
                  </span>
                  {visitor.unit}
                </td>
                <td
                  style={{
                    backgroundColor: "#E5ECFD",
                    color: "#4F4F4F",
                    width: "90px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "15px",
                    padding: "0px",
                  }}
                >
                  {formatTime(visitor.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Visitor Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Visitor" : "Add Visitor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVisitorName">
              <Form.Label>Visitor Name</Form.Label>
              <Form.Control
                type="text"
                name="visitorName"
                value={newVisitor.visitorName}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formVisitorPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={newVisitor.phoneNumber}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formVisitorWing">
                  <Form.Label>Wing</Form.Label>
                  <Form.Control
                    type="text"
                    name="wing"
                    value={newVisitor.wing}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formVisitorUnit">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type="text"
                    name="unit"
                    value={newVisitor.unit}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formVisitorDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newVisitor.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formVisitorTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={newVisitor.time}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddOrUpdateVisitor}
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              border: "none",
            }}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default VisitorTracking;
