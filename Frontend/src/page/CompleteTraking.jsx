import React, { useEffect, useState } from 'react';
import '../index.css';
import { Button, Box, DialogTitle } from '@mui/material';
import { Delete, Edit, } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { createComplaint, getAllComplaints, GetComplaint, deleteComplaint, updateComplaint } from "../apiservices/complaintservice"
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function CompleteTracking() {
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
  const [status3, setStatus3] = useState({});
  const handleStatusChange2 = (event) => setStatus2(event.target.value);
  const handleStatusChange3 = (event) => setStatus3(event.target.value);

  // view 
  const [showview, setshowview] = useState(false)
  const handleClose = () => setshowview(false);
  // delete
  const [showDelete, setshowDelete] = useState(false)
  const [id, setid] = useState({
    id: ""
  })
  // detele api 
  async function deletecomplelnt(id) {

    await deleteComplaint(id)
    getalldata()
    setshowDelete(false)

  }

  // crate api data
  const [compleltData, setcompleltData] = useState({
    complainerName: "",
    complaintName: "",
    description: "",
    wing: "",
    unit: "",

  })


  async function createcomplent() {
    try {
      const data = {
        complainerName: compleltData.complainerName,
        complaintName: compleltData.complaintName,
        description: compleltData.description,
        wing: compleltData.wing,
        unit: compleltData.unit,
        priority: status,
        status: status1,
      }

      const respons = await createComplaint(data)
      console.log(respons)
      getalldata()
      setshow(false)
      naviget("/traking")

    } catch (error) {
      console.log(error)
    }

  }
  // data fatch api 
  const [datalist, setdatalist] = useState([])

  const getalldata = async () => {
    const respons = await getAllComplaints()
    setdatalist(respons.data.records)
  }

  const [viewdetils, setviewdetils] = useState({})
  async function viewDetails(id) {
    try {
      const respons = await GetComplaint(id)

      setviewdetils(respons.data.record)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getalldata()
  }, [compleltData])




  const [content, setContent] = useState({

  });
  async function handle(_id) {
    try {
      const response = await updateComplaint(_id)

      setContent(response.data.data)
      setStatus3(response.data.data.status)
      setStatus2(response.data.data.priority)
    } catch (error) {
      console.log(error)
    }
  }

  async function edithandel() {
    try {
      const data = {
        complainerName: content.complainerName,
        complaintName: content.complaintName,
        description: content.description,
        wing: content.wing,
        unit: content.unit,
        priority: status2,
        status: status3,
      }
      console.log(data)
      const response = await updateComplaint(content._id, data)
      console.log(response.data.data)
      seteditShow(false)
      getalldata()

    } catch (error) {

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
    padding: '5px 10px',
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
                <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                  ...compleltData, complainerName: e.target.value
                })} />
              </div>
              <div className="complete-name mt-3">
                <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                  ...compleltData, complaintName: e.target.value
                })} />
              </div>
              <div className="complete-name mt-3">
                <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  onChange={(e) => setcompleltData({
                    ...compleltData, description: e.target.value
                  })}
                  placeholder='Enter Description'
                />
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
                  Save
                </Button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
        <div className="complent-list">
          <Box className="radious" bgcolor={"white"} sx={{ height: '380px', width: '100%', padding: 2 }}>
            <div className="responsive-table-container">
              <table className="responsive-table">
                <thead className='tabal-header'>
                  <tr>
                    <th className='redious' style={{ textAlign: "center" }}> &nbsp;&nbsp;  Complainer Name</th>
                    <th style={{ textAlign: "center" }}>  &nbsp; &nbsp;  &nbsp;Complaint Name</th>
                    <th className='justify-content-center' style={{ textAlign: "center" }}> &nbsp; Description</th>
                    <th>Unit Number</th>
                    <th>  &nbsp; &nbsp;Priority</th>
                    <th> &nbsp;&nbsp; Status</th>
                    <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
                  </tr>
                </thead>
                <tbody>

                  {datalist.map((item) => (
                    <tr >
                      <td style={{ textAlign: "center" }}>
                        {
                          item.complainerName === "" || item.img === "" ? <span><img src="\src\assets\blenck.png" alt="" /> <span>--</span></span> :
                            <span><img src="\src\assets\Avatar.png" alt="" /> <span>  {item.complainerName}</span> </span>
                        }
                      </td>
                      <td style={{ textAlign: "center" }} > <spa className='ms-3'> {item.complaintName}</spa> </td>

                      <td style={{ textAlign: "center" }}> <span  >{item.description}</span>  </td>
                      <td ><span className='status-badge-wing' style={wing}>{item.wing}</span>   {item.unit}</td>
                      <td >
                        {
                          item.priority === "Medium" ? <span style={Medium}>{item.priority}</span> : item.priority === "Low" ? <span style={Low}>{item.priority}</span> : <span style={High}>{item.priority}</span>
                        }
                      </td>
                      <td >
                        {
                          item.status === "Pending" ? <span style={Pending}>{item.status}</span> : item.status === "Open" ? <span style={Open}>{item.status}</span> : <span style={Solve}>{item.status}</span>
                        }
                      </td>

                      <td className="action-buttons">
                        <span className=''>
                          <span className={`status-badge-edit mx-2  `} onClick={() => seteditShow(true) || handle(item._id)} style={EDITE} >
                          <svg className='cursor' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#39973D" />
                        </svg>
                          </span>
                          <span onClick={() => setshowview(true) || viewDetails(item._id)} className={`status-badge-view `} style={view} >
                          <svg className='cursor' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                          <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                        </svg>
                          </span>
                          <span onClick={() => setshowDelete(true) || setid(item._id)} className={`status-badge-delete ms-2 `} style={DELETE}>

                          <svg className='cursor' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#E74C3C" />
                          <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#E74C3C" />
                        </svg>
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
                  <input className='input-style' placeholder='Enter Name' type="text" value={content.complainerName}
                    onChange={(e) => setContent({
                      ...content, complainerName: e.target.value
                    })}
                  />
                </div>
                <div className="complete-name mt-3">
                  <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Name' type="text" value={content.complaintName}
                    onChange={(e) => setContent({
                      ...content, complaintName: e.target.value
                    })}
                  />
                </div>
                <div className="complete-name mt-3">
                  <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder='Enter Description'
                    onChange={(e) => setContent({
                      ...content, description: e.target.value
                    })}
                    value={content.description}
                  />
                </div>
                <div className="complete-name mt-2 row d-flex">
                  <div className="complent-UnitNumber col-12 col-md-6">
                    <label html="" className='labal-name'> wing <span className='text-danger1'>*</span></label>
                    <input className='input-style ' placeholder='Enter wing' type="text" onChange={(e) => setContent({
                      ...content, wing: e.target.value
                    })}
                      value={content.wing}
                    />
                  </div>
                  <div className="complelt-unit col-12 col-md-6">
                    <label html="" className='labal-name'> Units <span className='text-danger1'>*</span></label>
                    <input className='input-style mt-1' placeholder='Enter Unit' type="number" onChange={(e) => setContent({
                      ...content, unit: e.target.value
                    })}
                      value={content.unit}
                    />
                  </div>
                </div>
                <div className="complete-name mt-2 ">
                  <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                  <div className="row gap-3  justify-content-center  ">
                    <div onClick={() => setStatus2("High")} className={`  col-md-3  d-flex  align-items-center gap-2 ${status2 === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className='radio polls-radio   ' checked={status2 === "High"} onChange={handleStatusChange2} value={content.priority} />
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
                    <div onClick={() => setStatus3("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status3 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status3 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status3 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                      <input type="radio" className=' w-25  radio polls-radio ' checked={status3 === "Solve"} onChange={handleStatusChange3} value={"Solve"} />
                      <p className='mt-3'>Solve</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    className=" cancel-btn radious  "
                    style={{ border: "1px solid #D3D3D3", }}
                    variant=""
                    onClick={handlecancleEdit}
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

                    onClick={edithandel}
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
                    <h5>{viewdetils.complainerName}</h5>
                    <p className='mode-date'> {new Date(viewdetils.createdAt).toLocaleDateString('en-US', {
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
                    {viewdetils.complaintName}
                  </h6>
                </div>
                {/* Description  */}
                <div className="Description mt-3">
                  <h6 className='mode-date fs-5'>Description</h6>
                  <p>{viewdetils.description}</p>
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
              <Modal.Title>Delete Complain?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='mode-date'>Are you sure you want to delate this Complain?</p>
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
                  onClick={() => deletecomplelnt(id)}
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
