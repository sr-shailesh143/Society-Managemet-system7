import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import PaymentModal from './PaymentModal';
import { useNavigate } from "react-router-dom";
const MaintananceInvoice = () => {
  const navigate = useNavigate();
  const handleViewInvoice = () => {
    navigate("/InvoicePage");
  };
  const maintenanceData = [
    { billDate: "11/01/2024", pendingDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250 },
    { billDate: "11/01/2024", pendingDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250, },
    { billDate: "11/01/2024", pendingDate: "11/01/2024", maintenanceAmount: 1000, penaltyAmount: 250, grandTotal: 1250, },
  ];
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const handlePayNowClick = (amount) => {
    setSelectedAmount(amount);
    setShowModal(true);
  };
  return (
    <div>
      <div className="belence mt-3">
        <div className="setmaintenance">
          <h1 className="h-1 fw-bold" onClick={() => setShowsetmantenenc(true)}>
            Show Maintenance Details
          </h1>
        </div>
        <div className="totle-amount row d-flex">
          <div className="col-12 col-md-6">
            <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className="amount-card amount-card-pink"   >
              <div className="amount-box">
                <div className="amount-label">Maintenance Amount</div>
                <div className="amount-value">₹ 1500</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className="amount-card amount-card-red"   >
              <div className="amount-box">
                <div className="amount-label">Penalty Amount</div>
                <div className="amount-value-red">₹ 500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4 mt-4 bg-white" style={{ borderRadius: "15px" }}>
        {/* Pending Maintenance Section */}
        <div className="pending-maintenance mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold p-3">Pending Maintenance</h5>
            <button
              className="btn text-white p-3"
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
              <div key={index} className="card shadow-sm border-0" style={{ width: "370px", height: "325px" }}>
                <div className="card-header text-white" style={{ backgroundColor: "#5678E9" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Maintenance</span>
                    <span className="badge " style={{ background: "rgba(255, 255, 255, 0.1)", marginLeft: "170px" }}>Pending</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="d-flex justify-content-between">
                    <strong style={{ color: "#4F4F4F" }}>Bill Date</strong>
                    <span>{item.billDate}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong style={{ color: "#4F4F4F" }}>Pending Date</strong>
                    <span>{item.pendingDate}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong style={{ color: "#4F4F4F" }}>Maintenance Amount</strong>
                    <span className="text-danger">₹{item.maintenanceAmount.toFixed(2)}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong style={{ color: "#4F4F4F" }}>Maintenance Penalty Amount</strong>
                    <span className="text-danger">₹{item.penaltyAmount.toFixed(2)}</span>
                  </p>
                  <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                  <p className="d-flex justify-content-between">
                    <strong style={{ color: "#4F4F4F" }}>Grand Total</strong>
                    <span className="text-success">₹{item.grandTotal}</span>
                  </p>
                  <button className="btn text-white w-100 p-2" style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white", }} onClick={() => handlePayNowClick(item.grandTotal)}>
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="due-maintenance mt-5 bg-white p-4" style={{ borderRadius: "15px" }}>
        <h5 className="mb-3 fw-bold p-3">Due Maintenance</h5>
        <div className="d-flex flex-wrap gap-3">
          {maintenanceData.map((item, index) => (
            <div key={index} className="carad shadow-sm border-0" style={{ width: "370px", height: "263px" }}>
              <div className="card-header text-white" style={{ backgroundColor: "#5678E9" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Maintenance</span>
                  <span className="badge" style={{ background: "rgba(255, 255, 255, 0.1)", marginLeft: "170px" }}>Pending</span>
                </div>
              </div>
              <div className="card-body">
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}>Date</strong>
                  <span>{item.billDate}</span>
                </p>
                <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}>Amount</strong>
                  <span className="text-danger">₹{item.maintenanceAmount.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <strong style={{ color: "#4F4F4F" }}>Due Maintenance Amount</strong>
                  <span className="text-danger">₹{item.penaltyAmount.toFixed(2)}</span>
                </p>
                <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                <button className="btn text-white w-100 m-2 p-2" style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white" }} onClick={() => handlePayNowClick(item.grandTotal)}>
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

export default MaintananceInvoice;
