import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const ComplaintModal = ({ showModal, setShowModal, isEditing, newComplaint, handleInputChange, handleFormSubmit }) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
                <Modal.Title>{isEditing ? 'Edit Complaint' : 'Create Complaint'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Requester Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newComplaint.name}
                            onChange={handleInputChange}
                            placeholder="Enter Requester Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Request Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="complaint"
                            value={newComplaint.complaint}
                            onChange={handleInputChange}
                            placeholder="Enter Request Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={newComplaint.date || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Label>Unit Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    value={newComplaint.unit}
                                    onChange={handleInputChange}
                                    placeholder="Enter unit number"
                                />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Wing</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="wing"
                                    value={newComplaint.wing}
                                    onChange={handleInputChange}
                                    placeholder="Enter wing"
                                />
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Low"
                                name="priority"
                                value="Low"
                                checked={newComplaint.priority === 'Low'}
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Medium"
                                name="priority"
                                value="Medium"
                                checked={newComplaint.priority === 'Medium'}
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="High"
                                name="priority"
                                value="High"
                                checked={newComplaint.priority === 'High'}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
    <Form.Label>Status</Form.Label>
    <div className="d-flex">
        <Form.Check
           
            type="radio"
            label="Pending"
            name="status"
            value="Pending"
            checked={newComplaint.status === 'Pending'}
            onChange={handleInputChange}
        />
        <Form.Check
      
            type="radio"
            label="Open"
            name="status"
            value="Open"
            checked={newComplaint.status === 'Open'}
            onChange={handleInputChange}
        />
        <Form.Check
            inline
            type="radio"
            label="Resolved"
            name="status"
            value="Resolved"
            checked={newComplaint.status === 'Resolved'}
            onChange={handleInputChange}
        />
    </div>
</Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={{ background: 'lightgrey', border: 'none', color: 'white', width: '45%' }}
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
                        border: 'none',
                        color: 'white',
                        width: '45%',
                    }}
                    onClick={handleFormSubmit}
                >
                    {isEditing ? 'Save Changes' : 'Add Complaint'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


const ViewComplaintModal = ({ showViewModal, setShowViewModal, viewComplaint }) => {
    return (
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>View Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {viewComplaint && (
                    <div className="d-flex flex-column text-center">
                        <div className="d-flex align-items-center text-center mb-3">
                            <img
                                src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                                alt="profile"
                                className="rounded-circle mr-3"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <div>
                                <h5 className="mb-1">{viewComplaint.name}</h5>
                                <small className="text-muted">Aug 5, 2024</small>
                            </div>
                        </div>
                        <div className="text-start w-100">
                            <p><strong>Request Name:</strong> {viewComplaint.complaint}</p>
                            <p><strong>Description:</strong> {viewComplaint.description}</p>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="text-center">
                                    <p><strong>Wing:</strong></p>
                                    <p>A</p>
                                </div>
                                <div className="text-center">
                                    <p><strong>Unit:</strong></p>
                                    <p>{viewComplaint.unit}</p>
                                </div>
                                <div className="text-center">
                                    <p><strong>Priority:</strong></p>
                                    <p>
                                        <span className={`badge bg-${viewComplaint.priority === 'High' ? 'danger' : viewComplaint.priority === 'Medium' ? 'primary' : 'success'}`}>
                                            {viewComplaint.priority}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p><strong>Status:</strong></p>
                                    <p>
                                        <span className={`badge bg-${viewComplaint.status === 'Pending' ? 'warning' : viewComplaint.status === 'Open' ? 'info' : 'success'}`}>
                                            {viewComplaint.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};


const DeleteComplaintModal = ({ showDeleteModal, setShowDeleteModal, handleConfirmDelete }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this complaint?</Modal.Body>
            <Modal.Footer>
                <Button style={{ background: "lightgrey", border: "none", color: "white", width: "45%" }} onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" style={{ width: "45%" }} onClick={handleConfirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { ComplaintModal, ViewComplaintModal, DeleteComplaintModal };
