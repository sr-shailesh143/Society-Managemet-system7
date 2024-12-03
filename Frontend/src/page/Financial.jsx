import React, { useState, useEffect } from 'react';
import {  Button,  Modal, Form } from 'react-bootstrap';
import { addNote, getAllNotes, updateNote } from '../apiservices/noteservice';
import { FaEllipsisV } from 'react-icons/fa';

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
console.log(selectedDate);
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
    <div>
      <div className="note m-3">
        <div className="row  d-flex justify-content-between align-items-center  p-2 ">
          <h4 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Note</h4>
          <div className="col-12 col-md-2 mt-2 add-p-btn">
            <button className=' add-btn w-75' onClick={handleCreateModalOpen}>  <span>Create Note</span> </button>
          </div>
        </div>
        <div className="row mt-4">
          {noteData.map((note, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 Card " key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-header custom-card-header">
                  <h5 className="card-title mb-0">{note.title}</h5>
                  <div className="dropdown">
                    <button className="btn btn-sm text-white p-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FaEllipsisV size={23} className='three-dot p-1' />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item  dot-btn" onClick={() =>handleEditModalOpen(note)}>
                        Edit
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card-body">
           
                  <p className="card-text">
                    <p style={{ color: "rgba(79, 79, 79, 1)" ,fontWeight:"400",font:"Poppins"}}>Description:</p>
                    <h6 style={{ color: "rgba(32, 34, 36, 1)", fontWeight: "500" }}>{note.description}</h6>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <Button variant="secondary" style={{ backgroundColor: "lightgrey", color: "white", border: "none", width: "45%" }} onClick={handleEditModalClose} className='p-3'>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00', color: "white", width: "45%" }} className='p-3'>
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
              <Form.Control type="text" placeholder="Enter title" onChange={(e) => setSelectedTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={(e) => setSelectedDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
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

    </div>
  );
};

export default Financial;
