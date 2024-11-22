import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { addNote, getAllNotes, updateNote } from '../apiservices/noteservice';

const Financial = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // New state for the date field
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      // Check if response data has a records array
      if (response.data && Array.isArray(response.data.records)) {
        setNoteData(response.data.records);
      } else {
        console.error("Expected an array in records but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleEditModalOpen = (note) => {
    setSelectedNoteId(note.id);
    setSelectedTitle(note.title);
    setSelectedDescription(note.description);
    setSelectedDate(note.date || ''); // Load existing date if available
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  const handleCreateModalOpen = () => {
    setSelectedNoteId(null);
    setSelectedTitle('');
    setSelectedDescription('');
    setSelectedDate(''); // Clear the date for new notes
    setShowCreateModal(true);
  };
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleSaveChanges = async () => {
    if (selectedNoteId) {
      try {
        await updateNote(selectedNoteId, {
          title: selectedTitle,
          description: selectedDescription,
          date: selectedDate // Include the date field when saving changes
        });
        fetchNotes();
        handleEditModalClose();
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  const handleCreateNote = async () => {
    try {
      await addNote({
        title: selectedTitle,
        description: selectedDescription,
        date: selectedDate // Include the date when creating a new note
      });
      fetchNotes();
      handleCreateModalClose();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <Container fluid className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="container-fluid d-flex flex-column bg-light shadow" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 p-3">
          <h2>Note</h2>
          <Button style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00' }} onClick={handleCreateModalOpen}>
            Create Note
          </Button>
        </div>

        <Row className="g-3 mb-5">
          {noteData.map((note, idx) => (
            <Col xs={12} sm={6} md={4} lg={3} key={note.id}>
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
                      <Dropdown.Item onClick={() => handleEditModalOpen(note)}>Edit</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <Card.Text style={{ fontSize: '0.9rem', color: '#333' }}>
                    <strong style={{ color: 'grey' }}>Description:</strong>
                    <p>{note.description}</p>
                    <strong style={{ color: 'grey' }}>Date:</strong>{new Date(note.date).toLocaleDateString()}
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
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "lightgrey", color: "white", border: "none", width: "45%" }} onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00', color: "white", width: "45%" }}>
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
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "lightgrey", color: "white", border: "none", width: "45%" }} onClick={handleCreateModalClose}>
            Cancel
          </Button>
          <Button style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00', color: "white", width: "45%" }} onClick={handleCreateNote}>
            Create Note
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Financial;
