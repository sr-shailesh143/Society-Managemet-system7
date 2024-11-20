import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from "react-icons/fa";

export default function ServiceComplain() {
    const location = useLocation();
    const [complaints, setComplaints] = useState([
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
        { title: "Unethical Behavior", date: "01/07/2024", status: "Open", description: "Regular waste collection services." },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newComplaint, setNewComplaint] = useState({ title: "", date: "", status: "Open", description: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComplaintIndex, setSelectedComplaintIndex] = useState(null);
    const naviget = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddComplaint = () => {
        setComplaints((prev) => [...prev, { ...newComplaint }]);
        setShowModal(false);
        setNewComplaint({ title: "", date: "", status: "Open", description: "" });
    };

    const handleOpenDeleteModal = (index) => {
        setSelectedComplaintIndex(index);
        setShowDeleteModal(true);
    };

    const handleDeleteComplaint = () => {
        setComplaints((prev) => prev.filter((_, index) => index !== selectedComplaintIndex));
        setShowDeleteModal(false);
        setSelectedComplaintIndex(null);
    };

    return (
        <div className='container-fluid'>
            {/* Navigation */}
            <div className='row'>
                <div className="d-flex ">
                    <div onClick={() => naviget("/ServiceComplain")} 
                        style={{ background: location.pathname === "/ServiceComplain" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/ServiceComplain" ? "white" : "black" }} 
                        className='b-btn d-flex justify-content-center'>
                        <p>Complaint Submission</p>
                    </div>
                    <div onClick={() => naviget("/RequestSubmission")} 
                        style={{ background: location.pathname === "/RequestSubmission" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/RequestSubmission" ? "white" : "black" }} 
                        className='b-btn d-flex justify-content-center'>
                        <p>Request Submission</p>
                    </div>
                </div>
            </div>

         
            <div className="complaints-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-weight-bold"style={{fontWeight:"bold"}}>Complaint</h4>
                    <button className="btn btn-danger custom-create-btn " onClick={() => setShowModal(true)}>
                        Create Complaint
                    </button>
                </div>

                <div className="row">
    {complaints.map((complaint, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
                <div className="card-header custom-card-header">
                    <h5 className="card-title mb-0">{complaint.title}</h5>
                    <div className="dropdown">
                        <button className="btn btn-sm text-white p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaEllipsisV size={16} />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button className="dropdown-item text-dark" onClick={() => handleOpenDeleteModal(index)}>
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text mb-2 d-flex justify-content-between">
                        <strong style={{ color: "#4F4F4F" }}>Complaint Date:</strong> 
                        <span style={{ color: "#202224", fontWeight: "bold" }}>{complaint.date}</span>
                    </p>
                                            <p className="card-text mb-2 d-flex justify-content-between">
                                                <strong style={{ color: "#4F4F4F" }}>Status:</strong> 
                                                <span
                        style={{
                            color:
                            complaint.status === "Pending"
                                ? "#6A4E02" 
                                : complaint.status === "Solved"
                                ? "#1B5E20" 
                                : "#202224", 
                            fontWeight: "bold",
                            background:
                            complaint.status === "Pending"
                                ? "#FFEB3B" 
                                : complaint.status === "Solved"
                                ? "rgba(76, 175, 80, 0.1)" 
                                : "#5678E91A", 
                            width:"60px",

                            textAlign: "center",
                            borderRadius: "30px",
                            
                        }}
                        >
                        {complaint.status}
                        </span>


                    </p>
                    <p className="card-text">
                        <strong style={{ color: "#4F4F4F" }}>Description:</strong> 
                        <p style={{ color: "#202224", fontWeight: "bold" }}>{complaint.description}</p>
                    </p>
                </div>
            </div>
        </div>
    ))}
</div>

            </div>

            {/* Create Complaint Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Complaint</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={newComplaint.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input type="date" className="form-control" name="date" value={newComplaint.date} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" value="Open" checked={newComplaint.status === "Open"} onChange={handleInputChange} />
                                            <label className="form-check-label">Open</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" value="Pending" checked={newComplaint.status === "Pending"} onChange={handleInputChange} />
                                            <label className="form-check-label">Pending</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" value="Solved" checked={newComplaint.status === "Solved"} onChange={handleInputChange} />
                                            <label className="form-check-label">Solved</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={newComplaint.description} onChange={handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-complaint" onClick={handleAddComplaint}>
                                    Add Complaint
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this complaint?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteComplaint}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
