import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { createSecurityProtocol, getAllSecurityProtocols, deleteSecurityProtocol, updateSecurityProtocol } from '../apiservices/securityProtocolservice';
import toast from 'react-hot-toast';

const SecurityProtocols = () => {
  const [protocols, setProtocols] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newProtocol, setNewProtocol] = useState({ title: '', description: '', date: '', time: '' });
  const [editProtocol, setEditProtocol] = useState(null);
  const [viewProtocol, setViewProtocol] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch all protocols on load
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await getAllSecurityProtocols();
        console.log('API Response:', response);  // Log the response to check its structure
        // Check if response.data.records exists and is an array
        if (response.data && Array.isArray(response.data.records)) {
          setProtocols(response.data.records);
        } else {
          console.error("API response does not have 'records' as an array:", response);
          setProtocols([]);  // In case records is empty or not an array
        }
      } catch (error) {
        console.error('Error fetching protocols:', error);
        toast.error('Failed to fetch protocols');  // Show error toast
      }
    };
    fetchProtocols();
  }, []);
  

  // Handle Modal for creating a new protocol
  const handleShowModal = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNewProtocol({ ...newProtocol, date: formattedDate, time: formattedTime });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProtocol({ ...newProtocol, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createSecurityProtocol(newProtocol);
      setProtocols([...protocols, newProtocol]);
      handleCloseModal();
      setNewProtocol({ title: '', description: '', date: '', time: '' });
      toast.success('Protocol created successfully!');  // Show success toast
    } catch (error) {
      console.error('Error creating protocol:', error);
      toast.error('Failed to create protocol');  // Show error toast
    }
  };

  // Handle Edit
  const handleEdit = async (protocolIndex) => {
    const protocol = protocols[protocolIndex];
    setEditProtocol(protocol);
    setShowEditModal(true);
  };

  // Handle Edit Changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProtocol({ ...editProtocol, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateSecurityProtocol(editProtocol._id, editProtocol);
      const updatedProtocols = protocols.map((protocol) =>
        protocol._id === editProtocol._id ? editProtocol : protocol
      );
      setProtocols(updatedProtocols);
      setShowEditModal(false);
      toast.success('Protocol updated successfully!');  // Show success toast
    } catch (error) {
      console.error('Error updating protocol:', error);
      toast.error('Failed to update protocol');  // Show error toast
    }
  };

  // Handle View
  const handleView = async (protocolIndex) => {
    const protocol = protocols[protocolIndex];
    setViewProtocol(protocol);
    setShowViewModal(true);
  };

  // Handle Delete
  const handleDelete = (protocolIndex) => {
    setDeleteIndex(protocolIndex);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSecurityProtocol(protocols[deleteIndex]._id);
      const updatedProtocols = protocols.filter((_, index) => index !== deleteIndex);
      setProtocols(updatedProtocols);
      setShowDeleteModal(false);
      toast.success('Protocol deleted successfully!');  // Show success toast
    } catch (error) {
      console.error('Error deleting protocol:', error);
      toast.error('Failed to delete protocol');  // Show error toast
    }
  };

  // Close Modals
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <div className="container-fluid bg-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Security Protocols</h2>
        <Button
          className="text-white"
          style={{
            background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
            border: 'none',
            color: 'white',
          }}
          onClick={handleShowModal}
        >
          Create Protocol
        </Button>
      </div>
      <Table responsive>
        <thead className="bg-white">
          <tr>
            <th style={{ backgroundColor: '#E5ECFD', borderRadius: '15px 0px 0px 0px' }}>Title</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Description</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Date</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Time</th>
            <th style={{ backgroundColor: '#E5ECFD', borderRadius: '0px 15px 0px 0px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(protocols) && protocols.length > 0 ? (
            protocols.map((protocol, index) => (
              <tr key={protocol._id}>
                <td>{protocol.title}</td>
                <td>{protocol.description}</td>
                <td>{new Date(protocol.date).toLocaleDateString()}</td>
                <td>{protocol.time}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button variant="success" size="sm" className="me-2" onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </Button>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleView(index)}>
                    <FaEye />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No protocols available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for creating a new protocol */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Create Protocol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newProtocol.title} onChange={handleChange} placeholder="Enter protocol title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={newProtocol.description} onChange={handleChange} placeholder="Enter protocol description" />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={newProtocol.date} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" value={newProtocol.time} onChange={handleChange} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none', width: '40%' }} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white', width: '40%' }} onClick={handleSubmit}>
            Save Protocol
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing a protocol */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header>
          <Modal.Title>Edit Protocol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editProtocol?.title || ''}
                onChange={handleEditChange}
                placeholder="Enter protocol title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editProtocol?.description || ''}
                onChange={handleEditChange}
                placeholder="Enter protocol description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editProtocol?.date || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={editProtocol?.time || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none', width: '40%' }} onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white', width: '40%' }} onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Protocol Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header>
          <Modal.Title>View Protocol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewProtocol && (
            <>
              <p><strong>Title:</strong> {viewProtocol.title}</p>
              <p><strong>Description:</strong> {viewProtocol.description}</p>
              <p><strong>Date:</strong> {viewProtocol.date}</p>
              <p><strong>Time:</strong> {viewProtocol.time}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none' }} onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this protocol?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none' }} onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default SecurityProtocols;
