import { Box, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { CreateSecurityGuard, GetallSecurityGuards, GetSecurityGuard, DeleteSecurityGuard, UpdateSecurityGuard } from "../apiservices/securityservice"
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { Delete, Image } from '@mui/icons-material';
import { Button, Modal } from 'react-bootstrap';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDropzone } from 'react-dropzone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Loder from '../loder/Loder';


export default function SecurityGuard() {

  const [SecurityData, setSecurityData] = useState([])
  const [loading, setloading] = useState(false);
  async function GetAllSecurityData() {
    try {
      const response = await GetallSecurityGuards()
      setSecurityData(response.data.records)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fatch Allsecurity Please try again.");
    }
  }


  useEffect(() => {
    GetAllSecurityData()
  }, [])
  const [CreateSecurityOpen, setCreateSecurityOpen] = useState(false)
  const opencreateModal = () => setCreateSecurityOpen(true)
  const closeCreateModal = () => setCreateSecurityOpen(false)
  const [createSecurityData, setcreateSecurityData] = useState({
    fullName: "",
    MailOrPhone: "",
    gender: "",
    shift: "",
    shiftDate: "",
    shiftTime: "",


  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',

    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]), 

  });
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "photo") setPhoto(files[0]);
    if (name === "file") setFile(files[0]);
  };

  async function CREATESECURITY(e) {
    e.preventDefault();

    if (!photo || !file) {
      alert("Please upload both photo and file!");
      return;
    }
    const data = {


      ...createSecurityData,
      photo: photo,
      aadharCard: file
    }
    try {
      setloading(true)
      await CreateSecurityGuard(data)
      setloading(false)
      closeCreateModal()
      GetAllSecurityData()
      setloading(false)
      toast.success(" CreateSecurity Guard  successfully!")

    } catch (error) {
      console.log(error)
      toast.error(" Failed to CreateSecurity Guard  Please try again.")
    }
  }

  const [editOpensecurity, seteditOpensecurity] = useState(false)
  const CloseEditsecurity = () => seteditOpensecurity(false)

  const [editSecurityData, seteditSecurityData] = useState({})
  const [editphote, seteditphote] = useState(null)

  const handleFileChangeEdit = (e) => {
    const { name, files } = e.target;
    if (name === "photo") seteditphote(files[0]);

  };
  async function handalEditSecurity(id) {
    try {
      const response = await UpdateSecurityGuard(id)
      seteditSecurityData(response.data.security)
      seteditphote(response.data.security.photo)
    } catch (error) {
      console.log(error)
    }
  }

  async function editsecurity(e) {
    e.preventDefault();

    if (!editphote) {
      alert("Please upload both photo and file!");
      return;
    }

    const data = {
      ...editSecurityData,
      photo: editphote,
    }
    try {
      await UpdateSecurityGuard(editSecurityData._id, data)
      GetAllSecurityData()
      CloseEditsecurity()

      toast.success(" Update security successfully!")
    } catch (error) {
      console.log(error)
      toast.error(" Update security  !fild plase try again ")
    }
  }



  const [viewModalSecurity, setviewModalSecurity] = useState(false)
  const CloseViewModdal = () => setviewModalSecurity(false)
  const [ViewSecurityData, setViewSecurityData] = useState({})
  async function ViewSecurityModal(id) {
    try {
      const respons = await GetSecurityGuard(id)
      setViewSecurityData(respons.data.record)
    } catch (error) {
      console.log(error)

    }
  }




  const [deleteSecurityModal, setdeleteSecurityModal] = useState(false)
  const handleDeleteColse = () => setdeleteSecurityModal(false)
  const [_id, setid] = useState("")
  console.log(_id)
  async function deleteSecurity(id) {
    try {
      await DeleteSecurityGuard(id)
      handleDeleteColse()
      GetAllSecurityData()
      toast.success(" Delete security successfully!")
    } catch (error) {
      console.log(error)
      toast.error(" delete securityguard !fild plase try again  ")
    }
  }


  const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 14px;
