import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCcMastercard, FaCcVisa, FaMoneyBillAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
const PaymentModal = ({ show, handleClose, amount }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const handleProceed = () => {
    if (selectedMethod === "cash") {
      toast.success("Payment method selected: Cash Payment. Transaction successful.");
      handleClose();
    } else if (selectedMethod === "mastercard" || selectedMethod === "visacard") {
      setShowPaymentDetailsModal(true);
      handleClose();
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
          
              <Form.Check
                className="bg-white shadow m-2 px-3 py-2 d-flex align-items-center align-middle"
                style={{ width: "300px", borderRadius: "8px", textAlign: "center", alignItems: "center" }}
                type="radio"
                id="mastercard"
                name="paymentMethod"
                value="mastercard"
                checked={selectedMethod === "mastercard"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                label={
                  <div className="d-flex align-items-center w-100">
                    <FaCcMastercard className="me-2" color="#f79e1b" size={20} />
                    Master Card
                  </div>
                }
              />
          
              <Form.Check
                className="bg-white shadow m-2 px-3 py-2 d-flex align-items-center align-middle"
                style={{ width: "300px", borderRadius: "8px" }}
                type="radio"
                id="visacard"
                name="paymentMethod"
                value="visacard"
                checked={selectedMethod === "visacard"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                label={
                  <div className="d-flex align-items-center w-100">
                    <FaCcVisa className="me-2 align-middle" color="#1a1f71" size={20} />
                    Visa Card
                  </div>
                }
              />
            
              <Form.Check
                className="bg-white shadow m-2 px-3 py-2 d-flex align-items-center align-middle"
                style={{ width: "300px", borderRadius: "8px" }}
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={selectedMethod === "cash"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                label={
                  <div className="d-flex align-items-center w-100">
                    <FaMoneyBillAlt className="me-2 align-middle" color="#28a745" size={20} />
                    Cash Payment
                  </div>
                }
              />
            </div>
        
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ width: "45%", background: "lightgrey", border: "none", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "45%",
                  background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                  border: "none",
                  color: "white",
                }}
                variant="primary"
                disabled={!selectedMethod}
                onClick={handleProceed}
              >
                Pay Now
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      {showPaymentDetailsModal && (
        <Modal show={showPaymentDetailsModal} onHide={() => setShowPaymentDetailsModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="cardName">
                <Form.Label className="text-dark fw-bold">Card Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="Enter Card Name" required />
              </Form.Group>
              <Form.Group controlId="cardNumber">
                <Form.Label className="text-dark fw-bold">Card Number <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" placeholder="Enter Card Number" required />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group controlId="expiryDate" style={{ width: "48%" }}>
                  <Form.Label className="text-dark fw-bold">Expiry Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" placeholder="MM/YY" required />
                </Form.Group>

                <Form.Group controlId="cvv" style={{ width: "48%" }}>
                  <Form.Label className="text-dark fw-bold">CVV <span className="text-danger">*</span></Form.Label>
                  <Form.Control  placeholder="Enter CVV" required />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-between" style={{ marginTop: "20px" }}>
                <Button
                  variant="secondary"
                  onClick={() => setShowPaymentDetailsModal(false)}
                  style={{
                    width: "45%",
                    background: "lightgrey",
                    border: "none",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    width: "45%",
                    background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                    border: "none",
                    color: "white",
                  }}
                  variant="primary"
                  onClick={() => {
                    toast.success("Payment processed successfully!");
                    setShowPaymentDetailsModal(false);
                  }}
                >
                  Pay Now
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default PaymentModal;
