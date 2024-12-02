import React, { useEffect, useState } from 'react';
import { addExpense, getAllExpenses, getExpense, deleteExpense, updateExpense } from '../apiservices/expenseservice';
import { Box, Button, DialogTitle } from '@mui/material';
import { Delete, Edit, Image } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDropzone } from 'react-dropzone';
import { FaPlusCircle } from 'react-icons/fa';

import CloseIcon from '@mui/icons-material/Close';

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
  const [billFile, setBillFile] = useState(null); // State for file

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (acceptedFiles) => setBillFile(acceptedFiles[0]), // Save the uploaded file
  });
  // State to store new expense data
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
  });

  // Create expense handler
  async function handleCreateExpense() {

    const data = {
      ...createData,
      bill: billFile
    }

    try {
      const response = await addExpense(data); // Ensure your `addExpense` function handles `FormData`
      console.log(response.data);
      setCreateData({ title: '', description: '', date: '', amount: '' });
      setBillFile(null);
      getExpenseData()
      handleCreateModalClose();
      // setExpenseData(updatedData.data.records); // Refresh data
    } catch (error) {
      console.log(error);
    }
  }

  // edite expense
  const [showEditeModal, setshowEditeModal] = useState(false)
  const handalEditClose = () => setshowEditeModal(false)
  
  const [editeData, setediteData] = useState({})

  async function haldleEditId(id) {
    try {
      const response = await updateExpense(id)
      setediteData(response.data.updatedExpense)
      console.log(response.data.updatedExpense)
    } catch (error) {
      console.log(error)
    }
  }

  async function HandleEdit() {
    const data = {
      ...editeData,
      bill: billFile
    }
    try {
      const response = await updateExpense(editeData?._id, data)
      console.log(response.data)
      handalEditClose()
      getExpenseData()
    } catch (error) {
      console.log(error)
    }

  }

  // view modal 

  const [operviewModal, setoperviewModal] = useState(false)
  const handleClose = () => setoperviewModal(false);
  const handleViewOpen = () => setoperviewModal(true);
  const [viewdetils, setviewdetils] = useState({})

  async function handleView(id) {
    try {
      handleViewOpen()
      const respons = await getExpense(id)
      setviewdetils(respons.data.record)
    } catch (error) {
      console.log(error)
    }
  }

  // delete Modal 

  const [ShoweDeleteModal, setShoweDeleteModal] = useState(false)
  const handleDeleteColse = ()=> setShoweDeleteModal(false) 
  const [_id, setid] = useState("")

  async function DeleteExpense(id) {
    try {
      await deleteExpense(id)
     
      getExpenseData()
      handleDeleteColse()
    } catch (error) {
      console.log(error)
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
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      width: '300px',
      margin: '0 auto',
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    required: {
      color: 'red',
    },
    uploadBox: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fileInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    fileName: {
      margin: 0,
      fontWeight: 'bold',
    },
    fileSize: {
      margin: 0,
      fontSize: '12px',
      color: '#666',
    },
    success: {
      margin: 0,
      fontSize: '15px',
      color: 'green',
    },
    removeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#d9534f',
      fontSize: '16px',
    },
    input: {
      width: '100%',
    },
  };
  const blanck = { backgroundColor: '#F6F8FB', padding: '5px 12px 5px 12px', borderRadius: '16px', color: '#4F4F4F', }
  return (
    <div className=''>
      <Box className="radious" bgcolor="white" sx={{ height: '600px', width: '100%', padding: 2 }}>
        <div className="row mt-3 d-flex justify-content-between align-items-center  p-3 m-2 ">
          <h4 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Add Expenses Details</h4>
          <div className="col-12 col-md-4 mt-2 add-p-btn  ">
            <button className=' add-btn w-75' onClick={handleCreateModalOpen}> <span ><FaPlusCircle /></span> <span>Add New Expenses details</span> </button>
          </div>
        </div>
        <div className="responsive-table-container h-75">
          <table className="responsive-table">
            <thead className="tabal-header">
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
              {expenseData.map((item, index) => (

                <tr key={index} >
                  <td><span className='m-5'>{item.title}</span></td>
                  <td><span className='m-5'> {item.description}</span></td>
                  <td><span className='m-5'>  {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</span></td>
                  <td><span className='m-5 list-amount' >₹ {item.amount}</span></td>
                  <td><span className='m-5'>{
                    item.bill.split("/image/upload/")[1].split(".")[1] === "pdf" ? <span style={VIEW}><ArticleIcon className='fs-3 text-danger' />  </span> : <span style={VIEW}><Image className='fs-3 ' /></span>
                  }</span></td>
                  <td className="action-buttons">
                    <div className="d-flex gap-2">
                      <span className="status-badge-edit" style={EDITE} onClick={() => setshowEditeModal(true) || haldleEditId(item._id)}>
                        <Edit style={{ cursor: 'pointer' }} />
                      </span>
                      <span className="status-badge-view" style={VIEW} onClick={() => setoperviewModal(true) || handleView(item._id)}>
                        <VisibilityIcon style={{ cursor: 'pointer' }} />
                      </span>
                      <span className="status-badge-delete" style={DELETE} onClick={()=> setid(item._id)|| setShoweDeleteModal(true)}>
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
      <form method='post' enctype="multipart/form-data">
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
                {billFile && <p>Selected File: {billFile.name}</p>} {/* Display selected file */}
              </Form.Group>
              <div className="d-flex gap-3 mt-3">
                <Button className="save-btn radious   " style={{ color: "#202224", border: "1px solid #D3D3D3", cursor: "pointer" }} variant="outlined" onClick={handleCreateModalClose} >
                  Cancel
                </Button>
                <Button
                  className="save-btn radious l-btn "
                  style={{
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}

                  onClick={handleCreateExpense}
                >

                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>

      {/* Edit expense Modal */}
      <form method='post' enctype="multipart/form-data">
        <Modal show={showEditeModal} >
          <Modal.Header>
            <Modal.Title>Edit Expenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group>
                <Form.Label>Title <span className='text-danger1'>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={editeData.title}
                  onChange={(e) => setediteData({ ...editeData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Description <span className='text-danger1'>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter Description"
                  value={editeData.description}
                  onChange={(e) => setediteData({ ...editeData, description: e.target.value })}
                />
              </Form.Group>
              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Date <span className='text-danger1'>*</span></Form.Label>
                  <Form.Control
                    type="date"
                    value={editeData.date}
                    onChange={(e) => setediteData({ ...editeData, date: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="col-md-6">
                  <Form.Label>Amount <span className='text-danger1'>*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="₹ 0000"
                    value={editeData.amount}
                    onChange={(e) => setediteData({ ...editeData, amount: e.target.value })}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mt-3">
                <Form.Label>Upload Bill <span className='text-danger1'>*</span></Form.Label>

                {editeData.bill ? (
                  <div style={styles.uploadBox}>
                    <div style={styles.fileInfo}>
                      <div>
                        <p style={styles.fileName}><span style={{ textTransform: "capitalize" }}>{editeData.bill.split("/image/upload/")[1].split("/")[1]}</span></p>
                        <p style={styles.fileSize}>3.4 MB</p>
                        <p style={styles.success} >File Uploaded Successfully</p>
                      </div>
                      <button style={styles.removeButton} onClick={() => setediteData({
                        bill: null
                      })}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>


                    <div {...getRootProps()} className="file-upload">
                      <input {...getInputProps()} />
                      <div className="upload-area">
                        <AddPhotoAlternateIcon className="fs-1" />
                        <p>Upload a file or drag and drop</p>
                        <small>PNG, JPG, GIF up to 10MB</small>
                      </div>
                    </div>
                    {billFile && <p>Selected File: {billFile.name}</p>} {/* Display selected file */}
                  </div>
                )}


              </Form.Group>
              <div className="d-flex gap-3 mt-3">
                <Button className="save-btn radious   " style={{ color: "#202224", border: "1px solid #D3D3D3", cursor: "pointer" }} variant="outlined" onClick={handalEditClose} >
                  Cancel
                </Button>
                <Button
                  className="save-btn radious l-btn "
                  style={{
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}

                  onClick={HandleEdit}
                >

                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
      {/* view Modal */}
      <Modal show={operviewModal} onHide={handleClose}  >
        <div className="div" style={{ borderRadius: "10%" }}>


          <Modal.Header className='bg-white' style={{ height: "60px" }}>
            {/* <Modal.Title>
           
           
          </Modal.Title> */}
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <h> View Expense Details</h>
            </DialogTitle>
            <span style={{ cursor: "pointer" }} onClick={handleClose}>
              <CloseIcon className='mb-2 fs-3' />

            </span>
          </Modal.Header>
          <Modal.Body className='viewcomplete'>
            {/* title */}
            <div className="Description mt-3">
              <p className='mode-date '>Title</p>
              <h6 className=''>{viewdetils.title}</h6>
            </div>
            {/* Description  */}
            <div className="Description mt-3">
              <h6 className='mode-date '>Description</h6>
              <h6 className=''>{viewdetils.description}</h6>
            </div>
            <div className="Description mt-3 d-flex  " style={{ gap: "60px" }}>
              <div className="date">
                <h6 className='mode-date '>Date</h6>
                <p> {new Date(viewdetils.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</p>
              </div>
              <div className="amount">
                <h6 className='mode-date '>amount</h6>
                <span style={blanck}>₹ {viewdetils.amount}</span>
              </div>
            </div>
            <div className="Description mt-3">
              <h6 className='mode-date '>Bill</h6>
              <div className="d-flex doc ">
                <div className="icon me-1  img-icon  " >
                  <Image className='fs-3' />
                </div>
                <div className="icon me-1">
               <p style={{ textTransform: "capitalize",textWrap:"wrap", width:"215px" }}> {viewdetils.bill ? viewdetils.bill.split("/image/upload/")[1].split("/")[1]:""}
               <p >2.3 MB</p> </p>
             
               
                </div>
                <div className="icon me-1 document-view cursor">
                  <VisibilityIcon className='fs-3 ' />
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>

{/* delete Modal */}
<Modal show={ShoweDeleteModal}>
        <Modal.Header>
          <Modal.Title>Delete Expense?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mode-date'>Are you sure you want to delate this?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-3 mt-3">
            <Button
              className="save-btn radious   "
              style={{

                color: "#202224",
                border: "1px solid #D3D3D3",
                cursor: "pointer"
              }}
              variant="outlined"
              onClick={handleDeleteColse}
            >
              Cancel
            </Button>
            <Button
              className="save-btn radious  text-white "
              style={{
                backgroundColor: "#E74C3C",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => DeleteExpense(_id)}
            >
              Conform
            </Button>
          </div>
        </Modal.Footer>
      </Modal>


    </div>
  );
}
