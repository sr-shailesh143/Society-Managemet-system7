import React, { useState } from 'react';

const EditablePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const complaint = {
    name: "Evelyn Harper",
    date: "Aug 5, 2024",
    image: "https://via.placeholder.com/50", // Replace with user image URL
    requestName: "Unethical Behavior",
    description: "Offering, giving, receiving, or soliciting of value to influence the actions of an.",
    wing: "A",
    unit: "1002",
    priority: "High",
    status: "Open",
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>View Complaint</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <div className="modal-body">
          {/* User Info */}
          <div className="user-info">
            <img src={complaint.image} alt={complaint.name} className="user-avatar" />
            <div className="user-details">
              <h4>{complaint.name}</h4>
              <p>{complaint.date}</p>
            </div>
          </div>

          {/* Request Details */}
          <div className="request-details">
            <p><strong>Request Name:</strong> {complaint.requestName}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <div>
              <p>Wing</p>
              <span className="info-tag">{complaint.wing}</span>
            </div>
            <div>
              <p>Unit</p>
              <span className="info-tag">{complaint.unit}</span>
            </div>
            <div>
              <p>Priority</p>
              <span className="info-badge priority">{complaint.priority}</span>
            </div>
            <div>
              <p>Status</p>
              <span className="info-badge status">{complaint.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditablePage;
