import React, { useEffect, useState } from 'react';
import { addExpense, getAllExpenses } from '../apiservices/expenseservice';
import { Box, Button } from '@mui/material';
import { Delete, Edit, Image } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';
import { FaPlus } from 'react-icons/fa6';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDropzone } from 'react-dropzone';

export default function Expense() {
  // State to store expenses data
  const [expenseData, setExpenseData] = useState([]);

  // Fetch all expenses
  async function getExpenseData() {
    try {
      const response = await getAllExpenses();
      setExpenseData(response.data.records);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExpenseData();
  }, []);

  // Modal state for creating an expense
  const [createShowModal, setCreateShowModal] = useState(false);
  const handleCreateModalOpen = () => setCreateShowModal(true);
  const handleCreateModalClose = () => setCreateShowModal(false);

  // Dropzone for file upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  // State to store new expense data
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    bill: '',
  });

  // Create expense handler
  async function handleCreateExpense() {
    try {
      const response = await addExpense(createData);
      console.log(response.data);
      setCreateData({ title: '', description: '', date: '', amount: '', bill: '' });
      handleCreateModalClose();
      getExpenseData(); // Refresh data
    } catch (error) {
      console.log(error);
    }
  }

  // Styles for action buttons
  const EDITE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#39973D',
  };
  const DELETE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#E74C3C',
  };
  const VIEW = {
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',
    backgroundColor: '#F6F8FB',
  };

  return (
    <div>
      <Box className="radious" bgcolor="white" sx={{ height: '600px', width: '100%', padding: 2 }}>
        <div className="row mt-3 d-flex justify-content-between align-items-center  ">
          <h4 className="col-12 col-md-3 mt-4" >
            Add Expenses Details
          </h4>
          <div className="col-12 col-md-3 mt-2 add-p-btn">
            <button className="add-btn" onClick={handleCreateModalOpen}>
              <span>
                <FaPlus />
              </span>{' '}
              <span>Add New Resident Details</span>
            </button>
          </div>
        </div>
        <div className="responsive-table-container">
          <table className="responsive-table">
            <thead className="tabal-header">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Bill Format</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span>{item.title}</span>
                  </td>
                  <td>
                    <span>{item.description}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </span>
                  </td>
                  <td>
                    <span>₹ {item.amount}</span>
                  </td>
                  <td>
                    <span>
                      {item.bill.split('/image/upload/')[1].split('.')[1] === 'pdf' ? (
                        <span style={VIEW}>
                          <ArticleIcon className="fs-3 text-danger" />
                        </span>
                      ) : (
                        <span style={VIEW}>
                          <Image className="fs-3" />
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <div className="d-flex gap-2">
                      <span className="status-badge-edit" style={EDITE}>
                        <Edit style={{ cursor: 'pointer' }} />
                      </span>
                      <span className="status-badge-view" style={VIEW}>
                        <VisibilityIcon style={{ cursor: 'pointer' }} />
                      </span>
                      <span className="status-badge-delete" style={DELETE}>
                        <Delete style={{ cursor: 'pointer' }} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      {/* Create Expense Modal */}
      <Modal show={createShowModal} onHide={handleCreateModalClose}>
        <Modal.Header>
          <Modal.Title>Add Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={createData.title}
                onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                value={createData.description}
                onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
              />
            </Form.Group>
            <div className="row mt-3">
              <Form.Group className="col-md-6">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={createData.date}
                  onChange={(e) => setCreateData({ ...createData, date: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="₹ 0000"
                  value={createData.amount}
                  onChange={(e) => setCreateData({ ...createData, amount: e.target.value })}
                />
              </Form.Group>
            </div>
            <Form.Group className="mt-3">
              <Form.Label>Upload Bill</Form.Label>
              <div {...getRootProps()} className="file-upload">
                <input {...getInputProps()} />
                <div className="upload-area">
                  <AddPhotoAlternateIcon className="fs-1" />
                  <p>Upload a file or drag and drop</p>
                  <small>PNG, JPG, GIF up to 10MB</small>
                </div>
              </div>
            </Form.Group>
            <div className="d-flex justify-content-center gap-3 mt-4 ">
              <Button className='p-3' onClick={handleCreateModalClose}style={{backgroundColor:"transparent",border:"1px solid grey",color:"black",width:"45%"}}>
                Cancel
              </Button>
              <Button className='p-3' variant="contained" onClick={handleCreateExpense}style={{ background: "linear-gradient(90deg, #FE512E, #F09619)", border: "none", cursor: "pointer",textAlign:"center",width:"45%" }}>
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