`;
  const Male = { backgroundColor: '#21A8E41A', padding: '5px 22px', borderRadius: '12px', color: '#5678E9', }
  const Female = { backgroundColor: '#FE76A81A', padding: '5px 10px', borderRadius: '12px', color: '#FE76A8', }
  const Day = { backgroundColor: '#F4F4F4', padding: '5px 25px', borderRadius: '12px', color: '#FF9300', }
  const Night = { backgroundColor: '#4F4F4F', padding: '5px 20px', borderRadius: '12px', color: '#FFFFFF', }
  const blanck = { backgroundColor: '#F6F8FB', padding: '5px 25px', borderRadius: '12px', color: '#4F4F4F', }
  const EDITE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#39973D',
    cursor: "pointer"
  };
  const DELETE = {
    backgroundColor: '#F6F8FB',
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#E74C3C',
    cursor: "pointer"
  };
  const VIEW = {
    padding: '10px 10px',
    borderRadius: '12px',
    color: '#5678E9',
    backgroundColor: '#F6F8FB',
    cursor: "pointer"
  };

  return (
    <div className='createTraking '>


      <Box className="radious" bgcolor={"white"} sx={{ height: '700px', width: '100%', padding: 2 }}>
        <div className="row mt-3 d-flex justify-content-between align-items-center  p-3 m-2 ">
          <h4 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Security Guard Details</h4>
          <div className="col-12 col-md-2 mt-2 add-p-btn  ">
            <button className=' add-btn w-75' onClick={opencreateModal}> <span ><FaPlusCircle /></span> <span>Add Security</span> </button>
          </div>
        </div>
        <div className="responsive-table-container" style={{ height: "630px" }}>
          <table className="responsive-table">
            <thead className='tabal-header'>
              <tr>
                <th className='redious'> &nbsp;&nbsp;   Security Guard Name</th>
                <th>Phone Number</th>
                <th> &nbsp;&nbsp;&nbsp;Select Shift</th>
                <th>  Shift Date</th>
                <th>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Shift Time</th>
                <th>  &nbsp;&nbsp; &nbsp;&nbsp;Gender</th>
                <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; Action</th>
              </tr>
            </thead>
            <tbody className='sroll'>
              {SecurityData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {
                      item.fullName === "" || item.photo === "" ? <span><img src="\src\assets\blenck.png" alt="" /> <span>--</span></span> :
                        <span> <UserAvatar

                          src={item?.photo || "src/assets/Avatar.png"}
                          alt={item?.photo || "User"}
                          style={{ cursor: "pointer" }}
                        />
                          <span className='ms-2'>  {item.fullName}</span> </span>
                    }
                  </td>
                  <td><span className=''>{item.MailOrPhone}</span></td>
                  <td>{item.shift === "Day" ? <span style={Day}>  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" fill="#FF9300" />
                    <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" fill="#FF9300" />
                  </svg>{item.shift}</span> : <span style={Night}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5302 15.9301C21.3702 15.6601 20.9202 15.2401 19.8002 15.4401C19.1802 15.5501 18.5502 15.6001 17.9202 15.5701C15.5902 15.4701 13.4802 14.4001 12.0102 12.7501C10.7102 11.3001 9.9102 9.41012 9.9002 7.37012C9.9002 6.23012 10.1202 5.13012 10.5702 4.09012C11.0102 3.08012 10.7002 2.55012 10.4802 2.33012C10.2502 2.10012 9.7102 1.78012 8.6502 2.22012C4.5602 3.94012 2.0302 8.04012 2.3302 12.4301C2.6302 16.5601 5.5302 20.0901 9.3702 21.4201C10.2902 21.7401 11.2602 21.9301 12.2602 21.9701C12.4202 21.9801 12.5802 21.9901 12.7402 21.9901C16.0902 21.9901 19.2302 20.4101 21.2102 17.7201C21.8802 16.7901 21.7002 16.2001 21.5302 15.9301Z" fill="#FFFFFF" />
                  </svg>
                      {item.shift}</span>}
                  </td>
                  <td><span className=''>  {new Date(item.shiftDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}</span></td>
                  <td>
                    <span style={blanck}>
                      {new Date(`1970-01-01T${item.shiftTime}:00`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </td>
                  <td>{item.gender === "Male" ? <span style={Male}> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#5678E9" />
                    <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#5678E9" />
                  </svg>
                    {item.gender}</span> : item.gender === "Female" ? <span style={Female}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.96792 10.7971C6.7434 10.4934 6.67736 10.1037 6.78302 9.74052L7.93208 5.91694C8.60566 3.67165 10.9698 2.39713 13.2151 3.07071C14.5821 3.48014 15.6519 4.54996 16.0613 5.91694L17.217 9.73392C17.4085 10.3679 17.0519 11.0283 16.4179 11.2198C16.3057 11.2528 16.1868 11.2726 16.0745 11.2726H7.92547C7.54906 11.2792 7.19245 11.0943 6.96792 10.7971ZM19 19.8839C19 20.5443 18.4651 21.0792 17.8047 21.0792H6.19528C5.53491 21.0792 5 20.5443 5 19.8839C5 16.0207 8.13679 12.8707 12 12.8707C15.8632 12.8707 19 16.0207 19 19.8839Z" fill="#FE76A8" />
                    </svg>

                      {item.gender} </span> : <span style={blanck}> &#9893;
                    {item.gender}</span>}
                  </td>
                  <td className="action-buttons">
                    <div className="d-flex gap-2">
                      <span className="status-badge-edit" style={EDITE} onClick={() => seteditOpensecurity(true) || handalEditSecurity(item._id)} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#39973D" />
                        </svg>

                      </span>
                      <span className="status-badge-view" style={VIEW} onClick={() => setviewModalSecurity(true) || ViewSecurityModal(item._id)}   >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                          <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                        </svg>

                      </span>
                      <span className="status-badge-delete" style={DELETE} onClick={() => setdeleteSecurityModal(true) || setid(item._id)} >
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

      {/* create security */}

      <form method='post' enctype="multipart/form-data">

        <Modal show={CreateSecurityOpen} >

        
          

              <Modal.Header >
                <Modal.Title>Add Security</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3" >
                  <label htmlFor="photo" className="form-label d-flex align-items-center">
                    <label htmlFor="photo" className="image-upload-label d-flex justify-content-center align-items-center">
                      <span>+</span>
                    </label>
                    <a >Add Photo</a>
                  </label>
                  <input type="file" id="photo" accept="image/*" className="form-control d-none" name="photo" value={editSecurityData.photo} onChange={handleFileChange} />
                </div>
                <div className="complete-name">
                  <label html="" className='labal-name'>Full Name<span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Full Name' type="text"
                    onChange={(e) => setcreateSecurityData({
                      ...createSecurityData, fullName: e.target.value
                    })}
                  />
                </div>
                <div className="complete-name">
                  <label html="" className='labal-name'>Phone Number<span className='text-danger1'>*</span></label>
                  <input className='input-style' placeholder='Enter Phone Number or Mail' type="text"
                    onChange={(e) => setcreateSecurityData({
                      ...createSecurityData, MailOrPhone: e.target.value
                    })}
                  />
                </div>
                <div className="mt-2 row d-flex">
                  <div className=" col-12 col-md-6">
                    <label html="" className='labal-name'> Gender <span className='text-danger1'>*</span></label>
                    <select className="gender" required onChange={(e) => setcreateSecurityData({
                      ...createSecurityData, gender: e.target.value
                    })} >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="complelt-unit col-12 col-md-6">
                    <div className=" col-12 col-md-5">
                      <label html="" className='labal-name'> Shift <span className='text-danger1'>*</span></label>
                      <select className="gender1" required onChange={(e) => setcreateSecurityData({
                        ...createSecurityData, shift: e.target.value
                      })}>
                        <option value="">Select Shift</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="complete-name mt-2 row d-flex">
                  <div className="complent-UnitNumber col-12 col-md-6">
                    <label html="" className='labal-name'> Shift Date <span className='text-danger1'>*</span></label>
                    <input className='input-style gender1 ' placeholder='Enter wing' type="date" onChange={(e) => setcreateSecurityData({
                      ...createSecurityData, shiftDate: e.target.value
                    })}

                    />
                  </div>
                  <div className="complelt-unit col-12 col-md-6">
                    <label html="" className='labal-name'> Shift Time <span className='text-danger1'>*</span></label>
                    <input className='input-style  gender1' placeholder='Enter Unit' type="time" onChange={(e) => setcreateSecurityData({
                      ...createSecurityData, shiftTime: e.target.value
                    })}

                    />
                  </div>
                </div>
                <div {...getRootProps()} className="file-upload mt-3">
                  <input {...getInputProps()} name="file" onChange={handleFileChange} />
                  <div className="upload-area">
                    <AddPhotoAlternateIcon className="fs-1" />
                    <p>Upload a file or drag and drop</p>
                    <small>PNG, JPG, GIF up to 10MB</small>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <Button className="save-btn radious   " style={{ color: "#202224", border: "1px solid #D3D3D3", cursor: "pointer" }} variant="outlined" onClick={closeCreateModal} >
                    Cancel
                  </Button>
                  <Button
                    className="save-btn radious l-btn "
                    style={{
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}

                    onClick={CREATESECURITY}
                  >

                    {loading ? <Loder />:"Create"}
                  </Button>
                </div>
              </Modal.Body>

          
        

        </Modal>
      </form>


      {/* edit security Modal */}
      <form method='post' enctype="multipart/form-data">
        <Modal show={editOpensecurity} >
          <Modal.Header >
            <Modal.Title>Add Security</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3" >
              <label htmlFor="photo" className="form-label d-flex align-items-center">
                <label htmlFor="photo" className="image-upload-label d-flex justify-content-center align-items-center">
                  <span className='edit-img'><img src={editSecurityData.photo} alt="" className='edit-img' /></span>
                </label>
                <a >Add Photo</a>
              </label>
              <input type="file" id="photo" accept="image/*" className="form-control d-none" name="photo" onChange={handleFileChangeEdit} />
            </div>
            <div className="complete-name">
              <label html="" className='labal-name'>Full Name<span className='text-danger1'>*</span></label>
              <input className='input-style' placeholder='Enter Phone Number or Mail' type="text"
                onChange={(e) => seteditSecurityData({
                  ...editSecurityData, fullName: e.target.value
                })}
                value={editSecurityData.fullName}
              />
            </div>
            <div className="complete-name">
              <label html="" className='labal-name'>Phone Number<span className='text-danger1'>*</span></label>
              <input className='input-style' placeholder='Enter Full Name' type="text"
                onChange={(e) => seteditSecurityData({
                  ...editSecurityData, MailOrPhone: e.target.value
                })}
                value={editSecurityData.MailOrPhone}
              />
            </div>
            <div className="mt-2 row d-flex">
              <div className=" col-12 col-md-6">
                <label html="" className='labal-name'> Gender <span className='text-danger1'>*</span></label>
                <select className="gender" value={editSecurityData.gender} required onChange={(e) => seteditSecurityData({
                  ...editSecurityData, gender: e.target.value
                })} >
                  value={editSecurityData.fullName}
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="complelt-unit col-12 col-md-6">
                <div className=" col-12 col-md-5">
                  <label html="" className='labal-name'> Shift <span className='text-danger1'>*</span></label>
                  <select className="gender1" value={editSecurityData.shift} required onChange={(e) => seteditSecurityData({
                    ...editSecurityData, shift: e.target.value
                  })}>

                    <option value={""} disabled>Select Shift</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="complete-name mt-2 row d-flex">
              <div className="complent-UnitNumber col-12 col-md-6">
                <label html="" className='labal-name'> Shift Date <span className='text-danger1'>*</span></label>
                <input className='input-style gender1 ' placeholder='Enter wing' type="date" onChange={(e) => seteditSecurityData({
                  ...editSecurityData, shiftDate: e.target.value
                })}
                  value={editSecurityData.shiftDate}

                />
              </div>
              <div className="complelt-unit col-12 col-md-6">
                <label html="" className='labal-name'> Shift Time <span className='text-danger1'>*</span></label>
                <input className='input-style  gender1' placeholder='Enter Unit' type="time" onChange={(e) => seteditSecurityData({
                  ...editSecurityData, shiftTime: e.target.value
                })}
                  value={editSecurityData.shiftTime}

                />
              </div>
            </div>

            <div className="d-flex doc mt-3">
              <div className="icon me-1  img-icon  " >
                <Image className='fs-3' />
              </div>
              <div className="icon me-1">
                <p style={{ textTransform: "capitalize", textWrap: "wrap", width: "215px" }}> {editSecurityData.aadharCard ? editSecurityData.aadharCard.split("/image/upload/")[1].split("/")[1] : ""}
                  <p >2.3 MB</p> </p>


              </div>
              <div className="icon me-1 document-view cursor">
                <VisibilityIcon className='fs-3 me-1' />
              </div>
            </div>

            <div className="d-flex gap-3 mt-3">
              <Button className="save-btn radious   " style={{ color: "#202224", border: "1px solid #D3D3D3", cursor: "pointer" }} variant="outlined" onClick={CloseEditsecurity} >
                Cancel
              </Button>
              <Button
                className="save-btn radious l-btn "
                style={{
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}

                onClick={editsecurity}
              >

                Create
              </Button>
            </div>
          </Modal.Body>

        </Modal>
      </form>

      <Modal show={viewModalSecurity}  >
        <div className="div" style={{ borderRadius: "10%", }}>


          <Modal.Header className='bg-white' style={{ height: "60px", }}>
            {/* <Modal.Title>
           
           
          </Modal.Title> */}
            <DialogTitle sx={{ m: 0, p: 0 }} id="customized-dialog-title">
              <h> View Security Guard Details </h>
            </DialogTitle>
            <span style={{ cursor: "pointer" }} onClick={CloseViewModdal}>
              <CloseIcon className='mb-2 fs-3 mt-1 ms-2' />

            </span>
          </Modal.Header>
          <Modal.Body className='viewcomplete'>
            {/* profile */}
            <div className="profile-name d-flex gap-2 ">
              <div className="" style={{ width: "70px", height: "70px", }}>
                <img src={ViewSecurityData.photo} alt="" style={{ width: "70px", height: "70px", border: "3px solid #F4F4F4", borderRadius: "50%" }} />
              </div>
              <div className="profileName mt-1">
                <h5>{ViewSecurityData.fullName}</h5>
                <p className='mode-date'> {new Date(ViewSecurityData.shiftDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
              </div>
            </div>

            {/* wing-unit-priority-status */}

            <div className="additional-info1 gap-3  ">

              <div className=' ' >
                <p className=''>Select Shift</p>
                <span className={`${ViewSecurityData.shift === "Day" ? "DAY" : "NIGHT"} `} > {ViewSecurityData.shift === "Day" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" fill="#FF9300" />
                  <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" fill="#FF9300" />
                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5302 15.9301C21.3702 15.6601 20.9202 15.2401 19.8002 15.4401C19.1802 15.5501 18.5502 15.6001 17.9202 15.5701C15.5902 15.4701 13.4802 14.4001 12.0102 12.7501C10.7102 11.3001 9.9102 9.41012 9.9002 7.37012C9.9002 6.23012 10.1202 5.13012 10.5702 4.09012C11.0102 3.08012 10.7002 2.55012 10.4802 2.33012C10.2502 2.10012 9.7102 1.78012 8.6502 2.22012C4.5602 3.94012 2.0302 8.04012 2.3302 12.4301C2.6302 16.5601 5.5302 20.0901 9.3702 21.4201C10.2902 21.7401 11.2602 21.9301 12.2602 21.9701C12.4202 21.9801 12.5802 21.9901 12.7402 21.9901C16.0902 21.9901 19.2302 20.4101 21.2102 17.7201C21.8802 16.7901 21.7002 16.2001 21.5302 15.9301Z" fill="#FFFFFF" />
                </svg>}  {ViewSecurityData.shift}</span>
              </div>
              <div >
                <p>Shift Time</p>
                <span className="info-badge priority time1"  > {new Date(`1970-01-01T${ViewSecurityData.shiftTime}:00`).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}</span>
              </div>
              <div className=' ' style={{ width: "10%" }}>
                <p className='ms-2'>Status</p>
                <span className={`${ViewSecurityData.gender === "Male" ? "Male" : "Female"}`} >{ViewSecurityData.gender}</span>
              </div>
            </div>

          </Modal.Body>
        </div>
      </Modal>

      {/* Delete Security?  */}

      <Modal show={deleteSecurityModal}>
        <Modal.Header>
          <Modal.Title>Delete Security?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mode-date'>Are you sure you want to delate this Security?</p>
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
              onClick={() => deleteSecurity(_id)}
            >
              Delate
            </Button>
          </div>
        </Modal.Footer>
      </Modal>


    </div>

  )
}
