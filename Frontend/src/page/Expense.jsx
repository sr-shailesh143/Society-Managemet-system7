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
  // State Variables
  const [expenseData, setExpenseData] = useState([]);
  const [createShowModel, setCreateShowModel] = useState(false);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    bill: '',
  });

  // Fetch All Expenses
  const getExpenseData = async () => {
    try {
      const response = await getAllExpenses();
      setExpenseData(response.data.records);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  // Handle Create Expense
  const handleCreateExpense = async () => {
    try {
      const response = await addExpense(createData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Dropzone Setup
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  // Modal Handlers
  const handleCreateModelOpen = () => setCreateShowModel(true);
  const handleCreateModelClose = () => setCreateShowModel(false);

  // Styles
  const styles = {
    edit: {
      backgroundColor: '#F6F8FB',
      padding: '10px 10px',
      borderRadius: '12px',
      color: '#39973D',
    },
    delete: {
      backgroundColor: '#F6F8FB',
      padding: '10px 10px',
      borderRadius: '12px',
      color: '#E74C3C',
    },
    view: {
      backgroundColor: '#F6F8FB',
      padding: '10px 10px',
      borderRadius: '12px',
      color: '#5678E9',
    },
  };

  return (
    <div>
      <Box bgcolor="white" sx={{ height: '600px', width: '100%', padding: 2 }}>
        {/* Header Section */}
        <div className="row mt-3 d-flex justify-content-between align-items-center p-3 m-2">
          <h4 className="col-12 col-md-3 mt-4">Add Expenses Details</h4>
          <div className="col-12 col-md-3 mt-2">
            <button className="add-btn" onClick={handleCreateModelOpen}>
              <FaPlus /> Add New Expense Details
            </button>
          </div>
        </div>

        {/* Table Section */}
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
              {expenseData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    {new Date(item.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </td>
                  <td>₹ {item.amount}</td>
                  <td>
                    {item.bill.includes('.pdf') ? (
                      <ArticleIcon style={styles.view} />
                    ) : (
                      <Image style={styles.view} />
                    )}
                  </td>
                  <td>
                    <span className="d-flex gap-2">
                      <Edit style={styles.edit} />
                      <VisibilityIcon style={styles.view} />
                      <Delete style={styles.delete} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      {/* Modal Section */}
      <Modal show={createShowModel}>
        <div className="model">
          <Modal.Header>
            <Modal.Title>Add Expenses Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="complete-name">
              <label>Title</label>
              <input
                className="input-style"
                placeholder="Enter Title"
                type="text"
                onChange={(e) =>
                  setCreateData({ ...createData, title: e.target.value })
                }
              />
            </div>
            <div className="complete-name mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter Description"
                onChange={(e) =>
                  setCreateData({ ...createData, description: e.target.value })
                }
              />
            </div>
            <div className="row d-flex mt-2">
              <div className="col-12 col-md-6">
                <label>Date</label>
                <input
                  className="input-style"
                  type="date"
                  onChange={(e) =>
                    setCreateData({ ...createData, date: e.target.value })
                  }
                />
              </div>
              <div className="col-12 col-md-6">
                <label>Amount</label>
                <input
                  className="input-style"
                  type="number"
                  placeholder="₹ 0000"
                  onChange={(e) =>
                    setCreateData({ ...createData, amount: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="complete-name mt-3">
              <label>Upload Bill</label>
              <div {...getRootProps()} className="file-upload">
                <input {...getInputProps()} />
                <div className="upload-area">
                  <AddPhotoAlternateIcon className="fs-1" />
                  <p>
                    Upload a file or drag and drop<br />
                    <small>PNG, JPG, GIF up to 10MB</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex gap-3 mt-3">
              <Button onClick={handleCreateModelClose}>Cancel</Button>
              <Button onClick={handleCreateExpense}>Save</Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
