import React, { useState } from 'react';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import '../index.css'
const RequestTracking = () => {
    const [complaints, setComplaints] = useState([
        { id: 1, name: 'Evelyn Harper', complaint: 'Unethical Behavior', description: 'Providing false information or deliberately.', unit: '1001', priority: 'Medium', status: 'Pending' },
        { id: 2, name: 'Esther Howard', complaint: 'Preventive Measures', description: 'Regular waste collection services.', unit: '1002', priority: 'Low', status: 'Open' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);
    const [currentComplaintId, setCurrentComplaintId] = useState(null);
    const [newComplaint, setNewComplaint] = useState({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
    const [viewComplaint, setViewComplaint] = useState(null); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint({ ...newComplaint, [name]: value });
    };
    const handleFormSubmit = () => {
        if (isEditing) {
            setComplaints(
                complaints.map((complaint) =>
                    complaint.id === currentComplaintId ? { ...complaint, ...newComplaint } : complaint
                )
            );
        } else {
            setComplaints([...complaints, { ...newComplaint, id: complaints.length + 1 }]);
        }
        setShowModal(false);
        setNewComplaint({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
        setIsEditing(false);
        setCurrentComplaintId(null);
    };
    const handleEditClick = (complaint) => {
        setCurrentComplaintId(complaint.id);
        setNewComplaint({
            name: complaint.name,
            complaint: complaint.complaint,
            description: complaint.description,
            unit: complaint.unit,
            priority: complaint.priority,
            status: complaint.status,
        });
        setIsEditing(true);
        setShowModal(true);
    };
    const handleDeleteClick = (complaintId) => {
        setCurrentComplaintId(complaintId);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
        setComplaints(complaints.filter((complaint) => complaint.id !== currentComplaintId));
        setShowDeleteModal(false);
    };
    const handleViewClick = (complaint) => {
        setViewComplaint(complaint); // Set the data for the view modal
        setShowViewModal(true); // Show the View Modal
    };
    return (
        <div className="container-fluid bg-white p-3 "style={{borderRadius:"15px"}}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Complaint List</h2>
                <button className="btn" style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white' }} onClick={() => {
                    setIsEditing(false);
                    setShowModal(true);
                    setNewComplaint({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
                }}>
                    Create Complaint
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                        
                            <th style={{ border: "none", borderRadius: "15px 0px 0px 0px ", backgroundColor: "#C9D4F8", textAlign: "center" }}>Complainer Name</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Complaint Name</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Description</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Unit Number</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Priority</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Status</th>
                            <th style={{ border: "none", borderRadius: " 0px 15px 0px 0px", backgroundColor: "#C9D4F8", textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={complaint.id}>
                               
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                <img
                          src= "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
                          alt="Profile"
                          className="rounded-circle me-2"
                          width="40"
                          height="40" />
                                    {complaint.name}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{complaint.complaint}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{complaint.description}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{complaint.unit}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <span className={`badge ${complaint.priority === 'High' ? 'bg-danger' : complaint.priority === 'Medium' ? 'bg-primary' : 'bg-success'}`}>{complaint.priority}</span>
                                </td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <span  className={`badge ${complaint.status === 'Pending' ? 'bg-blanched-almond' : complaint.status === 'Open' ? 'bg-powder-blue' : 'powder-green-bgx`'}`}>{complaint.status}</span>
                                </td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <button className="btn btn-sm me-2" onClick={() => handleEditClick(complaint)}>
                                        <FaPen style={{ color: 'green', background: 'lightgrey', padding: '5px', fontSize: '25px' }} />
                                    </button>
                                    <button className="btn btn-sm me-2" onClick={() => handleViewClick(complaint)}>
                                        <FaEye style={{ color: 'blue', background: 'lightgrey', padding: '5px', fontSize: '25px' }} />
                                    </button>
                                    <button className="btn btn-sm" onClick={() => handleDeleteClick(complaint.id)}>
                                        <FaTrash style={{ color: 'red', background: 'lightgrey', padding: '5px', fontSize: '25px' }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal for Adding/Editing Complaint */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header >
                    <Modal.Title>{isEditing ? 'Edit Complaint' : 'Create Complaint'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Complainer Name</Form.Label>
                            <Form.Control type="text" name="name" value={newComplaint.name} onChange={handleInputChange} placeholder="Enter complainer name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Complaint Name</Form.Label>
                            <Form.Control type="text" name="complaint" value={newComplaint.complaint} onChange={handleInputChange} placeholder="Enter complaint name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={newComplaint.description} onChange={handleInputChange} placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Unit Number</Form.Label>
                            <Form.Control type="text" name="unit" value={newComplaint.unit} onChange={handleInputChange} placeholder="Enter unit number" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <div>
                                <Form.Check inline type="radio" label="Low" name="priority" value="Low" checked={newComplaint.priority === 'Low'} onChange={handleInputChange} />
                                <Form.Check inline type="radio" label="Medium" name="priority" value="Medium" checked={newComplaint.priority === 'Medium'} onChange={handleInputChange} />
                                <Form.Check inline type="radio" label="High" name="priority" value="High" checked={newComplaint.priority === 'High'} onChange={handleInputChange} />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <div>
                                <Form.Check inline type="radio" label="Pending" name="status" value="Pending" checked={newComplaint.status === 'Pending'} onChange={handleInputChange} />
                                <Form.Check inline type="radio" label="Open" name="status" value="Open" checked={newComplaint.status === 'Open'} onChange={handleInputChange} />
                                <Form.Check inline type="radio" label="Resolved" name="status" value="Resolved" checked={newComplaint.status === 'Resolved'} onChange={handleInputChange} />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ background: "lightgrey", border: "none", color: "white", width: "45%" }} onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white', width: "45%" }} onClick={handleFormSubmit}>
                        {isEditing ? 'Save Changes' : 'Add Complaint'}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal for Viewing Complaint */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>View Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewComplaint && (
                        <div className="d-flex flex-column  text-center">
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

                                {/* Flexbox for Wing, Unit, Priority, and Status in one row */}
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
            {/* Modal for Confirming Deletion */}
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
        </div>
    );
};

export default RequestTracking;
