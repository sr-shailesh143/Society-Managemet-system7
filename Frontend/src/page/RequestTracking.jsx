import React, { useState } from 'react';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import '../index.css';
import { ComplaintModal, ViewComplaintModal, DeleteComplaintModal } from './modals';

const RequestTracking = () => {
    const [complaints, setComplaints] = useState([
        { id: 1, name: 'John Doe', complaint: 'Unethical Behavior', description: 'Providing false information or deliberately misleading.', unit: '1001', priority: 'Medium', status: 'Pending', date: '2024/11/01' },
        { id: 2, name: 'Jane Doe', complaint: 'Preventive Measures', description: 'Regular waste collection services are overdue.', unit: '1002', priority: 'Low', status: 'Open', date: '2024/11/05' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentComplaintId, setCurrentComplaintId] = useState(null);
    const [newComplaint, setNewComplaint] = useState({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleViewClick = (complaint) => {
        setViewComplaint(complaint);
        setShowViewModal(true);
    };

    const getRandomDescription = () => {
        const descriptions = [
            'Providing false information or deliberately misleading.',
            'Regular waste collection services are overdue.',
            'Delay in processing maintenance requests.',
            'Unresolved electrical issues in the apartment.',
            'Poor response time to service calls.',
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    };

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
            setComplaints([
                ...complaints,
                { ...newComplaint, description: getRandomDescription(), id: complaints.length + 1 },
            ]);
        }
        setShowModal(false);
        resetForm();
    };

    const handleEditClick = (complaint) => {
        setCurrentComplaintId(complaint.id);
        setNewComplaint({ ...complaint });
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

    const resetForm = () => {
        setNewComplaint({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
        setIsEditing(false);
        setCurrentComplaintId(null);
    };

    const getRandomWing = () => {
        const wings = ['A', 'B', 'C', 'D'];
        return wings[Math.floor(Math.random() * wings.length)];
    };

    return (
        <div className="container-fluid bg-white p-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Request Tracking</h2>
                <button
                    className="btn"
                    style={{
                        background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
                        border: 'none',
                        color: 'white',
                    }}
                    onClick={() => {
                        setShowModal(true);
                        resetForm();
                    }}
                >
                    Create Request
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th style={{ textAlign: 'center' }}>Requester Name</th>
                            <th style={{ textAlign: 'center' }}>Request Name</th>
                            <th style={{ textAlign: 'center' }}>Description</th>
                            <th style={{ textAlign: 'center' }}>Date</th>
                            <th style={{ textAlign: 'center' }}>Unit Number</th>
                            <th style={{ textAlign: 'center' }}>Priority</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.id}>
                                <td style={{ textAlign: 'center' }}>
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Profile"
                                        className="rounded-circle me-2"
                                        width="40"
                                        height="40"
                                    />
                                    {complaint.name}
                                </td>
                                <td style={{ textAlign: 'center' }}>{complaint.complaint}</td>
                                <td style={{ textAlign: 'center' }}>{complaint.description}</td>
                                <td style={{ textAlign: 'center' }}>{complaint.date}</td>
                                <td style={{ textAlign: 'center' }}>{`${getRandomWing()}-${complaint.unit}`}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <span
                                        className="badge"
                                        style={{
                                            borderRadius: '15px',
                                            padding: '5px 10px',
                                            backgroundColor:
                                                complaint.priority === 'High'
                                                    ? 'red'
                                                    : complaint.priority === 'Medium'
                                                    ? '#5678E9'
                                                    : '#39973D',
                                            color: 'white',
                                        }}
                                    >
                                        {complaint.priority}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <span
                                        className="badge"
                                        style={{
                                            borderRadius: '15px',
                                            padding: '5px 10px',
                                            backgroundColor:
                                                complaint.status === 'Pending'
                                                    ? 'rgba(255, 195, 19, 0.1)'
                                                    : complaint.status === 'Open'
                                                    ? 'rgba(86, 120, 233, 0.1)'
                                                    : 'rgba(57, 151, 61, 0.1)',
                                            color:
                                                complaint.status === 'Pending'
                                                    ? 'rgb(255, 195, 19)'
                                                    : complaint.status === 'Open'
                                                    ? 'rgb(86, 120, 233)'
                                                    : 'rgb(57, 151, 61)',
                                        }}
                                    >
                                        {complaint.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn btn-link" onClick={() => handleViewClick(complaint)}>
                                        <FaEye />
                                    </button>
                                    <button className="btn btn-link text-success" onClick={() => handleEditClick(complaint)}>
                                        <FaPen />
                                    </button>
                                    <button className="btn btn-link text-danger" onClick={() => handleDeleteClick(complaint.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <ComplaintModal
                showModal={showModal}
                setShowModal={setShowModal}
                isEditing={isEditing}
                newComplaint={newComplaint}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
            />
            <ViewComplaintModal
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                viewComplaint={viewComplaint}
            />
            <DeleteComplaintModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
};

export default RequestTracking;
