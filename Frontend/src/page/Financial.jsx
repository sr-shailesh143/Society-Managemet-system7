import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const Financial = () => {
  // State to control modals and store note data
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [noteData, setNoteData] = useState([
    { title: 'Rent or Mortgage', description: 'A visual representation of your spending categories visual representation.' },
    { title: 'Housing Costs', description: 'Detailed breakdown of your housing expenses.' },
    { title: 'Property Taxes', description: 'Overview of annual property taxes.' },
    { title: 'Maintenance Fees', description: 'Monthly maintenance fees breakdown.' },
    { title: 'Rent or Transportation', description: 'Your rent and transportation expenses.' },
    { title: 'Breakdown', description: 'Detailed breakdown of your spending habits.' },
    { title: 'Expense Tracker', description: 'Track your expenses across different categories.' },
    { title: 'Personal Expenses', description: 'Personal monthly expenses breakdown.' }
  ]);

  // Functions to open and close modals
  const handleEditModalOpen = (title, description) => {
    setSelectedTitle(title);
    setSelectedDescription(description);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);
  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleSaveChanges = () => {
    const updatedNotes = noteData.map(note =>
      note.title === selectedTitle
        ? { ...note, title: selectedTitle, description: selectedDescription }
        : note
    );
    setNoteData(updatedNotes);
    handleEditModalClose();
  };

  const handleCreateNote = () => {
    const newNote = { title: selectedTitle, description: selectedDescription };
    setNoteData([...noteData, newNote]);
    handleCreateModalClose();
  };

  return (
    <Container fluid className="container-fluid" style={{ minHeight: '100vh' }}>
    <div className="container-fluid d-flex flex-column bg-light shadow" style={{ width: "100%" }}>
      {/* Title and Create Note button aligned in a single line */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3">
        <h2>Note</h2>
        <Button style={{background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00' }} onClick={handleCreateModalOpen}>
          Create Note
        </Button>
      </div>
  
      {/* Notes Grid */}
      <Row className="g-3 mb-5">
        {noteData.map((note, idx) => (
          <Col xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card className="h-100" style={{ backgroundColor: '#fff', color: '#333', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{ backgroundColor: '#407bff', color: '#fff', fontSize: '1rem', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              >
                <div style={{ backgroundColor: '#407bff', padding: '5px 10px', borderRadius: '5px', color: '#fff', fontSize: '1rem' }}>
                  {note.title}
                </div>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" bsPrefix="p-0" id={`dropdown-${idx}`}>
                    <HiOutlineDotsVertical style={{ color: '#fff', fontSize: '1.2rem' }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditModalOpen(note.title, note.description)}>Edit</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ fontSize: '0.9rem', color: '#333' }}>
                  <strong style={{ color: 'grey' }}>Description:</strong>
                  <p>{note.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  
    {/* Edit Modal */}
    <Modal show={showEditModal} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {selectedTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Note Title <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={selectedDescription}
              onChange={(e) => setSelectedDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"lightgrey",color:"white",border:"none",width:"50%"}} onClick={handleEditModalClose}>
          Cancel
        </Button>
        <Button  onClick={handleSaveChanges} style={{background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00',color:"white",width:"45%" }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  
    {/* Create Note Modal */}
    <Modal show={showCreateModal} onHide={handleCreateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Note Title <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={(e) => setSelectedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              onChange={(e) => setSelectedDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"lightgrey",color:"white",border:"none",width:"50%"}} onClick={handleCreateModalClose}>
          Cancel
        </Button>
        <Button style={{background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00',color:"white",width:"45%" }} onClick={handleCreateNote}>
          Create Note
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
  
  );
};

export default Financial;
