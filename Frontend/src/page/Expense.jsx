import React, { useEffect, useState } from 'react'
import { addExpense, getAllExpenses, updateExpense, deleteExpense, getExpense } from '../apiservices/expenseservice';
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

  // get expense 
  const [expenseData, setexpenseData] = useState([])
  async function getExpenseData() {
    try {
      const response = await getAllExpenses()
      setexpenseData(response.data.records)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getExpenseData()
  }, [])

  // crete expense
  const [createShowModel, setcreateShowModel] = useState(false)
  const handleCreateModelOpen = () => setcreateShowModel(true)
  const handleCreateModelclose = () => setcreateShowModel(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
   
  });
  
  const [creteData, setcreteData] = useState({
    title:"",
    description:"",
    date:"",
    amount:"",
    bill:"",
  })
  async function handalCreateExpense(){
try {
   const response =  await addExpense(creteData)
   console.log(response.data)
} catch (error) {
  console.log(error)
}
  }
  const EDITE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#39973D',

  }
  const DELETE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#E74C3C',

  }
  const view = {
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',
    backgroundColor: '#F6F8FB',

  }

  return (
    <div>
      <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
        <div className="row mt-3 d-flex justify-content-between align-items-center  p-3 m-2 ">
          <h4 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Add Expenses Details</h4>
          <div className="col-12 col-md-3 mt-2 add-p-btn  ">
            <button className=' add-btn' onClick={handleCreateModelOpen}> <span ><FaPlus /></span> <span>Add New Resident details</span> </button>
          </div>
        </div>
        <div className="responsive-table-container">
          <table className="responsive-table">
            <thead className='tabal-header'>
              <tr>
                <th className='redious'> &nbsp;&nbsp;  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  Title</th>
                <th>  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  &nbsp;Description</th>
                <th> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; Date</th>
                <th> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Amount</th>
                <th>  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bill Format</th>
                <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
              </tr>
            </thead>
            <tbody>

              {expenseData.map((item) => (
                <tr >
                  <td><span className='m-5'>{item.title}</span></td>
                  <td><span className='m-5'> {item.description}</span></td>
                  <td><span className='m-5'>  {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</span></td>
                  <td><span className='m-5 list-amount' >₹ {item.amount}</span></td>
                  <td><span className='m-5'>{
                    item.bill.split("/image/upload/")[1].split(".")[1] === "pdf" ?<span style={view}><ArticleIcon className='fs-3 text-danger' /></span>: <span style={view}><Image className='fs-3 ' /></span> 
                  }</span></td>
                  <td className="action-buttons">
                    <span className=' d-flex gap-2'>
                      <span className={`status-badge-edit mx-2  `} style={EDITE} >
                        <Edit style={{ cursor: "pointer" }} />
                      </span>
                      <span className={`status-badge-view `} style={view} >
                        <VisibilityIcon style={{ cursor: "pointer" }} />
                      </span>
                      <span className={`status-badge-delete ms-2 `} style={DELETE}>


  return (
    <div className="container-fluid bg-light shadow">
      <div className="d-flex justify-content-between align-items-center p-3 m-2">
        <h3>Add Expenses Details</h3>
        <button
          className="btn btn-warning p-2"
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
              <td >
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

                        <Delete style={{ cursor: "pointer" }} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
      {/* create modal */}
      <Modal className='complet-model' show={createShowModel} >
        <div className="model">
          <Modal.Header>
            <Modal.Title>Add Expenses Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="complete-name">
              <label html="" className='labal-name'>Title<span className='text-danger1'>*</span></label>
              <input className='input-style' placeholder='Enter Title' type="text" onChange={(e)=>setcreteData({
                ...creteData,title:e.target.value
              })} />
            </div>
            <div className="complete-name mt-3">
              <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={(e)=>setcreteData({
                  ...creteData,description:e.target.value
                })}
                placeholder='Enter Description'
              />
            </div>
            <div className="complete-name mt-2 row d-flex">
              <div className="complent-UnitNumber col-12 col-md-6">
                <label html="" className='labal-name'> Date <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Wing' type="date"   onChange={(e)=>setcreteData({
                ...creteData,date:e.target.value
              })}/>
              </div>
              <div className="complelt-unit col-12 col-md-6">
                <label html="" className='labal-name'> Unit <span className='text-danger1'>*</span></label>
                <input className='input-style mb-1' placeholder='₹ 0000' type="number"  onChange={(e)=>setcreteData({
                ...creteData,amount:e.target.value
              })} />
              </div>
            </div>
            <div className="complete-name">
              <label html="" className='labal-name'>Upload Bill<span className='text-danger1'>*</span></label>
              <div className="file-upload" {...getRootProps()}>
                <input {...getInputProps()}  onChange={(e)=>setcreteData({
                ...creteData,bill:e.target.value
              })} />
                <div className="upload-area">
                  <center>

                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                  </center>
                  <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                  <small>PNG, JPG, GIF up to 10MB</small>

                </div>
              </div>
            </div>
            <div className="d-flex gap-3 mt-3">
              <Button
                className=" cancel-btn radious  "
                style={{ border: "1px solid #D3D3D3", }}
                variant=""
                onClick={handleCreateModelclose}
              >
                Cancel
              </Button>
              <Button
                className="save-btn radious l-btn "
                style={{
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}

                onClick={handalCreateExpense}
              >
                Save
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>


    </div>
  )
}
