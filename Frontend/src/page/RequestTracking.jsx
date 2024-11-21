import React, { useState } from 'react';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import '../index.css';
import { ComplaintModal, ViewComplaintModal, DeleteComplaintModal } from './modals';
const RequestTracking = () => {
    const [complaints, setComplaints] = useState([
        { id: 1, name: 'cd ', complaint: 'Unethical Behavior', description: 'Providing false information or deliberately.', unit: '1001', priority: 'Medium', status: 'Pending', date: '2024/11/01' },
        { id: 2, name: 'cd ', complaint: 'Preventive Measures', description: 'Regular waste collection services.', unit: '1002', priority: 'Low', status: 'Open', date: '2024/11/05' },
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
            'Providing false information or deliberately misleading others.',
            'Regular waste collection services not being adhered to.',
            'Delay in processing maintenance requests.',
            'Unresolved electrical issues in the apartment.',
            'Poor response time to service calls.'
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
            setComplaints([...complaints, { ...newComplaint, description: getRandomDescription(), id: complaints.length + 1 }]);
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



    const getRandomWing = () => {
        const wings = ['A', 'B', 'C', 'D'];
        return wings[Math.floor(Math.random() * wings.length)];
    };

    return (
        <div className="container-fluid bg-white p-3 " style={{ borderRadius: "15px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Create Request</h2>
                <button className="btn" style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: 'none', color: 'white' }} onClick={() => {
                    setIsEditing(false);
                    setShowModal(true);
                    setNewComplaint({ name: '', complaint: '', description: '', unit: '', priority: 'Medium', status: 'Pending' });
                }}>
                    Create Request
                </button>
            </div>
            <div className="table-responsive">
                <table className="table  table-hover">
                    <thead className="table-light">
                        <tr>
                            <th style={{ border: "none", borderRadius: "15px 0px 0px 0px ", backgroundColor: "#C9D4F8", textAlign: "center" }}>Requester Name</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Request Name</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Description</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Date</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Unit Number</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Priority</th>
                            <th style={{ border: "none", backgroundColor: "#C9D4F8", textAlign: "center" }}>Status</th>
                            <th style={{ border: "none", borderRadius: " 0px 15px 0px 0px", backgroundColor: "#C9D4F8", textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bordered'>
                        {complaints.map((complaint, index) => (
                            <tr key={complaint.id}>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center", color: "#4F4F4F" }}>
                                    <img
                                        src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
                                        alt="Profile"
                                        className="rounded-circle me-2"
                                        width="40"
                                        height="40" />
                                    {complaint.name}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center", color: "#4F4F4F" }}>{complaint.complaint}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center", color: "#4F4F4F" }}>{complaint.description}</td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center", color: "#4F4F4F" }}>
                                    {complaint.date}
                                </td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center", color: "#4F4F4F" }}>
                                    <span className="wing-badge">{getRandomWing()}</span>
                                    {complaint.unit}
                                </td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <span
                                        className={`badge`}
                                        style={{
                                            borderRadius: "15px",
                                            width: "60px",
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
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <span
                                        className="badge"
                                        style={{
                                            borderRadius: "15px", width: "60px", backgroundColor: complaint.status === 'Pending' ? 'rgba(255, 195, 19, 0.1)' : complaint.status === 'Open' ? 'rgba(86, 120, 233, 0.1)' : 'rgba(57, 151, 61, 0.1)',
                                            color:
                                                complaint.status === 'Pending'
                                                    ? 'rgb(255, 195, 19)'
                                                    : complaint.status === 'Open'
                                                        ? 'rgb(86, 120, 233)'
                                                        : 'rgb(57, 151, 61)',
                                            padding: '5px 10px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {complaint.status}
                                    </span>
                                </td>
                                <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                                    <button className="btn btn-link " onClick={() => handleViewClick(complaint)}>
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
