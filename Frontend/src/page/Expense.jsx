import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { MdPictureAsPdf, MdOutlinePictureInPictureAlt } from "react-icons/md";
import { Modal, Button, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Row, Col } from 'react-bootstrap';

const initialExpensesData = [
  { 
    title: 'Rent or Mortgage', 
    description: 'A visual representation of your spending categories...', 
    date: '10/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' 
  },
  { 
    title: 'Housing Costs', 
    description: 'Track the fluctuations in your spending over time...', 
    date: '11/02/2024', 
    amount: 1000, 
    billFormat: 'PDF', 
    image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png' 
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Property Taxes', 
    description: 'Easily compare your planned budget against your actual...', 
    date: '12/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU='
  },
  { 
    title: 'Rent or Mortgage', 
    description: 'A visual representation of your spending categories...', 
    date: '10/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' 
  },
  { 
    title: 'Housing Costs', 
    description: 'Track the fluctuations in your spending over time...', 
    date: '11/02/2024', 
    amount: 1000, 
    billFormat: 'PDF', 
    image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png' 
  },
  { 
    title: 'Rent or Mortgage', 
    description: 'A visual representation of your spending categories...', 
    date: '10/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' 
  },
  { 
    title: 'Housing Costs', 
    description: 'Track the fluctuations in your spending over time...', 
    date: '11/02/2024', 
    amount: 1000, 
    billFormat: 'PDF', 
    image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png' 
  },
  { 
    title: 'Rent or Mortgage', 
    description: 'A visual representation of your spending categories...', 
    date: '10/02/2024', 
    amount: 1000, 
    billFormat: 'JPG', 
    image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png' 
  },
  { 
    title: 'Housing Costs', 
    description: 'Track the fluctuations in your spending over time...', 
    date: '11/02/2024', 
    amount: 1000, 
    billFormat: 'PDF', 
    image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png' 
  },
];

const Expense = () => {
  const [expensesData, setExpensesData] = useState(initialExpensesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null); 
  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    billFormat: 'PDF',
    image: '',
  });

  const handleModalShow = (expense = null) => {
    if (expense) {
      setEditingExpense(expense); 
      setNewExpense({ ...expense }); 
      setShowEditModal(true); 
    } else {
      setNewExpense({ title: '', description: '', date: '', amount: '', billFormat: 'PDF', image: '' });
      setShowAddModal(true); 
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, 
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileURL = URL.createObjectURL(file);
      setNewExpense((prevState) => ({
        ...prevState,
        image: fileURL,
      }));
    },
  });

  const handleAddExpense = (expense) => {
    setExpensesData([...expensesData, expense]); 
  };

  const handleUpdateExpense = (expense) => {
    const updatedExpenses = expensesData.map(exp => 
      exp === editingExpense ? { ...expense } : exp
    );
    setExpensesData(updatedExpenses); 
  };

  const handleDeleteExpense = () => {
    const updatedExpenses = expensesData.filter(exp => exp !== expenseToDelete); 
    setExpensesData(updatedExpenses);
    setShowDeleteModal(false); 
  };

  const handleSubmit = () => {
    if (editingExpense) {
      handleUpdateExpense(newExpense);
    } else {
      handleAddExpense(newExpense);
    }
    handleModalClose();
  };

  return (
    <div className="container-fluid bg-light shadow">
      <div className="d-flex justify-content-between align-items-center p-3 m-2">
        <h3>Add Expenses Details</h3>
        <button
          className="btn btn-warning"
          style={{
            background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
            border: "none",
            color: "white"
          }}
          onClick={() => handleModalShow()} 
        >
          + Add New Expense Details
        </button>
      </div>

      <table className="table table-striped m-2">
        <thead className="table-light" style={{ textAlign: "center" }}>
          <tr>
            <th style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>Title</th>
            <th style={{ backgroundColor: "#E5ECFD" }}>Description</th>
            <th style={{ backgroundColor: "#E5ECFD" }}>Date</th>
            <th style={{ backgroundColor: "#E5ECFD" }}>Amount</th>
            <th style={{ backgroundColor: "#E5ECFD" }}>Bill Format</th>
            <th style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {expensesData.map((expense, index) => (
            <tr key={index}>
              <td style={{ width: "200px" }}>
                <div className="d-flex align-items-center justify-content-start">
                  {expense.image && (
                    <img
                      src={expense.image}
                      alt="Expense"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                  )}
                  {expense.title}
                </div>
              </td>
              <td>{expense.description}</td>
              <td>{expense.date}</td>
              <td>₹ {expense.amount}</td>
              <td>
                {expense.billFormat === "PDF" && <MdPictureAsPdf style={{ color: "red" }} className="me-1" />}
                {expense.billFormat === "JPG" && <MdOutlinePictureInPictureAlt style={{ color: "blue" }} className="me-1" />}
                {expense.billFormat}
              </td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => handleModalShow(expense)}>
                  <FaEdit />
                </button>
                <button className="btn btn-primary btn-sm me-2"><FaEye /></button>
                <button className="btn btn-danger btn-sm" onClick={() => { setExpenseToDelete(expense); setShowDeleteModal(true); }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding expense */}
      <Modal show={showAddModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newExpense.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
              />
            </Form.Group>
           <Row>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newExpense.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            </Col>
           </Row>
           
           
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <div className="file-upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="upload-area">
                                <center>

                                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                </center>
                                <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                                <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                        </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button  style={{backgroundColor:"lightgrey",color:"white",width:"40%",border:"none"}} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button   style={{
            background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
            border: "none",
            color: "white",
            width:"40%"
          }} onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing expense */}
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newExpense.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Row>
  <Col md={6}> {/* For half-width columns on medium screens and larger */}
    <Form.Group className="mb-3" controlId="formDate">
      <Form.Label>Date<span class="text-danger">*</span></Form.Label>
      <Form.Control
        type="date"
        name="date"
        value={newExpense.date}
        onChange={handleInputChange}
      />
    </Form.Group>
  </Col>

  <Col md={6}> {/* For the other half-width column */}
    <Form.Group className="mb-3" controlId="formAmount">
      <Form.Label>Amount <span class="text-danger">*</span></Form.Label>
      <Form.Control
        type="number"
        name="amount"
        value={newExpense.amount}
        onChange={handleInputChange}
      />
    </Form.Group>
  </Col>
</Row>
           
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <div class="container mt-4">
  <label for="fileInput" class="file-upload-label">Upload Imgae<span class="text-danger">*</span></label>
  <div class="file-upload-container mt-2">
    <label for="fileInput" class="file-upload-display">
      <img src="https://via.placeholder.com/24" alt="file icon"/>
      <span class="file-name">image Front Side.JPG</span>
      <span class="file-size">3.5 MB</span>
      <span class="file-icon">
        <i class="bi bi-eye"></i> 
      </span>
    </label>
    <input type="file" id="fileInput"/>
  </div>
</div>
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"lightgrey",color:"white",width:"40%",border:"none"}} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button   style={{
            background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
            border: "none",
            color: "white",
            width:"40%"
          }} onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal show={showDeleteModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this expense?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteExpense}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Expense;
