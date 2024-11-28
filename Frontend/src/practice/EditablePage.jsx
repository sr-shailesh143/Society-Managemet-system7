import React, { useState } from 'react';

const EditablePage = () => {
  const [priority, setPriority] = useState("Medium"); // Default selection
  const [status, setStatus] = useState("Open"); // Default selection

  // Priority options
  const priorityOptions = ["High", "Medium", "Low"];
  // Status options
  const statusOptions = ["Open", "Pending", "Solve"];

  const getButtonStyles = (isSelected) => ({
    border: isSelected ? "2px solid orange" : "1px solid #ccc",
    borderRadius: "20px",
    padding: "5px 15px",
    margin: "0 10px",
    color: isSelected ? "orange" : "black",
    cursor: "pointer",
    fontWeight: isSelected ? "bold" : "normal",
    display: "inline-block",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Editable Radio Buttons</h2>

      {/* Priority Section */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>Priority</strong>
        </label>
        {priorityOptions.map((option) => (
          <span
            key={option}
            style={getButtonStyles(option === priority)}
            onClick={() => setPriority(option)}
          >
            {option}
          </span>
        ))}
      </div>

      {/* Status Section */}
      <div>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>Status</strong>
        </label>
        {statusOptions.map((option) => (
          <input
          type="radio"
            key={option}
            style={getButtonStyles(option === status)}
            onChange={() => setStatus(option)}
            value={status}
          />
            
          
        ))}
      </div>
    </div>
  );
};

export default EditablePage;
