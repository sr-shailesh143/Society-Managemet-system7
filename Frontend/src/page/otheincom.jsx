import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { CreateIncome, GetIncomes, DeleteIncome, UpdateIncome } from '../apiservices/incomeservice';

const Otherincome = () => {
    const styles = {
        cardContainer: {
            width: '300px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        amount: {
            backgroundColor: '#FFFFFF',
            color: '#4A90E2',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '16px',
        },
        details: {
            padding: '15px',
            color: '#333',
            marginBottom: "-20px"
        },
        detailItem: {
            color: '#4F4F4F',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: "400",
        },
        description: {
            marginTop: '10px',
            fontSize: '12px',
            color: '#666',
        },
        bg: {
            backgroundColor: '#5678E91A',
            padding: '5px 15px',
            borderRadius: '10px',
            color: '#5678E9',
            fontSize: "15px",
            fontWeight: '500',
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [incomes, setIncomes] = useState([]); 
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        date: '',
        dueDate: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchIncomes();
    }, []); // Empty dependency array to only run on mount

    const fetchIncomes = async () => {
        try {
            const response = await GetIncomes();
            const data = response.data;
            if (data.success && Array.isArray(data.records)) {
                setIncomes(data.records);
            } else {
                console.error('Invalid data structure from API:', data);
                setIncomes([]);
            }
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setIncomes([]);
        }
    };

    const handleViewClick = () => {
        navigate('/ViewOtherIncome');
    };

    const handleCreate = async () => {
        try {
            await CreateIncome(formData);
            fetchIncomes();
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error creating income:', error);
        }
    };

    const handleEdit = (income) => {
        setSelectedIncome(income);
        setFormData(income);
        setShowEditModal(true);
    };

    const handleDelete = (income) => {
        setSelectedIncome(income); 
        setShowDeleteModal(true);
    };

    const handleUpdate = async () => {
        try {
            if (selectedIncome?._id) {
                await UpdateIncome(selectedIncome._id, formData);
                fetchIncomes();
                setShowEditModal(false); // Close the modal after updating
            }
        } catch (error) {
            console.error('Error updating income:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            if (selectedIncome?._id) {
                await DeleteIncome(selectedIncome._id);
                fetchIncomes();
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    return (
        <Container fluid style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className='row'>
                <div className="d-flex mt-4">
                    <div onClick={() => navigate("/Icome")} style={{ background: location.pathname === "/Icome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Icome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p>Maintenance</p>
                    </div>
                    <div onClick={() => navigate("/Otherincome")} style={{ background: location.pathname === "/Otherincome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Otherincome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p>Other Income</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white shadow p-4 mt-4 rounded">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0" style={{ fontWeight: 600 }}>Other Income</h2>
                    <Button
                        style={{
                            background: "linear-gradient(90deg, #FE512E, #F09619)",
                            borderColor: "#ff6b00",
                        }}
                        onClick={() => setShowCreateModal(true)}
                    >
                        Create Other Income
                    </Button>
                </div>

                {/* Cards Grid */}
                <Row className="g-4">
                    {incomes.length > 0 ? (
                        incomes.map((income) => (
                            <Col key={income._id} xs={12} sm={6} md={4} lg={3}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                                        <span>{income.title}</span>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="link" className="text-white p-0 border-0">
                                                <HiOutlineDotsVertical />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item style={{ color: "#A7A7A7" }} onClick={handleViewClick}>
                                                    View
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleEdit(income)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(income)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>{income.description}</p>
                                        <p><strong>Amount:</strong> ₹{income.amount}</p>
                                        <p><strong>Date:</strong>{new Date(income.date).toLocaleDateString()}</p>
                                        <p><strong>Due Date:</strong>{new Date(income.dueDate).toLocaleDateString()}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No incomes found.</p>
                    )}
                </Row>
            </div>

            {/* Create Income Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Other Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex gap-2">
                            <div className="w-50">
                                <Form.Label>Amount <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>

                            <div className="w-50">
                                <Form.Label>Date <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Due Date <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Income Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Other Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                         {/* Title Field */}
      <Form.Group className="mb-3">
        <Form.Label>
          Title <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Form.Group>

      {/* Date and Due Date Fields */}
      <Form.Group className="mb-3 d-flex gap-2">
        <div className="w-50">
          <Form.Label>
            Date <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="w-50">
          <Form.Label>
            Due Date <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </Form.Group>

      {/* Description Field */}
      <Form.Group className="mb-3">
        <Form.Label>
          Description <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Form.Group>

      {/* Amount Field */}
      <Form.Group className="mb-3">
        <Form.Label>
          Amount <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="₹ 0000"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Income Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this income record?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Otherincome;
