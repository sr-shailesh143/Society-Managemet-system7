import React, { useState } from 'react';
import '../index.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { Delete, Edit, Image, PlusOne, Spa } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
export default function CompleteTracking() {
  const [show, setshow] = useState(false)
  const [status, setStatus] = useState("High");
  const [status1, setStatus1] = useState("Open");
  const handleStatusChange1 = (event) => setStatus1(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const naviget = useNavigate()
  function createcomplent() {
    setshow(false)
    naviget("/traking")
  }
  // edit 
  const [editShow, seteditShow] = useState(false)
  const [status2, setStatus2] = useState("High");
  const [status3, setStatus3] = useState("Open");
  const handleStatusChange2 = (event) => setStatus2(event.target.value);
  const handleStatusChange3 = (event) => setStatus3(event.target.value);
  function edit() {
    seteditShow(false)
    naviget("/traking")

  }
  // view 
  const [showview, setshowview] = useState(false)
  const handleClose = () => setshowview(false);
  // delete
  const [showDelete, setshowDelete] = useState(false)
  function deletecomplelnt() {
    setshowDelete(false)
  }
  const rows = [
    { id: 1, ComplainerName: 'Evelyn Harper', ComplaintName: 'Behavior', UnitNumber: "1022", wing: "A", Description: 'OccupiedProviding false information or deliberately.', Priority: 'Medium', Status: 'Pending', img: "src/assets/notification-img.png" },
    { id: 2, ComplainerName: 'jatin ', ComplaintName: 'Behavior', Description: 'VacateProviding false information or deliberately.', UnitNumber: "1022", wing: "B", Priority: 'Low', Status: 'Open', img: "src/assets/notification-img.png" },
    { id: 3, ComplainerName: 'Evelyn Harper', ComplaintName: 'Behavior', Description: 'OccupiedProviding false information or deliberately.', UnitNumber: "1022", wing: "C", Priority: 'Medium', Status: 'Open', img: "src/assets/notification-img.png" },
    { id: 4, ComplainerName: 'Evelyn Harper', ComplaintName: 'Behavior', Description: 'OccupiedProviding false information or deliberately.', UnitNumber: "1022", wing: "D", Priority: 'High', Status: 'Solve', img: "src/assets/notification-img.png" },
    // Additional rows...
  ];

  // Define Columns
  const columns = [
    {
      field: 'ComplainerName',
      headerName: 'Complainer Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.img}
            className='ms-5'
            alt={params.value}
            style={{ width: 35, height: 35, borderRadius: '50%', marginRight: 8, border: params.row.img ? "" : "1px solid #F4F4F4", backgroundColor: params.row.img ? "" : "#F4F4F4" }}
          />
          {
            <span>{params.value}</span>
          }
        </div>
      ),
    },
    {
      field: 'ComplaintName', headerName: 'ComplaintName', flex: 1, minWidth: 50, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <div className={`ms-2 status-badge ${params.value.toLowerCase()} d-flex gap-3`}>
          <p className='ms-5'> {params.value}</p>

        </div>

      )
    },
    {
      field: 'Description',
      headerName: 'Description',
      flex: 1,
      minWidth: 130,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>
          {params.value}
        </span>
      )
    },
    {
      field: 'UnitNumber',
      headerName: 'UnitNumber',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>
          <span className='status-badge-wing'> {params.row.wing}</span>   <span> {params.value}</span>
        </span>
      )
    },
    {
      field: 'Priority', headerName: 'Priority', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`} >
          {
            params.row.Status ? <span>{params.value}</span> : <span>--</span>
          }
        </span>
      )
    },
    {
      field: 'Status', headerName: 'Status', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`} >
          {
            params.row.Status ? <span>{params.value}</span> : <span>--</span>
          }
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <div>
          {
            <span className=''>
              <span className={`status-badge-edit mx-2  `} onClick={() => seteditShow(true)} >
                <Edit style={{ cursor: "pointer" }} />
              </span>
              <span onClick={() => setshowview(true)} className={`status-badge-view `} >
                <VisibilityIcon style={{ cursor: "pointer" }} />
              </span>
              <span onClick={() => setshowDelete(true)} className={`status-badge-delete ms-2 `}>

                <Delete style={{ cursor: "pointer" }} />
              </span>
            </span>
          }
        </div>
      ),
    },
  ];



  const data = [
    {
      img: "src/assets/notification-img.png",
      ComplainerName: "Evelyn Harper",
      unitNumber: "1001",
      ComplaintName: "Unethical Behavior",
      Description: "Providing false information or deliberately.",
      Priority: "Medium",
      Status: "Pending",
      wing: "A"
    },
    {
      img: "src/assets/notification-img.png",
      ComplainerName: "Evelyn Harper",
      unitNumber: "1001",
      ComplaintName: "Unethical Behavior",
      Description: "Providing false information or deliberately.",
      Priority: "Medium",
      Status: "Solve",
      wing: "B"
    },
    {
      img: "src/assets/notification-img.png",
      ComplainerName: "Evelyn Harper",
      unitNumber: "1001",
      ComplaintName: "Preventive Measures",
      Description: "Providing false information or deliberately.",
      Priority: "Low",
      Status: "Pending",
      wing: "C"
    },
    {
      img: "src/assets/notification-img.png",
      ComplainerName: "Evelyn Harper",
      unitNumber: "1001",
      ComplaintName: "Unethical Behavior",
      Description: "Providing false information or deliberately.",
      Priority: "High",
      Status: "Open",
      wing: "D"
    },

  ];

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

  const wing = {

    backgroundColor: '#F6F8FB',
    width: "131px",
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#5678E9',
  }
  const Medium = {
    backgroundColor: '#5678E9',
    width: "131px",
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#ffff',
  }
  const Low = {
    backgroundColor: '#39973D',
    padding: '5px 23px',
    borderRadius: '12px',
    color: '#ffff',

  }
  const High = {
    backgroundColor: '#E74C3C',
    padding: '5px 22px',
    borderRadius: '12px',
    color: '#FFFF',
  }
  const Pending = {
    backgroundColor: '#FFC3131A',

    padding: '5px 10px',
    borderRadius: '12px',
    color: '#FFC313',
  }
  const Open = {
    backgroundColor: '#5678E91A',

    padding: '5px 20px',
    borderRadius: '12px',
    color: '#5678E9',
  }
  const Solve = {
    backgroundColor: '#39973D1A',

    padding: '5px 20px',
    borderRadius: '12px',
    color: '#39973D',
  }


  const view = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',

  }

  return (
    <>
      <div className="createTraking">

        <div className="row mt-3 d-flex justify-content-between align-items-center  p-3 m-2 ">
          <h2 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Create Complaint</h2>
          <button className=' col-12 col-md-2 l-btn text-white' onClick={() => setshow(true)} >
            Create Complaint
          </button>
        </div>
        <Modal className='complet-model' show={show} >
          <div className="model">
            <Modal.Header>
              <Modal.Title>Create Complaint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="complete-name">
                <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Name' type="text" />
              </div>
              <div className="complete-name mt-3">
                <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Name' type="text" />
              </div>
              <div className="complete-name mt-3">
                <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder='Enter Description'
                />
              </div>
              <div className="complete-name mt-2 row d-flex">
                <div className="complent-UnitNumber col-12 col-md-6">
                  <label html="" className='labal-name'> UnitNumber <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter UnitNumber' type="text" />
                </div>
                <div className="complelt-unit col-12 col-md-6">
                  <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Unit' type="text" />
                </div>
              </div>
              <div className="complete-name mt-2 ">
                <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                <div className="row gap-3  justify-content-center  ">
                  <div onClick={() => setStatus("High")} className={`  col-md-3  d-flex  align-items-center gap-1 ${status === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: status === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className='  mb-1 ' checked={status === "High"} onChange={handleStatusChange} value="High" />
                    <p className='mt-2'>High</p>
                  </div>
                  <div onClick={() => setStatus("Medium")} className={`  col-md-4  d-flex  align-items-center gap-1  ${status === "Medium" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "Medium" ? "   #FE512E #F09619 " : "#D3D3D3", color: status === "Medium" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className='  mb-1 ' checked={status === "Medium"} onChange={handleStatusChange} value={"Medium"} />
                    <p className='mt-2'>Medium</p>
                  </div>
                  <div onClick={() => setStatus("Low")} className={` col-12 col-md-3  d-flex  align-items-center gap-1  ${status === "Low" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "Low" ? "#FE512E #F09619 " : "#D3D3D3", color: status === "Low" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className='  mb-1 ' checked={status === "Low"} onChange={handleStatusChange} value={"Low"} />
                    <p className='mt-2'>Low</p>
                  </div>
                </div>
              </div>
              <div className="complete-name mt-2 ">
                <label html="" className='labal-name'> Status <span className='text-danger1'>*</span></label>
                <div className="row gap-3 justify-content-center ">
                  <div onClick={() => setStatus1("Open")} className={` col-12 col-md-3  d-flex  align-items-center gap-1 ${status1 === "Open" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Open" ? "   #FE512E #F09619 " : "#D3D3D3", color: status1 === "Open" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25 mb-1 ' checked={status1 === "Open"} onChange={handleStatusChange1} value="Open" />
                    <p className='mt-2'>Open</p>
                  </div>
                  <div onClick={() => setStatus1("Pending")} className={` col-12 col-md-4  d-flex  align-items-center gap-1  ${status1 === "Pending" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Pending" ? "   #FE512E #F09619 " : "#D3D3D3", color: status1 === "Pending" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25 mb-1 ' checked={status1 === "Pending"} onChange={handleStatusChange1} value={"Pending"} />
                    <p className='mt-2'>Pending</p>
                  </div>
                  <div onClick={() => setStatus1("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-1  ${status1 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status1 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25 mb-1 ' checked={status1 === "Solve"} onChange={handleStatusChange1} value={"Solve"} />
                    <p className='mt-2'>Solve</p>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 mt-3">
                <Button
                  className=" cancel-btn radious  "
                  style={{ border: "1px solid #D3D3D3", }}
                  variant=""
                  onClick={() => setshow(false)}
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
                  onClick={createcomplent}
                >
                  Save
                </Button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
        <div className="complent-list">
          <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
            <div className="responsive-table-container">
              <table className="responsive-table">
                <thead className='tabal-header'>
                  <tr>
                    <th className='redious'> &nbsp;&nbsp;  Complainer Name</th>
                    <th>Complaint Name</th>
                    <th> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Description</th>
                    <th>Unit Number</th>
                    <th>  &nbsp; &nbsp;Priority</th>
                    <th> &nbsp;&nbsp; Status</th>
                    <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
                  </tr>
                </thead>
                <tbody>

                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {
                          item.fullName === "" || item.img === "" ? <span><img src="\src\assets\blenck.png" alt="" /> <span>--</span></span> :
                            <span><img src={item.img} alt="" /> <span>  {item.ComplainerName}</span> </span>
                        }
                      </td>
                      <td >   {item.ComplaintName}</td>
                      <td >   {item.Description}</td>
                      <td ><span className='status-badge-wing' style={wing}>{item.wing}</span>   {item.unitNumber}</td>
                      <td >
                        {
                          item.Priority === "Medium" ? <span style={Medium}>{item.Priority}</span> : item.Priority === "Low" ? <span style={Low}>{item.Priority}</span> : <span style={High}>{item.Priority}</span>
                        }
                      </td>
                      <td >
                        {
                          item.Status === "Pending" ? <span style={Pending}>{item.Status}</span> : item.Status === "Open" ? <span style={Open}>{item.Status}</span> : <span style={Solve}>{item.Status}</span>
                        }
                      </td>

                      <td className="action-buttons">
                        <span className=''>
                          <span className={`status-badge-edit mx-2  `} onClick={() => seteditShow(true)}  style={EDITE} >
                            <Edit style={{ cursor: "pointer" }} />
                          </span>
                          <span onClick={() => setshowview(true)} className={`status-badge-view `} style={view} >
                            <VisibilityIcon style={{ cursor: "pointer" }} />
                          </span>
                          <span onClick={() => setshowDelete(true)} className={`status-badge-delete ms-2 `} style={DELETE}>

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
          {/* edit model  */}
          <Modal className='complet-model' show={editShow} >
            <div className="model">
              <Modal.Header>
                <Modal.Title>Edit Complaint</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="complete-name">
                  <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Name' type="text" />
                </div>
                <div className="complete-name mt-3">
                  <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Name' type="text" />
                </div>
                <div className="complete-name mt-3">
                  <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder='Enter Description'
                  />
                </div>
                <div className="complete-name mt-2 row d-flex">
                  <div className="complent-UnitNumber col-12 col-md-6">
                    <label html="" className='labal-name'> UnitNumber <span className='text-danger1'>*</span></label>
                    <input className='input-style' placeholder='Enter UnitNumber' type="text" />
                  </div>
                  <div className="complelt-unit col-12 col-md-6">
                    <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                    <input className='input-style' placeholder='Enter Unit' type="text" />
                  </div>
                </div>
                <div className="complete-name mt-2 ">
                  <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                  <div className="row gap-3  justify-content-center  ">
                    <div onClick={() => setStatus2("High")} className={`  col-md-3  d-flex  align-items-center gap-1 ${status2 === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='  mb-1 ' checked={status === "High"} onChange={handleStatusChange2} value="High" />
                      <p className='mt-2'>High</p>
                    </div>
                    <div onClick={() => setStatus2("Medium")} className={`  col-md-4  d-flex  align-items-center gap-1  ${status2 === "Medium" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Medium" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "Medium" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='  mb-1 ' checked={status2 === "Medium"} onChange={handleStatusChange2} value={"Medium"} />
                      <p className='mt-2'>Medium</p>
                    </div>
                    <div onClick={() => setStatus2("Low")} className={` col-12 col-md-3  d-flex  align-items-center gap-1  ${status2 === "Low" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Low" ? "#FE512E #F09619 " : "#D3D3D3", color: status2 === "Low" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='  mb-1 ' checked={status2 === "Low"} onChange={handleStatusChange2} value={"Low"} />
                      <p className='mt-2'>Low</p>
                    </div>
                  </div>
                </div>
                <div className="complete-name mt-2 ">
                  <label html="" className='labal-name'> Status <span className='text-danger1'>*</span></label>

                  <div className="row gap-3 justify-content-center ">
                    <div onClick={() => setStatus3("Open")} className={` col-12 col-md-3  d-flex  align-items-center gap-1 ${status3 === "Open" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Open" ? "   #FE512E #F09619 " : "#D3D3D3", color: status3 === "Open" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25 mb-1 ' checked={status3 === "Open"} onChange={handleStatusChange3} value="Open" />
                      <p className='mt-2'>Open</p>
                    </div>
                    <div onClick={() => setStatus3("Pending")} className={` col-12 col-md-4  d-flex  align-items-center gap-1  ${status3 === "Pending" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Pending" ? "   #FE512E #F09619 " : "#D3D3D3", color: status3 === "Pending" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25 mb-1 ' checked={status3 === "Pending"} onChange={handleStatusChange3} value={"Pending"} />
                      <p className='mt-2'>Pending</p>
                    </div>
                    <div onClick={() => setStatus3("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-1  ${status3 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status1 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25 mb-1 ' checked={status1 === "Solve"} onChange={handleStatusChange3} value={"Solve"} />
                      <p className='mt-2'>Solve</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    className=" cancel-btn radious  "
                    style={{ border: "1px solid #D3D3D3", }}
                    variant=""
                    onClick={() => setshow3(false)}
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

                    onClick={edit}
                  >
                    Save
                  </Button>
                </div>
              </Modal.Body>
            </div>
          </Modal>
          {/* view mode  */}
          <Modal show={showview} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="PROLIFE">
                <div className="row">
                  <div className="col-12 col-md-2">
                    <img src="/src/assets/Avatar.png" alt="" />
                  </div>
                  <div className="col-12 col-md-6">
                    <h5>Evelyn Harper</h5>
                    <p className='mode-date'>Aug 5, 2024</p>
                  </div>
                </div>
              </div>
              <div className="profile-name">
                <h6 className='fs-5 mode-date' >Request Name</h6>
                <h4>Unethical Behavior</h4>
              </div>
              <div className="Description mt-4">
                <h6 className='fs-5 mode-date' >Description</h6>
                <h6>Offering, giving, receiving, or soliciting  of value to influence the actions of an.</h6>
              </div>
              <div className="ditels mt-3">
                <div className="row">
                  <div className="col-12 col-md-3  ">
                    <p className='mode-date'>wing</p>
                    <p className='ms-2 wing'> <span className='ms-2'>A</span></p>
                  </div>
                  <div className="col-12 col-md-3  ">
                    <p className='mode-date'>Unit</p>
                    <p className=' '> <span className=''>1002</span></p>
                  </div>
                  <div className="col-12 col-md-3  ">
                    <p className='mode-date'>Priority</p>
                    <p className=' Priority'> <span className=''>Medium</span></p>
                  </div>
                  <div className="col-12 col-md-3  ">
                    <p className='mode-date'>Status</p>
                    <p className='open '> <span className=''>Open</span></p>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* delete model */}
          <Modal show={showDelete}>
            <Modal.Header>
              <Modal.Title>Delete Complain?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='mode-date'>Are you sure you want to delate this Complain?</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex gap-3 mt-3">
                <Button
                  className=" cancel-btn radious  "
                  style={{ border: "1px solid #D3D3D3", }}
                  variant=""
                  onClick={() => setshowDelete(false)}
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
                  onClick={deletecomplelnt}
                >
                  Conform
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
