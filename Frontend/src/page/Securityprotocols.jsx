import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';


const SecurityProtocols = () => {
    const [protocols, setProtocols] = useState([
      { title: 'Physical Security', description: 'Implementing surveillance cameras in public spaces.', date: '11/01/2024', time: '3:45 PM' },
      { title: 'Cybersecurity', description: 'Securing critical infrastructure, government systems.', date: '12/01/2024', time: '6:40 AM' },
      { title: 'Legal Measures', description: 'Enforcing and updating laws and regulations.', date: '13/01/2024', time: '1:00 PM' },
      { title: 'Social Engagement', description: 'Fostering collaboration between law enforcement.', date: '14/01/2024', time: '6:20 PM' },
      { title: 'Education and Training', description: 'Implementing surveillance cameras in public spaces.', date: '15/01/2024', time: '3:45 PM' },
    ]);
  
    const [showModal, setShowModal] = useState(false);
    const [newProtocol, setNewProtocol] = useState({
      title: '',
      description: '',
      date: '',  // Will set the current date here programmatically
      time: '',  // Will set the current time here programmatically
    });
  
    const handleShowModal = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // e.g., "2024-11-14"
      const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., "3:45 PM"
      setNewProtocol({
        ...newProtocol,
        date: formattedDate,
        time: formattedTime,
      });
      setShowModal(true);
    };
  
    const handleCloseModal = () => setShowModal(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewProtocol({
        ...newProtocol,
        [name]: value,
      });
    };
  
    const handleSubmit = () => {
      setProtocols([...protocols, newProtocol]);
      handleCloseModal(); // Close the modal after adding the protocol
      setNewProtocol({ title: '', description: '', date: '', time: '' }); // Reset the form
    };
  
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
              <th
                style={{
                  backgroundColor: '#E5ECFD',
                  borderRadius: '0px 15px 0px 0px',
                  textAlign: 'center',
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocol, index) => (
              <tr key={index}>
                <td>{protocol.title}</td>
                <td>{protocol.description}</td>
                <td>{protocol.date}</td>
                <td>{protocol.time}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button variant="success" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                  <Button variant="primary" size="sm" className="me-2">
                    <FaEye />
                  </Button>
                  <Button variant="danger" size="sm">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      {/* Modal for creating a new protocol */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Protocol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newProtocol.title}
                onChange={handleChange}
                placeholder="Enter protocol title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newProtocol.description}
                onChange={handleChange}
                placeholder="Enter protocol description"
              />
            </Form.Group>

            {/* No Date or Time fields in the form, they are auto-generated */}
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center', justifyContent: 'center' }}>
          <Button
            style={{ backgroundColor: 'lightgrey', color: 'white', border: 'none', width: '40%' }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
              border: 'none',
              color: 'white',
              width: '40%',
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SecurityProtocols;
