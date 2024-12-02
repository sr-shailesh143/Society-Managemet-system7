import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { addNote, getAllNotes, updateNote } from '../apiservices/noteservice';
import FileUploadForm from '../practice/EditablePage';

const Financial = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      if (response.data && Array.isArray(response.data.records)) {
        setNoteData(response.data.records);
      } else {
        console.error('Expected an array in records but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleEditModalOpen = (note) => {
    if (note && note._id) {
      setSelectedNoteId(note._id);
      setSelectedTitle(note.title || '');
      setSelectedDescription(note.description || '');
      setSelectedDate(note.date || '');
      setShowEditModal(true);
    } else {
      console.error('Note object is missing _id or is undefined:', note);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    resetFields();
  };

  const handleCreateModalOpen = () => {
    resetFields();
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedNoteId(null);
    setSelectedTitle('');
    setSelectedDescription('');
    setSelectedDate('');
  };

  const handleSaveChanges = async () => {
    if (selectedNoteId) {
      try {
        await updateNote(selectedNoteId, {
          title: selectedTitle,
          description: selectedDescription,
          date: selectedDate,
        });
        fetchNotes();
        handleEditModalClose();
      } catch (error) {
        console.error('Error updating note:', error);
      }
    } else {
      console.warn('No note ID selected for update.');
    }
  };

  const handleCreateNote = async () => {
    try {
      await addNote({
        title: selectedTitle,
        description: selectedDescription,
        date: selectedDate,
      });
      fetchNotes();
      handleCreateModalClose();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Container fluid style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column bg-light shadow" style={{ width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-3 p-3">
          <h2>Note</h2>
          <Button
            style={{
              background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
              borderColor: '#ff6b00',
            }}
            onClick={handleCreateModalOpen}
          >
            Create Note
          </Button>
        </div>

        <Row className="g-3 mb-5">
          {noteData.map((note) => (
            <Col xs={12} sm={6} md={4} lg={3} key={note._id}>
              <Card className="h-100" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Card.Header
                  className="d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#407bff', color: '#fff' }}
                >
                  <div>{note.title}</div>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" bsPrefix="p-0">
                      <HiOutlineDotsVertical style={{ color: '#fff', fontSize: '1.2rem' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditModalOpen(note)}>Edit</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Description:</strong> {note.description}
                    <br />
               
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
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                type="text"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
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
          <Button variant="secondary"  style={{ backgroundColor: "lightgrey", color: "white", border: "none", width: "45%" }} onClick={handleEditModalClose} className='p-3'>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}  style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00', color: "white", width: "45%" }} className='p-3'>
            Save 
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
              <Form.Control  type="text"  placeholder="Enter title"onChange={(e) => setSelectedTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control  as="textarea" rows={3} placeholder="Enter description" onChange={(e) => setSelectedDescription(e.target.value)}  />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date"   value={selectedDate}  onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "lightgrey", color: "white", border: "none", width: "45%" }} className='p-3' onClick={handleCreateModalClose}>
            Cancel
          </Button>
          <Button style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00', color: "white", width: "45%" }} className='p-3' onClick={handleCreateNote}>
            Create Note
          </Button>
        </Modal.Footer>
      </Modal>
{/* <FileUploadForm/> */}
    </Container>
  );
};

export default Financial;
