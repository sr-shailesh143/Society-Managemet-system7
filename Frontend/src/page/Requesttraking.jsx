import React, { useEffect, useState } from 'react';
import '../index.css';
import { Button, Box, DialogTitle } from '@mui/material';
import { Delete, Edit, } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from 'react-bootstrap/Modal';
import CloseIcon from '@mui/icons-material/Close';

// import Form from 'react-bootstrap/Form';
import { createRequest, getAllRequests, GetRequest, deleteRequest, updateRequest } from "../apiservices/requestservice"
import { useNavigate } from 'react-router-dom';
export default function Requesttracking() {
  const [show, setshow] = useState(false)
  const handlecancle = () => setshow(false);
  const [status, setStatus] = useState("");
  const [status1, setStatus1] = useState("");
  const handleStatusChange1 = (event) => setStatus1(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const naviget = useNavigate()

  // edit 
  const [editShow, seteditShow] = useState(false)
  const handlecancleEdit = () => seteditShow(false);
  const [status2, setStatus2] = useState("");
  const [status3, setStatus3] = useState("");
  const handleStatusChange2 = (event) => setStatus2(event.target.value);
  const handleStatusChange3 = (event) => setStatus3(event.target.value);

  function edit() {
    seteditShow(false)
  }


  // view 
  const [showview, setshowview] = useState(false)
  const handleClose = () => setshowview(false);
  // delete
  const [showDelete, setshowDelete] = useState(false)
  const [id, setid] = useState("")
  // detele api 
  async function deletecomplelnt(id) {

    await deleteRequest(id)
    getalldata()
    setshowDelete(false)

  }

  // crate api data
  const [compleltData, setcompleltData] = useState({
    complainerName: "",
    complaintName: "",
    wing: "",
    unit: "",
    requestDate: "",

  })


  async function createcomplent() {
    try {
      const data = {
        requesterName: compleltData.complainerName,
        requestName: compleltData.complaintName,
        wing: compleltData.wing,
        unit: compleltData.unit,
        requestDate: compleltData.requestDate,
        priority: status,
        status: status1,
      }

      await createRequest(data)

      getalldata()
      setshow(false)

    } catch (error) {
      console.log(error)
    }

  }
  // data fatch api 
  const [datalist, setdatalist] = useState([])

  const getalldata = async () => {
    const respons = await getAllRequests()
    setdatalist(respons.data.records)
  }

  const [viewdetils, setviewdetils] = useState({})
  async function viewDetails(id) {
    try {
      const respons = await GetRequest(id)

      setviewdetils(respons.data.record)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getalldata()
  }, [compleltData])


  const [editdata, seteditdata] = useState({
  })
  async function handle(id) {
    try {
      const response = await updateRequest(id)
      seteditdata(response.data)
      setStatus2(response.data.priority)
      setStatus3(response.data.status)
    } catch (error) {
      console.log(error)
    }
  }


  async function editRequist() {
    try {
      const data = {
        requesterName: editdata.requesterName,
        requestName: editdata.requestName,
        requestDate: editdata.requestDate,
        wing: editdata.wing,
        unit: editdata.unit,
        priority: status2,
        status: status3,
      }
      await updateRequest(editdata._id, data)
      getalldata()
      handlecancleEdit()
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

  const wing = {

    backgroundColor: '#F6F8FB',
    width: "131px",
    padding: '5px 10px ',
    borderRadius: '12px',
    color: '#5678E9',
    textTransform: "uppercase",
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
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',
    backgroundColor: '#F6F8FB',

  }



  return (
    <>
      <div className="createTraking">

        <div className="row mt-3 d-flex justify-content-between align-items-center  p-3 m-2 ">
          <h2 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Request Tracking</h2>
          <button className=' col-12 col-md-2 l-btn text-white' onClick={() => setshow(true)} >
            Create Request
          </button>
        </div>
        <Modal className='complet-model' show={show} >
          <div className="model">
            <Modal.Header>
              <Modal.Title>Create  Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="complete-name">
                <label html="" className='labal-name'> Requester Name <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                  ...compleltData, complainerName: e.target.value
                })} />
              </div>
              <div className="complete-name mt-3">
                <label html="" className='labal-name'>  Request Name <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                  ...compleltData, complaintName: e.target.value
                })} />
              </div>
              <div className="complete-name mt-3">
                <div className="complete-name mt-3">
                  <label html="" className='labal-name'> Request Date <span className='text-danger1'>*</span></label>
                  <input className='input-style' name="begin"
                    placeholder="dd-mm-yyyy" type="date" onChange={(e) => setcompleltData({
                      ...compleltData, requestDate: e.target.value
                    })} />
                </div>
              </div>
              <div className="complete-name mt-2 row d-flex">
                <div className="complent-UnitNumber col-12 col-md-6">
                  <label html="" className='labal-name'> Wing <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Wing' type="text" onChange={(e) => setcompleltData({
                    ...compleltData, wing: e.target.value
                  })} />
                </div>
                <div className="complelt-unit col-12 col-md-6">
                  <label html="" className='labal-name'> Unit <span className='text-danger1'>*</span></label>
                  <input className='input-style mt-1' placeholder='Enter Unit' type="number" onChange={(e) => setcompleltData({
                    ...compleltData, unit: e.target.value
                  })} />
                </div>
              </div>
              <div className="complete-name mt-2 ">
                <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                <div className="row gap-3  justify-content-center  ">
                  <div onClick={() => setStatus("High")} className={`  col-md-3  d-flex  align-items-center gap-2 ${status === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: status === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' radio polls-radio' checked={status === "High"} onChange={handleStatusChange} value="High" />
                    <p className='mt-3'>High</p>
                  </div>
                  <div onClick={() => setStatus("Medium")} className={`  col-md-4  d-flex  align-items-center gap-2  ${status === "Medium" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "Medium" ? "   #FE512E #F09619 " : "#D3D3D3", color: status === "Medium" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' radio polls-radio  ' checked={status === "Medium"} onChange={handleStatusChange} value={"Medium"} />
                    <p className='mt-3'>Medium</p>
                  </div>
                  <div onClick={() => setStatus("Low")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status === "Low" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status === "Low" ? "#FE512E #F09619 " : "#D3D3D3", color: status === "Low" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' radio polls-radio  ' checked={status === "Low"} onChange={handleStatusChange} value={"Low"} />
                    <p className='mt-3'>Low</p>
                  </div>
                </div>
              </div>
              <div className="complete-name mt-2 ">
                <label html="" className='labal-name'> Status <span className='text-danger1'>*</span></label>
                <div className="row gap-3 justify-content-center ">
                  <div onClick={() => setStatus1("Open")} className={` col-12 col-md-3  d-flex  align-items-center gap-2 ${status1 === "Open" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Open" ? "   #FE512E #F09619 " : "#D3D3D3", color: status1 === "Open" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25  radio polls-radio  ' checked={status1 === "Open"} onChange={handleStatusChange1} value={"Open"} />
                    <p className='mt-3'>Open</p>
                  </div>
                  <div onClick={() => setStatus1("Pending")} className={` col-12 col-md-4  d-flex  align-items-center gap-2  ${status1 === "Pending" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Pending" ? "   #FE512E #F09619 " : "#D3D3D3", color: status1 === "Pending" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25  radio polls-radio  ' checked={status1 === "Pending"} onChange={handleStatusChange1} value={"Pending"} />
                    <p className='mt-3'>Pending</p>
                  </div>
                  <div onClick={() => setStatus1("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status1 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status1 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status1 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                    <input type="radio" className=' w-25  radio polls-radio  ' checked={status1 === "Solve"} onChange={handleStatusChange1} value={"Solve"} />
                    <p className='mt-3'>Solve</p>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 mt-3">
                <Button
                  className=" cancel-btn radious  "
                  style={{ border: "1px solid #D3D3D3", }}
                  variant=""
                  onClick={handlecancle}
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
                  Create
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
                    <th className='redious' style={{ textAlign: "center" }}> &nbsp;&nbsp; Requester Name</th>
                    <th style={{ textAlign: "center" }}>  &nbsp; &nbsp;  &nbsp;Request Name</th>
                    <th style={{ textAlign: "center" }}> &nbsp; Request Date</th>

                    <th style={{ textAlign: "center" }}>Unit Number</th>
                    <th style={{ textAlign: "center" }}>  &nbsp; &nbsp;Priority</th>
                    <th style={{ textAlign: "center" }}> &nbsp;&nbsp; Status</th>
                    <th className='redious1' style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
                  </tr>
                </thead>
                <tbody>

                  {datalist.map((item) => (
                    <tr key={item._id}>
                      {/* Requester Info */}
                      <td style={{ textAlign: "center" }}>
                        {item.requesterName === "" || item.img === "" ? (
                          <span>
                            <img src="\src\assets\blenck.png" alt="Placeholder" />
                            <span> --</span>
                          </span>
                        ) : (
                          <span>
                            <img src="\src\assets\Avatar.png" alt="Avatar" />
                            <span> {item.requesterName}</span>
                          </span>
                        )}
                      </td>

                      {/* Request Name */}
                      <td style={{ textAlign: "center" }}>
                        <span className="ms-3">{item.requestName}</span>
                      </td>

                      {/* Request Date */}
                      <td style={{ textAlign: "center" }}>
                        <span>
                          {new Date(item.requestDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Wing and Unit */}
                      <td style={{ textAlign: "center" }}>
                        <span className="status-badge-wing" style={wing}>{item.wing}</span> {item.unit}
                      </td>

                      {/* Priority */}
                      <td style={{ textAlign: "center" }}>
                        {item.priority === "Medium" ? (
                          <span style={Medium}>{item.priority}</span>
                        ) : item.priority === "Low" ? (
                          <span style={Low}>{item.priority}</span>
                        ) : (
                          <span style={High}>{item.priority}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ textAlign: "center" }}>
                        {item.status === "Pending" ? (
                          <span style={Pending}>{item.status}</span>
                        ) : item.status === "Open" ? (
                          <span style={Open}>{item.status}</span>
                        ) : (
                          <span style={Solve}>{item.status}</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="action-buttons" style={{ textAlign: "center" }}>
                        <span>
                          {/* Edit */}
                          <span
                            className="status-badge-edit mx-2"
                            onClick={() => {
                              seteditShow(true);
                              handle(item._id);
                            }}
                            style={EDITE}
                          >
                            <Edit style={{ cursor: "pointer" }} />
                          </span>

                          {/* View */}
                          <span
                            className="status-badge-view"
                            onClick={() => {
                              setshowview(true);
                              viewDetails(item._id);
                            }}
                            style={view}
                          >
                            <VisibilityIcon style={{ cursor: "pointer" }} />
                          </span>

                          {/* Delete */}
                          <span
                            className="status-badge-delete ms-2"
                            onClick={() => {
                              setshowDelete(true);
                              setid(item._id);
                            }}
                            style={DELETE}
                          >
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
                <Modal.Title>Edit  Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="complete-name">
                  <label html="" className='labal-name'> Requester Name<span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Name' type="text" value={editdata.requesterName} onChange={(e) => seteditdata({
                    ...editdata, requesterName: e.target.value
                  })} />
                </div>
                <div className="complete-name mt-3">
                  <label html="" className='labal-name'> Request Name<span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Name' type="text" value={editdata.requestName} onChange={(e) => seteditdata({
                    ...editdata, requestName: e.target.value
                  })} />
                </div>
                <div className="complete-name mt-3">
                  <div className="complete-name mt-3">
                    <label html="" className='labal-name'>  Request Date <span className='text-danger1'>*</span></label>
                    <input className='input-style' name="begin"
                      placeholder="dd-mm-yyyy" type="date" value={editdata.requestDate} onChange={(e) => seteditdata({
                        ...editdata, requestDate: e.target.value
                      })} />
                  </div>
                </div>
                <div className="complete-name mt-2 row d-flex">
                  <div className="complent-UnitNumber col-12 col-md-6">
                    <label html="" className='labal-name'> Wing <span className='text-danger1'>*</span></label>
                    <input className='input-style ' placeholder='Enter wing' type="text" value={editdata.wing} onChange={(e) => seteditdata({
                      ...editdata, wing: e.target.value
                    })} />
                  </div>
                  <div className="complelt-unit col-12 col-md-6">
                    <label html="" className='labal-name'> Unit <span className='text-danger1'>*</span></label>
                    <input className='input-style mt-1' placeholder='Enter Unit' type="number" value={editdata.unit} onChange={(e) => seteditdata({
                      ...editdata, unit: e.target.value
                    })} />
                  </div>
                </div>
                <div className="complete-name mt-2 ">
                  <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                  <div className="row gap-3  justify-content-center  ">
                    <div onClick={() => setStatus2("High")} className={`  col-md-3  d-flex  align-items-center gap-2 ${status2 === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='radio polls-radio   ' checked={status2 === "High"} onChange={handleStatusChange2} value="High" />
                      <p className='mt-3'>High</p>
                    </div>
                    <div onClick={() => setStatus2("Medium")} className={`  col-md-4  d-flex  align-items-center gap-2  ${status2 === "Medium" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Medium" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "Medium" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='radio polls-radio   ' checked={status2 === "Medium"} onChange={handleStatusChange2} value={"Medium"} />
                      <p className='mt-3'>Medium</p>
                    </div>
                    <div onClick={() => setStatus2("Low")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status2 === "Low" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Low" ? "#FE512E #F09619 " : "#D3D3D3", color: status2 === "Low" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' radio polls-radio   ' checked={status2 === "Low"} onChange={handleStatusChange2} value={"Low"} />
                      <p className='mt-3'>Low</p>
                    </div>
                  </div>
                </div>
                <div className="complete-name mt-2 ">
                  <label html="" className='labal-name'> Status <span className='text-danger1'>*</span></label>

                  <div className="row gap-3 justify-content-center ">
                    <div onClick={() => setStatus3("Open")} className={` col-12 col-md-3  d-flex  align-items-center gap-2 ${status3 === "Open" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Open" ? "   #FE512E #F09619 " : "#D3D3D3", color: status3 === "Open" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' radio polls-radio w-25  ' checked={status3 === "Open"} onChange={handleStatusChange3} value="Open" />
                      <p className='mt-3'>Open</p>
                    </div>
                    <div onClick={() => setStatus3("Pending")} className={` col-12 col-md-4  d-flex  align-items-center gap-2  ${status3 === "Pending" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Pending" ? "   #FE512E #F09619 " : "#D3D3D3", color: status3 === "Pending" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25 radio polls-radio  ' checked={status3 === "Pending"} onChange={handleStatusChange3} value={"Pending"} />
                      <p className='mt-3'>Pending</p>
                    </div>
                    <div onClick={() => setStatus3("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status3 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status1 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25  radio polls-radio ' checked={status3 === "Solve"} onChange={handleStatusChange3} value={"Solve"} />
                      <p className='mt-3'>Solve</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} onClick={handlecancleEdit}  >
                    Cancel
                  </Button>


                  <Button
                    className="save-btn radious l-btn "
                    style={{
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}

                    onClick={editRequist}
                  >

                    Save
                  </Button>
                </div>
              </Modal.Body>
            </div>
          </Modal>
          {/* view mode  */}
          <Modal show={showview} onHide={handleClose}  >
            <div className="div" style={{ borderRadius: "10%" }}>


              <Modal.Header className='bg-white' style={{ height: "60px" }}>
                {/* <Modal.Title>
           
           
          </Modal.Title> */}
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  <h> View Complain </h>
                </DialogTitle>
                <span style={{ cursor: "pointer" }} onClick={handleClose}>
                  <CloseIcon className='mb-2 fs-3' />

                </span>
              </Modal.Header>
              <Modal.Body className='viewcomplete'>
                {/* profile */}
                <div className="profile-name d-flex gap-2 ">
                  <div className="" style={{ width: "70px", height: "70px", }}>
                    <img src="\src\assets\Avatar.png" alt="" style={{ width: "70px", height: "70px", border: "3px solid #F4F4F4", borderRadius: "50%" }} />
                  </div>
                  <div className="profileName mt-1">
                    <h5>{viewdetils.requesterName}</h5>
                    <p className='mode-date'> {new Date(viewdetils.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                </div>
                {/* requist name */}
                <div className="requistname mt-2">
                  <h6 className='mode-date fs-5'>
                    Request Name
                  </h6>
                  <h6>
                    {viewdetils.requestName}
                  </h6>
                </div>
                {/* Description  */}
                <div className="Description mt-3">
                  <h6 className='mode-date fs-5'>Description</h6>
                  <p>{viewdetils.Description}</p>
                </div>
                {/* wing-unit-priority-status */}
                <div className="additional-info d-flex gap-3">
                  <div>
                    <h6 className='mode-date'>Wing</h6>
                    <span style={wing}>{viewdetils.wing}</span>
                  </div>
                  <div className='ms-1'>
                    <h6 className='mode-date'>Unit</h6>
                    <span >{viewdetils.unit}</span>
                  </div>
                  <div className='ms-2'>
                    <h6 className='mode-date'>Priority</h6>
                    {
                      viewdetils.priority === "Medium" ? <span style={Medium}>{viewdetils.priority}</span> : viewdetils.priority === "Low" ? <span style={Low}>{viewdetils.priority}</span> : <span style={High}>{viewdetils.priority}</span>
                    }
                  </div>
                  <div className='ms-2'>
                    <h6 className='mode-date'>Status</h6>
                    {
                      viewdetils.status === "Pending" ? <span style={Pending}>{viewdetils.status}</span> : viewdetils.status === "Open" ? <span style={Open}>{viewdetils.status}</span> : <span style={Solve}>{viewdetils.status}</span>
                    }
                  </div>
                </div>
              </Modal.Body>
            </div>
          </Modal>
          {/* delete model */}
          <Modal show={showDelete}>
            <Modal.Header>
              <Modal.Title>Delete Request?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='mode-date'>Are you sure you want to delate this Request?</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex gap-3 mt-3">
                <Button className="save-btn radious   " style={{ color: "#202224", border: "1px solid #D3D3D3", cursor: "pointer" }} variant="outlined" onClick={() => setshowDelete(false)} >
                  Cancel
                </Button>
                <Button className="save-btn radious  text-white " style={{ backgroundColor: "#E74C3C", border: "none", cursor: "pointer" }} onClick={() => deletecomplelnt(id)} >
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