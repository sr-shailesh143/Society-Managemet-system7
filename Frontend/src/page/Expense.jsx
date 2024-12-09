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
import ImagePopup from '../practice/EditablePage';
import toast from 'react-hot-toast';

export default function Expense() {
  const [expenseData, setExpenseData] = useState([]);

  async function getExpenseData() {
    try {
      const response = await getAllExpenses();
      setExpenseData(response.data.records);
    } catch (error) {
      toast.log(error);
    }
  }

  useEffect(() => {
    getExpenseData();
  }, []);

  const [createShowModal, setCreateShowModal] = useState(false);
  const handleCreateModalOpen = () => setCreateShowModal(true);
  const handleCreateModalClose = () => setCreateShowModal(false);


  const [billFile, setBillFile] = useState(null); 

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, 
    onDrop: (acceptedFiles) => setBillFile(acceptedFiles[0]), 
  });

  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
  });



  async function handleCreateExpense() {

    const data = {
      ...createData,
      bill: billFile
    }

    try {
      const response = await addExpense(data);
      toast.log(response.data);
      setCreateData({ title: '', description: '', date: '', amount: '' });
      setBillFile(null);
      getExpenseData()
      handleCreateModalClose();

    } catch (error) {
      toast.log(error);
    }
  }

  const [showEditeModal, setshowEditeModal] = useState(false)
  const handalEditClose = () => setshowEditeModal(false)

  const [editeData, setediteData] = useState({})

  async function haldleEditId(id) {
    try {
      const response = await updateExpense(id)
      setediteData(response.data.updatedExpense)
      toast.log(response.data.updatedExpense)
    } catch (error) {
      toast.log(error)
    }
  }

  async function HandleEdit() {
    const data = {
      ...editeData,
      bill: billFile
    }
    try {
      const response = await updateExpense(editeData?._id, data)
      toast.log(response.data)
      handalEditClose()
      getExpenseData()
    } catch (error) {
      toast.log(error)
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
      toast.log(error)
    }
  }

  // delete Modal 

  const [ShoweDeleteModal, setShoweDeleteModal] = useState(false)
  const handleDeleteColse = () => setShoweDeleteModal(false)
  const [_id, setid] = useState("")

  async function DeleteExpense(id) {
    try {
      await deleteExpense(id)

      getExpenseData()
      handleDeleteColse()
    } catch (error) {
      toast.log(error)
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
      <Box className="radious" bgcolor="white" sx={{ height: '780px', width: '100%', padding: 2 }}>
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
                      <span className="status-badge-edit cursor" style={EDITE} onClick={() => setshowEditeModal(true) || haldleEditId(item._id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#39973D" />
                        </svg>

                      </span>
                      <span className="status-badge-view cursor" style={VIEW} onClick={() => setoperviewModal(true) || handleView(item._id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                          <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                        </svg>

                      </span>

                   
                    

                      <span className="status-badge-delete cursor" style={DELETE} onClick={()=> setid(item._id)|| setShoweDeleteModal(true)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#E74C3C" />
                          <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#E74C3C" />
                        </svg>

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
                {billFile && <p>Selected File: {billFile.name}</p>}
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

                    {billFile && <p>Selected File: {billFile.name}</p>} 

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

            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <h> View Expense Details</h>
            </DialogTitle>
            <span style={{ cursor: "pointer" }} onClick={handleClose}>
              <CloseIcon className='mb-2 fs-3' />

            </span>
          </Modal.Header>
          <Modal.Body className='viewcomplete'>

            <div className="Description mt-3">
              <p className='mode-date '>Title</p>
              <h6 className=''>{viewdetils.title}</h6>
            </div>

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
                  <p style={{ textTransform: "capitalize", textWrap: "wrap", width: "215px" }}> {viewdetils.bill ? viewdetils.bill.split("/image/upload/")[1].split("/")[1] : ""}
                    <p >2.3 MB</p> </p>


                </div>
                <div className="icon me-1 document-view cursor" onClick={()=>showIMG(viewdetils.bill)}>
                  <VisibilityIcon className='fs-3 ' />
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>

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