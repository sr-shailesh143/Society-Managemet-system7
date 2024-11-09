import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";

const Sidebar = () => (
  <div className="sidebar">
    <h3>DashStack</h3>
    <nav>
      <ul>
        <li>Dashboard</li>
        <li>Resident Management</li>
        <li>Financial Management</li>
        <li>Facility Management</li>
        <li>Complaint Tracking</li>
        <li>Security Management</li>
        <li>Security Guard</li>
        <li>Announcement</li>
      </ul>
    </nav>
    <Button variant="danger" className="logout-btn">Logout</Button>
  </div>
);

const Header = () => (
  <div className="header">
    <h2>Resident Management</h2>
    <div className="user-info">
      <span>Moni Roy</span>
      <img src="path/to/profile-pic.jpg" alt="User" />
    </div>
  </div>
);

const ResidentTable = ({ residents, handleShowModal }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Unit Number</th>
        <th>Unit Status</th>
        <th>Resident Status</th>
        <th>Phone Number</th>
        <th>Member</th>
        <th>Vehicle</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {residents.map((resident, index) => (
        <tr key={index}>
          <td>{resident.name}</td>
          <td>{resident.unit}</td>
          <td>{resident.unitStatus}</td>
          <td>{resident.residentStatus}</td>
          <td>{resident.phone}</td>
          <td>{resident.member}</td>
          <td>{resident.vehicle}</td>
          <td>
            <Button variant="outline-primary" onClick={() => handleShowModal(resident)}>
              Edit
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const StatusModal = ({ show, handleClose, resident, handleStatusChange }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Residence Status</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Check
          type="radio"
          label="Occupied"
          name="status"
          value="Occupied"
          checked={resident.unitStatus === "Occupied"}
          onChange={handleStatusChange}
        />
        <Form.Check
          type="radio"
          label="Vacant"
          name="status"
          value="Vacant"
          checked={resident.unitStatus === "Vacant"}
          onChange={handleStatusChange}
        />
        <Form.Check type="checkbox" label="By submitting you agree to select Occupied" />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleClose}>Save</Button>
    </Modal.Footer>
  </Modal>
);

const App = () => {
  const [show, setShow] = useState(false);
  const [selectedResident, setSelectedResident] = useState({});
  
  const residents = [
    { name: "Evelyn Harper", unit: "A1001", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 1, vehicle: 2 },
    { name: "", unit: "A1002", unitStatus: "Vacant", residentStatus: "Tenant", phone: "97587 85828", member: 1, vehicle: 2 },
    // Add more residents here
  ];

  const handleShowModal = (resident) => {
    setSelectedResident(resident);
    setShow(true);
  };

  const handleCloseModal = () => setShow(false);

  const handleStatusChange = (event) => {
    setSelectedResident((prev) => ({ ...prev, unitStatus: event.target.value }));
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <div className="content">
            <Button variant="primary" className="mb-3">Add New Resident Details</Button>
            <ResidentTable residents={residents} handleShowModal={handleShowModal} />
          </div>
        </Col>
      </Row>
      <StatusModal show={show} handleClose={handleCloseModal} resident={selectedResident} handleStatusChange={handleStatusChange} />
    </Container>
  );
};

export default App;
