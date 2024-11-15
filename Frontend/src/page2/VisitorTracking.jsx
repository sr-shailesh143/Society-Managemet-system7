import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const VisitorTracking = () => {
  const [visitors, setVisitors] = useState([
    { name: "Evelyn Harper", phone: "97852 12369", date: "10/01/2024", unit: "A", number: "1001", time: "3:45 PM" },
    { name: "Wade Warren", phone: "97852 25893", date: "11/01/2024", unit: "B", number: "1002", time: "2:45 AM" },
    // Other visitors...
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    phone: '',
    date: '',
    unit: '',
    number: '',
    time: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVisitor = () => {
    setVisitors([...visitors, newVisitor]);
    setNewVisitor({ name: '', phone: '', date: '', unit: '', number: '', time: '' });
    handleCloseModal();
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Visitor Tracking</h3>
        <div className="d-flex align-items-center">
          <select className="form-select m-1" style={{ width: 'auto', minWidth: '100px', height: '44px', fontSize: '13px' }}>
            <option>Month</option>
            <option>Last week</option>
            <option>Last month</option>
            <option>Last Year</option>
          </select>
          <button className="btn me-2" onClick={handleShowModal} style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              color: "white",
              border: "none",
            }}
          >
            Add Visitor Detail
          </button>
        </div>
      </div>
      
      {/* Visitor table */}
      <div className="table-responsive">
        <table className="table table-borderless align-middle">
          <thead>
            <tr>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>Visitor Name</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Date</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Unit Number</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td className="d-flex align-items-center">
                  <img
                    src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
                    alt="visitor"
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                  <span>{visitor.name}</span>
                </td>
                <td>{visitor.phone}</td>
                <td>{visitor.date}</td>
                <td>
                  <span className="badge text-primary rounded-circle" style={{ background: "#F6F8FB", textAlign: "center" }}>
                    {visitor.unit}
                  </span> {visitor.number}
                </td>
                <td style={{
                  backgroundColor: "#E5ECFD",
                  color: "#4F4F4F",
                  width: "90px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  padding: "0px"
                }}>
                  {visitor.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Visitor Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Visitor Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVisitorName">
              <Form.Label>VisitorName</Form.Label>
              <Form.Control type="text" name="name" value={newVisitor.name} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Col md={6}>
              <Form.Group controlId="formVisitorPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" name="phone" value={newVisitor.phone} onChange={handleChange} />
            </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="formVisitorUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control type="text" name="unit" value={newVisitor.unit} onChange={handleChange} />
            </Form.Group>
              </Col>
            </Row>
          <Row>
            <Col md={6}>
            <Form.Group controlId="formVisitorDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={newVisitor.date} onChange={handleChange} />
            </Form.Group>

            </Col>
            <Col md={6}>
            <Form.Group controlId="formVisitorTime">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" value={newVisitor.time} onChange={handleChange} />
            </Form.Group>
            </Col>
          </Row>
           
          
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleCloseModal}style={{backgroundColor:"lightgrey",color:"white",border:"none",width:"45%"}}>Cancel</Button>
          <Button  onClick={handleAddVisitor}style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              color: "white",
              border: "none",
              width:"45%"
            }}>Add Visitor</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VisitorTracking;
