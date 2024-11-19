import React from "react";
import "../index.css";
import { FaEllipsisV } from "react-icons/fa"; 

const complaints = [
    {
        title: "Unethical Behavior",
        date: "01/07/2024",
        status: "Open",
        description: "Regular waste collection services.",
    },
    {
        title: "Preventive Measures",
        date: "01/07/2024",
        status: "Open",
        description: "Expenses will way sense for you.",
    },
    {
        title: "Unethical Behavior",
        date: "01/07/2024",
        status: "Open",
        description: "Providing information deliberately.",
    },
    {
        title: "Preventive Measures",
        date: "01/07/2024",
        status: "Open",
        description: "Regular waste collection services.",
    },
    {
        title: "Preventive Measures",
        date: "01/07/2024",
        status: "Open",
        description: "Regular waste collection services.",
    },
    {
        title: "Preventive Measures",
        date: "01/07/2024",
        status: "Open",
        description: "Regular waste collection services.",
    },
];

const ServiceComplain = () => {
    return (
        <div className="container-fluid">
            {/* Tabs */}
            <ul className="nav nav-tabs custom-nav-tabs">
                {/* Complaint Submission Button */}
                <li className="nav-item">
                    <a className="nav-link active custom-nav-link" href="#">
                        Complaint Submission
                    </a>
                </li>
                <li className="nav-item request custom-request-item">
                    <a className="nav-link custom-nav-link text-black" href="#">
                        Request Submission
                    </a>
                </li>
            </ul>

            <div className="complaints-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Complaint</h4>
                    <button className="btn btn-danger custom-create-btn">Create Complaint</button>
                </div>

                <div className="row">
                    {complaints.map((complaint, index) => (
                        <div className="col-md-3 col-lg-3 mb-4" key={index}>
                            <div className="card h-100 shadow-sm border-light border">
                                <div className="card-header custom-card-header">
                                    <h5 className="card-title mb-0">{complaint.title}</h5>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm text-white p-0"
                                            type="button"
                                            id={`dropdownMenuButton-${index}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ background: "none", border: "none" }}
                                        >
                                            <FaEllipsisV size={16} />
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                            <li>
                                                <button className="dropdown-item text-danger">
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <p className="card-text mb-2">
                                        <strong>Request Date:</strong> <span>{complaint.date}</span>
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Status:</strong> <span>{complaint.status}</span>
                                    </p>
                                    <p className="card-text">
                                        <strong>Description:</strong> {complaint.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceComplain;
