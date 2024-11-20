import React, { useState } from 'react';
import {
  Container, Row, Col, Card, ListGroup, Badge, Button, Table,
  Modal, Form
} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTrash, FaEdit, FaPlus, FaEye } from 'react-icons/fa';
import '../index.css'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Dashboard = () => {
  const [showEditNumberModal, setShowEditNumberModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [editedNumber, setEditedNumber] = useState({ name: '', phone: '', work: '' });

  const [showDeleteNumberModal, setShowDeleteNumberModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const handleDeleteeShow = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };
  const handleShowDeleteNumberModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteNumberModal(true);
  };
  const handleDeleteNumber = () => {
    if (deleteIndex !== null) {
      setImportantNumbers(importantNumbers.filter((_, index) => index !== deleteIndex));
      setShowDeleteNumberModal(false);
    }
  };
  const [showEditComplaintModal, setShowEditComplaintModal] = useState(false);
  const [showViewComplaintModal, setShowViewComplaintModal] = useState(false);
  const [showAddNumberModal, setShowAddNumberModal] = useState(false);
  const [importantNumbers, setImportantNumbers] = useState([
    { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber', isEditing: false },
    { name: 'Hanna ', phone: '+91 99587 33657', work: 'Plumber', isEditing: false },
    { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber', isEditing: false },
    { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber', isEditing: false }
  ]);
  const handleShowAddNumberModal = () => {
    setEditedNumber({ name: '', phone: '', work: '' });
    setShowAddNumberModal(true);
  };
  const handleAddNumber = () => {
    if (!editedNumber.name || !editedNumber.phone || !editedNumber.work) return;
    setImportantNumbers([...importantNumbers, { ...editedNumber, isEditing: false }]);
    setEditedNumber({ name: '', phone: '', work: '' });
    setShowAddNumberModal(false);
  };
  const handleShowEditNumberModal = (number) => {
    setSelectedNumber(number);
    setEditedNumber(number);
    setShowEditNumberModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNumber({ ...editedNumber, [name]: value });
  };
  const handleEditNumber = () => {
    if (!editedNumber.name || !editedNumber.phone || !editedNumber.work) return;
    setImportantNumbers(importantNumbers.map((item) =>
      item.phone === selectedNumber.phone ? { ...editedNumber } : item
    ));
    setShowEditNumberModal(false);
  };
  const [complaints, setComplaints] = useState([
    { id: 1, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Medium', status: 'Open' },
    { id: 2, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Medium', status: 'Open' }

  ]);
  const [pendingMaintenances, setPendingMaintenances] = useState([
    { name: 'Elevator Repair', status: 'Pending', amount: '₹1,500' },
    { name: 'Water Leakage Fix', status: 'In Progress', amount: '₹3,000' },
    { name: 'Pool Maintenance', status: 'Pending', amount: '₹2,000' }
  ]);
  const [activities, setActivities] = useState([
    { event: 'Community Meeting', date: '2024-11-20', time: '10:00 AM' },
    { event: 'Maintenance Check', date: '2024-11-21', time: '2:00 PM' },
    { event: 'Festival Celebration', date: '2024-11-22', time: '6:00 PM' }
  ]);

  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#4e73df', '#1cc88a', '#36b9cc'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleCloseModal = () => {
    setShowAddNumberModal(false);
    setShowEditNumberModal(false);
    setShowDeleteNumberModal(false);
    setShowEditComplaintModal(false);
    setShowViewComplaintModal(false);
    setShowDeleteModal(false);
  };
  const handleCloseViewComplaintModal = () => {
    setShowViewComplaintModal(false);
  };
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleShowViewComplaintModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewComplaintModal(true);
  };

  const handleShowEditComplaintModal = (complaint) => {
    setCurrentComplaint(complaint);
    setShowEditComplaintModal(true);
  };

  const handleEditComplaint = () => {
    setComplaints(complaints.map((complaint) =>
      complaint.id === currentComplaint.id ? currentComplaint : complaint
    ));
    setShowEditComplaintModal(false);
  };

  const handleShowDeleteModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDeleteModal(true);
  };
  const confirmDeleete = () => {
    if (selectedComplaint && selectedComplaint.id) {
      setComplaints(complaints.filter((complaint) => complaint.id !== selectedComplaint.id));
      setShowDeleteModal(false);
    }
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Total Balance',
      data: [5000, 10000, 15000, 20000, 30000, 25000, 32000, 40000, 45000, 50000, 55000, 60000],
      borderColor: '#4e73df',
      backgroundColor: 'rgba(78, 115, 223, 0.1)',
      tension: 0.4,
    }]
  };
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center balance-card balance-card-orange" style={{ borderRadius: "15px" }}>
            <Card.Body style={{ padding: "0" }}>
              <div
                className="card-body-content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}  >
                <div style={{ marginRight: "100px",fontWeight:"bold" }}>
                  Total Balance<br />
                  <h6 style={{fontWeight:"bold"}}>₹ 2,22,520</h6>
                </div>
                <img
                  src='src/assets/button1.png'
                  alt="Button"
                  style={{ maxWidth: "50px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center balance-card balance-card-green" style={{ borderRadius: "15px" }}>
            <Card.Body style={{ padding: "0" }}>
              <div
                className="card-body-content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} >
                <div style={{ marginRight: "100px",fontWeight:"bold" }}>
                  Total Balance<br />
                  <h6 style={{fontWeight:"bold"}}>₹ 2,22,520</h6>
                </div>
                <img
                  src='src/assets/button2.png'
                  alt="Button"
                  style={{ maxWidth: "50px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center balance-card balance-card-blue" style={{ borderRadius: "15px" }}>
            <Card.Body style={{ padding: "0" }}>
              <div
                className="card-body-content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} >
                <div style={{ marginRight: "100px",fontWeight:"bold" }}>
                  Total Balance<br />
                  <h6 style={{fontWeight:"bold"}}>₹ 2,22,520</h6>
                </div>
                <img
                  src='src/assets/button3.png'
                  alt="Button"
                  style={{ maxWidth: "50px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center balance-card balance-card-pink" style={{ borderRadius: "15px" }}>
            <Card.Body style={{ padding: "0" }}>
              <div
                className="card-body-content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginRight: "100px",fontWeight:"bold" }}>
                  Total Balance<br />
                  <h6 style={{fontWeight:"bold"}}>₹ 2,22,520</h6>
                </div>
                <img
                  src='src/assets/button4.png'
                  alt="Button"
                  style={{ maxWidth: "50px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Card className="mb-4" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title>Total Balance</Card.Title>
                <select id="dropdown-basic-button" title="select month" style={{ border: "1px solid grey", borderRadius: "5px" }} className='p-1' size="sm">
                  <option href="#action1">Last Year</option>
                  <option href="#action2">Last Week</option>
                  <option href="#action3">Last Month</option>
                </select>
              </div>
              <Line data={chartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card className="mb-4" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3 ">
                <Card.Title>Important Numbers</Card.Title>
                <Button
                  style={{
                    background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                    border: "none",
                    color: "white"
                  }}
                  size="sm" onClick={handleShowAddNumberModal}>
                  <FaPlus className="me-1" />
                  Add
                </Button>
              </div>
              <ListGroup variant="flush" className="scrollable-list">
                {importantNumbers.map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      {item.isEditing ? (
                        <>
                          <Form.Control
                            type="text"
                            name="name"
                            value={item.name}
                            onChange={(e) => handleInputChange(e, index)}
                            className="mb-2"
                          />
                          <Form.Control
                            type="text"
                            name="phone"
                            value={item.phone}
                            onChange={(e) => handleInputChange(e, index)}
                            className="mb-2"
                          />
                          <Form.Control
                            type="text"
                            name="work"
                            value={item.work}
                            onChange={(e) => handleInputChange(e, index)}
                            className="mb-2" />  </>
                      ) : (
                        <>
                          <div style={{ color: "grey" }}><strong style={{ color: "black" }}>Name:</strong> {item.name}</div>
                          <div style={{ color: "grey" }}><strong style={{ color: "black" }}>Phone:</strong> {item.phone}</div>
                          <div style={{ color: "grey" }}><strong style={{ color: "black" }}>Work:</strong> {item.work}</div>
                        </>
                      )}
                    </div>
                    <div className="d-flex">
                      <Button style={{border:"none"}} size="sm" className="me-1  bg-danger" onClick={() => handleShowDeleteNumberModal(index)}>
                        <FaTrash />
                      </Button>
                      <Button variant="success" size="sm" onClick={() => handleShowEditNumberModal(item)}>
                        <FaEdit />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          {/* Edit Important Number Modal */}
          <Modal show={showEditNumberModal} onHide={() => setShowEditNumberModal(false)}>
            <Modal.Header  >
              <Modal.Title>Edit Important Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={editedNumber.name}
                    onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={editedNumber.phone}
                    onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formWork">
                  <Form.Label>Work</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter work type"
                    name="work"
                    value={editedNumber.work}
                    onChange={handleInputChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{background:"lightgrey",color:"white",border:"none",width:"45%"}} onClick={() => setShowEditNumberModal(false)}>
                Cancel
              </Button>
              <Button  style={{
                    background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                    border: "none",
                    color: "white",
                    width:"45%"
                  }} onClick={handleEditNumber}>
                Save 
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteNumberModal} onHide={() => setShowDeleteNumberModal(false)}>
            <Modal.Header >
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this important number?
            </Modal.Body>
            <Modal.Footer>
              <Button style={{background:"lightgrey",color:"white",border:"none",width:"45%"}} onClick={() => setShowDeleteNumberModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" style={{width:"45%"}} onClick={handleDeleteNumber}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs={12} md={3} style={{ height: '410px' }}>
          <Card className="mb-4 h-100" style={{ borderRadius: "15px" }}>
            <Card.Body >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title>Pending Maintenances</Card.Title>
                <Button variant="link" className="text-primary p-0"style={{textDecoration:"none"}}>View all</Button>
              </div>
              <ListGroup variant="flush" style={{ maxHeight: 'calc(100% - 60px)', overflowY: 'auto' }}>
                {pendingMaintenances.map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src="https://media.gettyimages.com/id/1017798538/photo/beverly-hills-ca-cody-christian-of-cws-all-american-poses-for-a-portrait-during-the-2018.jpg?s=612x612&w=gi&k=20&c=nrcCUAW-xshfD9d0EIzxe6vbhoWU1RYOoXbGpAPi3_I="
                        alt="Profile"
                        className="rounded-circle me-2"
                        width="40"
                        height="40" />
                      <div>
                        <div><strong>{item.name}</strong></div>
                        <div className="text-muted">{item.status}</div>
                      </div>
                    </div>
                    <p style={{ fontWeight: "bold", color: "red" }}>{item.amount}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* Complaint List */}
        <Col xs={12} md={12} lg={9}>
          <Card className="mb-4" style={{ borderRadius: "15px" }} >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center m-2" style={{ borderRadius: "15px" }}>
                <Card.Title>Complaint List</Card.Title>
                <select
                  id="dropdown-basic-button"
                  title="Select Month"
                  style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "14px",
                  }}
                  className="p-1" >
                  <option value="lastYear">Last Year</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                </select>
              </div>
              <Table responsive striped  hover className="complaint-table">
                <thead>
                  <tr >
                    <th style={{ border: "none", borderRadius: "15px 0px 0px 0px ", backgroundColor: "#E5ECFD", textAlign: "center" }}>Complainer Name</th>
                    <th style={{ border: "none", backgroundColor: "#E5ECFD", textAlign: "center" }}>Complaint</th>
                    <th style={{ border: "none", backgroundColor: "#E5ECFD", textAlign: "center" }}>Date</th>
                    <th style={{ border: "none", backgroundColor: "#E5ECFD", textAlign: "center" }}>Priority</th>
                    <th style={{ border: "none", backgroundColor: "#E5ECFD", textAlign: "center" }}>Status</th>
                    <th style={{ border: "none", borderRadius: " 0px 15px 0px 0px", backgroundColor: "#E5ECFD", textAlign: "center" }}>Action</th>
            </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item.id}>
                      <td className="d-flex align-items-center" style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                        {/* Profile Image */}
                        <img
                          src={item.profileImage || "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="}
                          alt="Profile"
                          className="rounded-circle me-2"
                          width="40"
                          height="40" />
                        {/* Complainer Name */}
                        {item.complainer}
                      </td>
                      <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{item.complaint}</td>
                      <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{item.date}</td>
                      <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                        <Badge
                          bg={
                            item.priority === "High"
                              ? "danger"
                              : item.priority === "Medium"
                                ? "warning"
                                : "success"
                          } > {item.priority} </Badge>
                      </td>
                      <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>{item.status}</td>
                      <td style={{ boxShadow: "none", border: "none", textAlign: "center" }}>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleShowViewComplaintModal(item)}>   <FaEye /> </Button>
                        <Button
                          variant="success"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleShowEditComplaintModal(item)} > <FaEdit /></Button>
                        <Button
                       style={{border:"none"}}
                          size="sm"
                          className="ms-2 bg-danger"
                          onClick={() => handleShowDeleteModal(item)}   > <FaTrash /> </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {/* Upcoming Activity */}
        <Col xs={12} md={6} lg={3}>
          <Card className="mb-4" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title>Upcoming Activity</Card.Title>
                <select
                  id="dropdown-basic-button"
                  title="Select Month"
                
                  style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "14px",
                  }}
                  className="p-1" >
                  <option value="lastYear" >Last Year</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                </select>
              </div>
              <ListGroup variant="flush" className="mt-3">
                {activities.map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-start">
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: getRandomColor(),
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        marginRight: "10px",
                        fontSize: "14px",
                      }}>  A
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <div>
                          <strong>{item.event}</strong>
                        </div>
                        <p style={{ color: "grey" }}>{item.time}</p>
                      </div>
                      <div>
                        <small style={{ color: "grey" }}>{item.date}</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modals  for complain table*/}
      {/* Add Important Number Modal */}
      <Modal show={showAddNumberModal} onHide={() => setShowAddNumberModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Important Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={editedNumber.name}
                onChange={(e) => setEditedNumber({ ...editedNumber, name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={editedNumber.phone}
                onChange={(e) => setEditedNumber({ ...editedNumber, phone: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formWork">
              <Form.Label>Work</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter work type"
                name="work"
                value={editedNumber.work}
                onChange={(e) => setEditedNumber({ ...editedNumber, work: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddNumberModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNumber}>
            Add Number
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Complaint Modal */}
      <Modal show={showEditComplaintModal} onHide={handleCloseModal}>
  <Modal.Header >
    <Modal.Title>Edit Complaint</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formComplainer">
        <Form.Label>Complainer</Form.Label>
        <Form.Control
          type="text"
          value={currentComplaint?.complainer || ''}
          onChange={(e) => setCurrentComplaint({ ...currentComplaint, complainer: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formComplaint">
        <Form.Label>Complaint</Form.Label>
        <Form.Control
          type="text"
          value={currentComplaint?.complaint || ''}
          onChange={(e) => setCurrentComplaint({ ...currentComplaint, complaint: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <div>
          {['High', 'Medium', 'Low'].map((priority) => (
            <Form.Check
              inline
              key={priority}
              label={priority}
              type="radio"
              name="priority"
              value={priority}
              style={{ color: "grey", textAlign: "center", justifyContent: "center" }}
              checked={currentComplaint?.priority === priority}
              onChange={(e) => setCurrentComplaint({ ...currentComplaint, priority: e.target.value })}
            />
          ))}
        </div>
      </Form.Group>

      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <div>
          {['Open', 'Pending', 'Solved'].map((status) => (
            <Form.Check
              inline
              key={status}
              label={status}
              type="radio"
              name="status"
              value={status}
              checked={currentComplaint?.status === status}
              onChange={(e) => setCurrentComplaint({ ...currentComplaint, status: e.target.value })}
            />
          ))}
        </div>
      </Form.Group>
      
      <div className="d-flex justify-content-end mt-3">
        <Button 
        style={{background:"lightgrey",color:"white",border:"none",width:"45%"}}
        onClick={handleCloseModal} className="me-2">
          Cancel
        </Button>
        <Button 
         style={{
          background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
          border: "none",
          color: "white",
          width:"45%"
        }}
        
        onClick={handleEditComplaint}>
          Save Changes
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header 
        >
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this complaint?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{background:"lightgrey",color:"white",border:"none",width:"45%"}} onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger"style={{width:"45%"}} onClick={confirmDeleete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Complaint Modal */}
      <Modal show={showViewComplaintModal} onHide={handleCloseViewComplaintModal}>
  <Modal.Header closeButton>
    <Modal.Title>Complaint Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedComplaint && (
      <>
        {/* Row for Profile Image and Name */}
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <img
              src={selectedComplaint.profileImage || "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="}
              alt="Profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </Col>
          <Col>
            <p><strong>{selectedComplaint.complainer}</strong></p>
            <p style={{ fontSize: "0.9em", color: "gray" }}>{selectedComplaint.date}</p>
          </Col>
        </Row>
        
        {/* Complaint text */}
        <Row >
          <Col>
            <p style={{color:"black"}}><p style={{color:"grey"}}>Complaint:</p> {selectedComplaint.complaint}</p>
          </Col>
        </Row>

        {/* Priority and Status */}
        <Row>
          <Col>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
          </Col>
          <Col>
            <p>
              <strong>Priority:</strong>{' '}
              <Badge
                bg={
                  selectedComplaint.priority === 'High'
                    ? 'danger'
                    : selectedComplaint.priority === 'Medium'
                    ? 'warning'
                    : 'success'
                }
              >
                {selectedComplaint.priority}
              </Badge>
            </p>
          </Col>
        </Row>
      </>
    )}
  </Modal.Body>
 
</Modal>

    </Container>
  );
};
export default Dashboard;
