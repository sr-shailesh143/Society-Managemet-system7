import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Otherincome = () => {
    const [showsetmantenenc, setShowsetmantenenc] = useState(false);
    const handleClosesetmantence = () => setShowsetmantenenc(false);
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
            fonty: "Poppins",
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


    const naviget = useNavigate()

    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [noteData, setNoteData] = useState([
        { title: 'Ganesh chaturthi', description: 'A visual representation of your spending categories visual representation.' },
        { title: 'Navratri', description: 'Detailed breakdown of your housing expenses.' },
        { title: 'Diwali', description: 'Overview of annual property taxes.' },
        { title: 'Ganesh chaturthi', description: 'Monthly maintenance fees breakdown.' },

    ]);

    const handleEditModalOpen = (title, description) => {
        setSelectedTitle(title);
        setSelectedDescription(description);
        setShowEditModal(true);
    };
    const handleEditModalClose = () => setShowEditModal(false);
    const handleCreateModalOpen = () => setShowCreateModal(true);
    const handleCreateModalClose = () => setShowCreateModal(false);

    const navigate = useNavigate(); 

    const handleViewClick = () => {
        navigate('/ViewOtherIncome'); 
    };

    return (
        <Container fluid className="container-fluid" style={{ minHeight: '100vh' }}>
            <div className='row'>
                <div className="d-flex mt-4 ">
                    <div onClick={() => naviget("/Icome")} style={{ background: location.pathname === "/Icome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Icome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p >Maintenance</p>
                    </div>
                    <div onClick={() => naviget("/Otherincome")} style={{ background: location.pathname === "/Otherincome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Otherincome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p >Other Income</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid d-flex flex-column bg-light shadow" style={{ width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center mb-3 p-3">
                    <h2>Other Income</h2>
                    <Button style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", borderColor: '#ff6b00' }} onClick={handleCreateModalOpen}>
                        Create Other Income
                    </Button>
                </div>

                {/* Notes Grid */}
                <Row className="g-3 mb-5">
                    {noteData.map((note, idx) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                            <Card className="h-100" style={{ backgroundColor: '#fff', color: '#333', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <Card.Header
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: '#407bff', color: '#fff', fontSize: '1rem', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                                >
                                    <div style={{ backgroundColor: '#407bff', padding: '5px 10px', borderRadius: '5px', color: '#fff', fontSize: '1rem' }}>
                                        {note.title}
                                    </div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="link" bsPrefix="p-0" id={`dropdown-${idx}`}>
                                            <HiOutlineDotsVertical style={{ color: '#fff', fontSize: '1.2rem' }} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditModalOpen(note.title, note.description)}>Edit</Dropdown.Item>
                                            <Dropdown.Item
                                                style={{ color: "#A7A7A7" }}
                                                onClick={handleViewClick}
                                            >
                                                View
                                            </Dropdown.Item>
                                            <Dropdown.Item style={{ color: "#A7A7A7" }} onClick={() => setShowsetmantenenc(true)}>Delate</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Header>
                                <Card.Body>

                                    <div style={styles.details}>
                                        <div style={styles.detailItem} className=''>
                                            <span>Amount Per Member</span>
                                            <span style={styles.bg}>₹ 1,500</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span>Total Member</span>
                                            <span style={{ color: "#202224", fontWeight: "500" }}>12</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span>Date</span>
                                            <span style={{ color: "#202224", fontWeight: "500" }}>01/07/2024</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span>Due Date</span>
                                            <span style={{ color: "#202224", fontWeight: "500" }}>10/07/2024</span>
                                        </div>
                                        <div style={styles.description}>
                                            <span>Due Date</span>
                                            <p style={{ color: "#202224", fontWeight: "500" }}>
                                                The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha.
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div style={styles.cardContainer}>
                </div>
            </div>
            {/* Create Note Modal */}
            <Modal show={showCreateModal} >
                <Modal.Header >
                    <Modal.Title>Create a New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label> Title <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex gap-1 ">
                            <div className="date w-50 ">
                                <Form.Label> Date <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control className='' type="date" />
                            </div>
                            <div className="time w-50 me-3">
                                <Form.Label> Due Date <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control type="date" className='' />
                            </div>
                        </Form.Group>
                        <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control as="textarea" rows={2} />
                        <Form.Label className='mt-2'> Amount <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control type="number" placeholder="₹ 0000" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-3">
                        <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} onClick={""}  >  Cancel </Button>
                        <Button className="save-btn radious l-btn " style={{ color: "white", border: "none", cursor: "pointer" }} onClick={handleCreateModalClose}  >
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* edit model */}
            <Modal show={showEditModal} >
                <Modal.Header >
                    <Modal.Title>Create a New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label> Title <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" onChange={(e) => setSelectedTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex gap-1 ">
                            <div className="date w-50 ">
                                <Form.Label> Date <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control className='' type="date" />
                            </div>
                            <div className="time w-50 me-3">
                                <Form.Label> Due Date <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control type="date" className='' />
                            </div>

                        </Form.Group>
                        <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control as="textarea" rows={2} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-3">
                        <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} variant="" onClick={handleEditModalClose} >
                            Cancel
                        </Button>
                        <Button className="save-btn radious l-btn " style={{ color: "white", border: "none", cursor: "pointer" }} onClick={handleEditModalClose}  >
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal show={showsetmantenenc} >
                <Modal.Header >
                    <Modal.Title>Delete Ganesh Chaturthi?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ color: "#A7A7A7" }}>Are you sure you want to delate this?</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-3">
                        <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} onClick={handleClosesetmantence} >
                            Cancel
                        </Button>
                        <Button className="save-btn radious l-btn " style={{ background: "#E74C3C", border: "none", color: "white", cursor: "pointer" }} onClick={() => setShowsetmantenenc(false)} >
                            Delate
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Otherincome;
