import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { createSecurityProtocol, getAllSecurityProtocols, deleteSecurityProtocol, updateSecurityProtocol } from '../apiservices/securityProtocolservice';
import toast from 'react-hot-toast';
import EditablePage from '../practice/EditablePage';
import { Delete, Edit } from '@mui/icons-material';
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
 
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await getAllSecurityProtocols();
        console.log('API Response:', response);
        if (response.data && Array.isArray(response.data.records)) {
          setProtocols(response.data.records);
        } else {
          console.error("API response does not have 'records' as an array:", response);
          setProtocols([]);
        }
      } catch (error) {
        console.error('Error fetching protocols:', error);
        toast.error('Failed to fetch protocols');
      }
    };
    fetchProtocols();
  }, []);

  const handleShowModal = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNewProtocol({ ...newProtocol, date: formattedDate, time: formattedTime });
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

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
      toast.success('Protocol created successfully!');
    } catch (error) {
      console.error('Error creating protocol:', error);
      toast.error('Failed to create protocol');
    }
  };

  const handleEdit = async (protocolIndex) => {
    const protocol = protocols[protocolIndex];
    setEditProtocol(protocol);
    setShowEditModal(true);
  };


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
      toast.success('Protocol updated successfully!');
    } catch (error) {
      console.error('Error updating protocol:', error);
      toast.error('Failed to update protocol');
    }
  };

  const handleView = async (protocolIndex) => {
    const protocol = protocols[protocolIndex];
    setViewProtocol(protocol);
    setShowViewModal(true);
  };

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
      toast.success('Protocol deleted successfully!');
    } catch (error) {
      console.error('Error deleting protocol:', error);
      toast.error('Failed to delete protocol');
    }
  };
  const EDITE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#39973D',
  };
  const DELETE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#E74C3C',
  };
  const VIEW = {
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',
    backgroundColor: '#F6F8FB',
  };
  const blanck = { backgroundColor: '#F6F8FB', padding: '5px 12px 5px 12px', borderRadius: '16px', color: '#4F4F4F', }


  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  return (
    <div className="container-fluid bg-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Security Protocols</h2>
        <Button
          className="text-white"
          style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white', }} onClick={handleShowModal} > Create Protocol</Button>
      </div>
      <div className="responsive-table-container">
        <table className="responsive-table">
          <thead className='tabal-header'>
            <tr>

              <th className='redious'> &nbsp;&nbsp;  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  Title</th>
              <th>  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  &nbsp;Description</th>
              <th> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Date</th>
              <th> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;Time</th>
              <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((item, index) => (
              <tr key={index}>
                <td><span className='m-5'>{item.title}</span></td>
                <td><span className='m-5'> {item.description}</span></td>
                <td><span className='m-5'>  {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</span></td>
                <td><span className='m-5' style={blanck}> {item.time}</span></td>
                <td className="action-buttons">
                  <div className="d-flex gap-2">
                    <span className="status-badge-edit" style={EDITE} onClick={() => handleEdit(index)} >
                      <Edit style={{ cursor: 'pointer' }} />
                    </span>
                    <span className="status-badge-view" style={VIEW} onClick={() => handleView(index)} >
                      <VisibilityIcon style={{ cursor: 'pointer' }} />
                    </span>
                    <span className="status-badge-delete" style={DELETE} onClick={() => handleDelete(index)} >
                      <Delete style={{ cursor: 'pointer' }} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              <Form.Control type="text" name="title" value={editProtocol?.title || ''} onChange={handleEditChange} placeholder="Enter protocol title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={editProtocol?.description || ''} onChange={handleEditChange} placeholder="Enter protocol description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={editProtocol?.date || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={editProtocol?.time || ''}
                onChange={handleEditChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none', width: '45%' }} onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white', width: '45%' }} onClick={handleSaveEdit}>
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
            Cancel
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
