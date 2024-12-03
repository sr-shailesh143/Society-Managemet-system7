import React, { useState } from 'react';
import { createAlert } from '../apiservices/emergencyservice'; 
import { toast } from "react-toastify";  // Import ToastContainer and toast


export default function EmergencyManagement() {
  const [alert, setAlert] = useState({
    alertType: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await createAlert(alert);
      console.log("API Response:", response);
      setSuccessMessage("Alert created successfully!");
      toast.success("Alert created successfully!"); 
      setAlert({ alertType: "", description: "" }); 
    } catch (error) {
      console.error("Error creating alert:", error);
      setErrorMessage("Failed to create alert. Please try again.");
      toast.error("Failed to create alert. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ height: "85vh", alignItems: "center", overflow: "hidden" }}
      className="div d-flex justify-content-center"
    >
      <div className="alert-page">
        <div className="alert">
          <h2 className="alert-title">Alert</h2>

          <label className="alert-labal">
            Alert Type <span className="alert-univasel">*</span>
          </label>
          <select
            value={alert.alertType}
            onChange={(e) =>
              setAlert({ ...alert, alertType: e.target.value })
            }
            className="form-select input-text mt-1 input-style"
            required
          >
            <option value="">Select alert</option>
            <option value="Emergency">Emergency</option>
            <option value="Warning">Warning</option>
            <option value="Earth Quake">Earth Quake</option>
            <option value="High Winds">High Winds</option>
            <option value="Thunder">Thunder</option>
          </select>

          <label className="alert-labal mt-4 ms-1">
            Description <span className="alert-univasel">*</span>
          </label>
          <textarea
            value={alert.description}
            onChange={(e) =>
              setAlert({ ...alert, description: e.target.value })
            }
            className="form-control input-text input-style"
            cols={2}
            placeholder="Emergency description."
          />

         

          {/* Submit Button */}
          <button
            disabled={!alert.alertType || !alert.description || loading}
            className="mt-5 w-100 alert-send-btn"
            onClick={handleSubmit}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

     
    </div>
  );
}
