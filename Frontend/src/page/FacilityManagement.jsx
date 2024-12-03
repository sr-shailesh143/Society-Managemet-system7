import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { createFacility, getAllFacilities, deleteFacility, updateFacility, GetFacility } from '../apiservices/facilityservice';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [facilityData, setFacilityData] = useState({ facilityName: '', scheduleServiceDate: '', description: '', remindBefore: '4-day' });
  const [newFacilityData, setNewFacilityData] = useState({ facilityName: '', scheduleServiceDate: '', description: '', remindBefore: '4-day' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await getAllFacilities();


      console.log("Response from API:", response);


      if (response && response.data && response.data.records) {
        setFacilities(response.data.records);
      } else {
        setFacilities([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      setError("Error fetching facilities. Please try again.");
      setLoading(false);
      setFacilities([]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const handleEdit = async (facilityId) => {
    console.log('Edit button clicked for facility:', facilityId);
    try {
      const facility = await GetFacility(facilityId);
      setFacilityData(facility);
      setSelectedFacility(facilityId);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching facility data:", error);
    }
  };


  const handleView = (facility) => {
    setFacilityData(facility);
    setShowViewModal(true);
  };

  const handleDelete = (facilityId) => {
    setSelectedFacility(facilityId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFacility(selectedFacility);
      fetchFacilities();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFacilityData({ facilityName: '', scheduleServiceDate: '', description: '', remindBefore: '4-day' });
  };

  const handleModalSave = async () => {
    try {
      await updateFacility(selectedFacility, facilityData);
      fetchFacilities();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating facility:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData({ ...facilityData, [name]: value });
  };

  const handleNewFacilityChange = (e) => {
    const { name, value } = e.target;
    setNewFacilityData({ ...newFacilityData, [name]: value });
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateFacility = async () => {
    try {
      const newFacility = await createFacility(newFacilityData);
      fetchFacilities();
      setShowCreateModal(false);
      setNewFacilityData({ facilityName: '', scheduleServiceDate: '', description: '', remindBefore: '4-day' });
    } catch (error) {
      console.error("Error creating facility:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="container-fluid d-flex flex-column  rounded bg-light shadow" style={{ width: "100%" }}>

        <div className="d-flex justify-content-between align-items-center mb-4 p-3">
          <h2>Facility Management</h2>
          <button className="btn p-2" style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white" }} onClick={handleCreateModalOpen}  > Create Facility </button>
        </div>

        <div className="row">
          {facilities.length === 0 ? (
            <p>No facilities available</p>
          ) : (
            facilities.map((facility, facilityId) => (
              <div key={facilityId} className="col-md-4 col-lg-3 mb-4 d-flex">
                <div className="card w-100" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '220px', maxHeight: '300px', }} >
                  <div className="card-header bg-primary p-3" style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} >
                    <span className="text-truncate" style={{ maxWidth: '200px' }}>{facility.facilityName}</span>
                    <Dropdown>
                      <Dropdown.Toggle as="div" bsPrefix="p-0 m-0 border-0 bg-transparent">
                        <BsThreeDotsVertical className="bi bi-three-dots-vertical text-white" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end" className="dropdown-menu">
                        <Dropdown.Item onClick={() => { handleEdit(facilityId); setShowModal(true); }}>Edit</Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="card-body flex-column justify-content-between " style={{ overflow: 'hidden', flexGrow: 1 }}>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted" style={{ fontSize: '0.85em', color: "grey" }}>Upcoming Schedule</p>
                      <p style={{ fontSize: '0.9em' }}>{formatDate(facility.scheduleServiceDate)}</p>
                    </div>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <p style={{ fontSize: '0.85em', color: 'gray' }}><strong >Description</strong><br /><p className='text-dark'>{facility.description}</p></p>
                      {/* <p><strong>Reminder</strong>: {facility.remindBefore}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="facilityName">
              <Form.Label>Facility Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="text" placeholder="Enter Facility Name" name="facilityName" onChange={handleNewFacilityChange} />
            </Form.Group>
            <Form.Group controlId="serviceDate">
              <Form.Label>Service Date<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="date" name="scheduleServiceDate" onChange={handleNewFacilityChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Facility description" name="description" onChange={handleNewFacilityChange} />
            </Form.Group>
            <Form.Group controlId="remindBefore">
              <Form.Label>Reminder Before</Form.Label>
              <Form.Control as="select" name="remindBefore" onChange={handleNewFacilityChange}>
                <option value="4-day">4 days</option>
                <option value="3-day">3 days</option>
                <option value="2-day">2 days</option>
                <option value="1-day">1 day</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowCreateModal(false)}
            style={{ background: "lightgrey", border: "none", color: "white", width: "45%" }} className='p-3' >Cansel</Button>
          <Button onClick={handleCreateFacility} style={{
            background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white", width: "45%"
          }}
            className='p-3'
          >Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="facilityName">
              <Form.Label>Facility Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="text" value={facilityData.facilityName} name="facilityName" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="serviceDate">
              <Form.Label>Service Date<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="date" value={facilityData.scheduleServiceDate} name="scheduleServiceDate" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={facilityData.description} name="description" onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="remindBefore">
              <Form.Label>Reminder Before</Form.Label>
              <Form.Control as="select" value={facilityData.remindBefore} name="remindBefore" onChange={handleInputChange} >
                <option value="4-day">4 days</option>
                <option value="3-day">3 days</option>
                <option value="2-day">2 days</option>
                <option value="1-day">1 day</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='p-3' onClick={handleModalClose}>Close</Button>
          <Button style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white", width: "45%" }} className='p-3' onClick={handleModalSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Facility Name:</strong> {facilityData.facilityName}</p>
          <p><strong>Service Date:</strong> {formatDate(facilityData.scheduleServiceDate)}</p>
          <p><strong>Description:</strong> {facilityData.description}</p>
          <p><strong>Reminder Before:</strong> {facilityData.remindBefore}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this facility?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='p-3' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" className='p-3' onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default FacilityManagement;
