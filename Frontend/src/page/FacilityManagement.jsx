import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';

const FacilityManagement = () => {
  const [selectedFacility, setSelectedFacility] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showCreateModal, setShowCreateModal] = useState(false); 
  const [facilityData, setFacilityData] = useState({
    name: '',
    serviceDate: '',
    description: ''
  });
  const [newFacilityData, setNewFacilityData] = useState({
    name: '',
    serviceDate: '',
    description: ''
  });
  const [facilities, setFacilities] = useState([
    { name: 'Parking Facilities', serviceDate: '01/07/2024', description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in.' },
    { name: 'Parking Facilities', serviceDate: '02/07/2024', description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in.' },
    { name: 'Swimming Pool', serviceDate: '10/07/2024', description: 'Swimming pool available for residents.' },
    { name: 'Parks and Green Spaces', serviceDate: '11/07/2024', description: 'Public parks and recreational areas.' },
    { name: 'Wi-Fi and Connectivity', serviceDate: '11/07/2024', description: 'Free Wi-Fi available for residents.' },
    { name: 'Parking Facilities', serviceDate: '01/07/2024', description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in.' },
  ]);

  const handleEdit = (index) => {
    const facility = facilities[index];
    setFacilityData({
      name: facility.name,
      serviceDate: facility.serviceDate,
      description: facility.description
    });
    setSelectedFacility(index); 
    setShowModal(true); 
  };

  const handleView = (facility) => {
    setFacilityData(facility);
    setShowViewModal(true);
  };

  const handleDelete = (index) => {
    setSelectedFacility(index); 
    setShowDeleteModal(true); 
  };

  const handleDeleteConfirm = () => {
    const updatedFacilities = facilities.filter((_, index) => index !== selectedFacility); 
    setFacilities(updatedFacilities); 
    setShowDeleteModal(false); 
  };

  const handleModalClose = () => {
    setShowModal(false); 
    setFacilityData({ name: '', serviceDate: '', description: '' }); 
  };

  const handleModalSave = () => {
    const updatedFacilities = [...facilities];
    updatedFacilities[selectedFacility] = facilityData;
    setFacilities(updatedFacilities); 

    setShowModal(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData({ ...facilityData, [name]: value });
    setNewFacilityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleNewFacilityChange = (e) => {
    const { name, value } = e.target;
    setNewFacilityData({ ...newFacilityData, [name]: value });
  };

 
  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateFacility = () => {
    setFacilities([...facilities, newFacilityData]);
    setShowCreateModal(false); 
    setNewFacilityData({ name: '', serviceDate: '', description: '' }); 
  };

  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); 
  };

 
  const isCreateButtonDisabled = !newFacilityData.name || !newFacilityData.serviceDate || !newFacilityData.description;

 
  return (
    <div className="container-fluid p-3" style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <div className="container bg-white p-4 rounded shadow">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Facility Management</h2>
          <button
            className="btn"
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              border: "none",
              color:"white"
            }}
            onClick={handleCreateModalOpen} 
          >
            Create Facility
          </button>
        </div>

        {/* Facility Cards */}
        <div className="row">
          {facilities.map((facility, index) => (
            <div key={index} className="col-md-4 col-lg-3 mb-4 d-flex">
              <div className="card w-100"
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  minHeight: '220px',
                  maxHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#5678E9",
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '10px',
                  }}
                >
                  <span className="text-truncate" style={{ maxWidth: '200px' }}>{facility.name}</span>
                  <Dropdown>
                    <Dropdown.Toggle as="div" bsPrefix="p-0 m-0 border-0 bg-transparent">
                      <a href="#"><BsThreeDotsVertical className="bi bi-three-dots-vertical text-white" /></a>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="dropdown-menu">
                      <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleView(facility)}>View</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body flex-column justify-content-between m-2" style={{ overflow: 'hidden', flexGrow: 1, padding: '1px' }}>
                  <div>
                    <p className="text-muted" style={{ fontSize: '0.85em', display: 'inline', color: "grey" }}>
                      Upcoming Schedule
                    </p>
                    <p style={{ fontSize: '0.9em', display: 'inline', marginLeft: '10px' }}>
                      {formatDate(facility.serviceDate)}
                    </p>
                  </div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <p style={{ fontSize: '0.85em', color: 'gray' }}>
                      <strong>Description</strong><br />
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Facility Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="facilityName">
              <Form.Label>Facility Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Facility Name"
                name="name"
                value={newFacilityData.name}
                onChange={handleNewFacilityChange}
              />
            </Form.Group>
            <Form.Group controlId="serviceDate">
              <Form.Label>Service Date</Form.Label>
              <Form.Control
                type="date"
                name="serviceDate"
                value={newFacilityData.serviceDate}
                onChange={handleNewFacilityChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                value={newFacilityData.description}
                onChange={handleNewFacilityChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
  <Button
    style={{
      backgroundColor: "transparent",
      border: "1px solid grey",
      width: "45%", 
      color: "black",
      
    }}
    onClick={() => setShowCreateModal(false)}
  >
    Cancel
  </Button>
  <Button
    style={{
      background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
      border: "none",
      color: "white",
      width: "45%",
      
    }}
    onClick={() => console.log("Facility Created", newFacilityData)} 
    disabled={
      !newFacilityData.name || !newFacilityData.serviceDate || !newFacilityData.description
    }
  >
    Create Facility
  </Button>
</Modal.Footer>

      </Modal>
      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="facilityName">
              <Form.Label>Facility Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Facility Name"
                name="name"
                value={facilityData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="serviceDate">
              <Form.Label>Service Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Service Date"
                name="serviceDate"
                value={facilityData.serviceDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                value={facilityData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
          style={{
            backgroundColor: "transparent",
            border: "1px solid grey",
            width: "45%", 
            color: "black",
            
          }}
          variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              border: "none",
              color: "white",
              width: "45%",
              
            }}
            onClick={handleModalSave}
            disabled={!facilityData.name || !facilityData.serviceDate || !facilityData.description}
          >
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <strong>Facility Name: </strong>
            <span>{facilityData.name}</span>
          </div>
          <div>
            <strong>Service Date: </strong>
            <span>{formatDate(facilityData.serviceDate)}</span>
          </div>
          <div>
            <strong>Description: </strong>
            <p>{facilityData.description}</p>
          </div>
        </Modal.Body>
       
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this facility?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FacilityManagement;
