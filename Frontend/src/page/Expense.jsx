import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { MdPictureAsPdf, MdOutlinePictureInPictureAlt } from 'react-icons/md';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDropzone } from 'react-dropzone';
import {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from '../apiservices/expenseservice';

const Expense = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    billFormat: '',
    bill: null,
  });
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getAllExpenses();
      if (response.data && response.data.success) {
        setExpensesData(response.data.records);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleModalShow = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setNewExpense(expense);
      setShowEditModal(true);
    } else {
      setNewExpense({
        title: '',
        description: '',
        date: '',
        amount: '',
        billFormat: '',
        bill: null,
      });
      setEditingExpense(null);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', newExpense.title);
    formData.append('description', newExpense.description);
    formData.append('date', newExpense.date);
    formData.append('amount', newExpense.amount);
    if (newExpense.bill) {
      formData.append('bill', newExpense.bill);
    }
    formData.append('billFormat', newExpense.billFormat);

    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
      } else {
        await addExpense(formData);
      }
      fetchExpenses();
      handleModalClose();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleDeleteExpense = async () => {
    try {
      const response = await deleteExpense(expenseToDelete._id);
      if (response.success) {
        setExpensesData((prevData) =>
          prevData.filter((expense) => expense._id !== expenseToDelete._id)
        );
        handleModalClose();
      } else {
        console.error('Failed to delete expense:', response.message);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,application/pdf',
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        alert('Invalid file type. Only images and PDFs are allowed.');
      } else {
        setNewExpense({ ...newExpense, bill: acceptedFiles[0] });
      }
    },
  });

  return (
    <div className="container-fluid bg-light shadow">
      <div className="d-flex justify-content-between align-items-center p-3 m-2">
        <h3>Add Expenses Details</h3>
        <button
          className="btn btn-warning"
          style={{
            background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
            border: 'none',
            color: 'white',
          }}
          onClick={() => handleModalShow()}
        >
          + Add New Expense Details
        </button>
      </div>

      <table className="table table-striped m-2">
        <thead className="table-light" style={{ textAlign: 'center' }}>
          <tr>
            <th style={{ backgroundColor: '#E5ECFD', borderRadius: '15px 0px 0px 0px' }}>
              Title
            </th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Description</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Date</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Amount</th>
            <th style={{ backgroundColor: '#E5ECFD' }}>Bill Format</th>
            <th style={{ backgroundColor: '#E5ECFD', borderRadius: '0px 15px 0px 0px' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {expensesData.map((expense, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center justify-content-start">
                  {expense.image && (
                    <img
                      src={expense.image}
                      alt="Expense"
                      className="rounded-circle me-2"
                      style={{ width: '30px', height: '30px' }}
                    />
                  )}
                  {expense.title}
                </div>
              </td>
              <td>{expense.description}</td>
              <td>{expense.date}</td>
              <td>₹ {expense.amount}</td>
              <td>
                {expense.billFormat === 'PDF' && (
                  <MdPictureAsPdf style={{ color: 'red' }} className="me-1" />
                )}
                {expense.billFormat === 'JPG' && (
                  <MdOutlinePictureInPictureAlt style={{ color: 'blue' }} className="me-1" />
                )}
                {expense.billFormat}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleModalShow(expense)}
                >
                  <FaEdit />
                </button>
                <button className="btn btn-primary btn-sm me-2">
                  <FaEye />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setExpenseToDelete(expense);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
