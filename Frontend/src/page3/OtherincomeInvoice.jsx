import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PaymentModal from "./PaymentModal";

const OtherincomeInvoice = () => {
  const maintenanceData = [
    { EventName: "navratri", EventDueDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250 },
    { EventName: "navratri", EventDueDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250 },
    { EventName: "navratri", EventDueDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250 },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const navigate = useNavigate(); 
  const handlePayNowClick = (amount) => {
    setSelectedAmount(amount);
    setShowModal(true);
  };

  const handleViewInvoice = () => {
    navigate("/InvoicePage");
  };

  return (
    <div>
      <div className="due-maintenance mt-5 bg-white p-4" style={{ borderRadius: "15px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">Due Event Payment</h5>
          <button
            className="btn text-white"
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              border: "none",
            }}
            onClick={handleViewInvoice}
          >
            View Invoice
          </button>
        </div>
        <div className="d-flex flex-wrap gap-3">
          {maintenanceData.map((item, index) => (
            <div key={index} className="card shadow-sm border-0" style={{ width: "370px", height: "263px" }}>
              <div className="card-header text-white" style={{ backgroundColor: "#5678E9" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Due Event Payment</span>
                  <span className="badge" style={{ background: "rgba(255, 255, 255, 0.1)" }}>Pending</span>
                </div>
              </div>
              <div className="card-body">
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}>Event Name</strong>
                  <span style={{ color: "lightgrey" }}>{item.EventName}</span>
                </p>
                <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}>Event Due Date</strong>
                  <span style={{ color: "lightgrey" }}>{item.EventDueDate}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}> Amount</strong>
                  <span className="text-danger">₹{item.penaltyAmount.toFixed(2)}</span>
                </p>
                <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                <button
                  className="btn text-white w-100 m-2"
                  style={{
                    background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => handlePayNowClick(item.grandTotal)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PaymentModal show={showModal} handleClose={() => setShowModal(false)} amount={selectedAmount} />
    </div>
  );
};

export default OtherincomeInvoice;
