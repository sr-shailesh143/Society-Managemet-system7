import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import React, { useState } from 'react'
import { GiMoneyStack } from "react-icons/gi";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Icome() {
  const [show, setShow] = useState(false);
  const [showsetmantenenc, setShowsetmantenenc] = useState(false);
  const [showsetmantenencdetels, setshowsetmantenencdetels] = useState(false);
  const handleClose = () => setShow(false);
  const handleClosesetmantence = () => setShowsetmantenenc(false);
  const handleClosesetshowsetmantenencdetels = () => setshowsetmantenencdetels(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  function handleShow() {
    try {
      setShow(true)
    } catch (error) {
      console.log(error)
    }
  }


  function comform() {
    setShowsetmantenenc(false)
    setshowsetmantenencdetels(true)
  }

  const data = [
    {
      img: "src/assets/notification-img.png", fullName: "Evelyn Harper", unitNumber: "1001", Date: "10/02/2024", residentStatus: "Tenant", phoneNumber: "97587 85828", Amount: 1000, Penalty: 250, wing: "A",
      Status: "Done",
      Payment: "Online"
    },
    {
      img: "src/assets/notification-img.png", fullName: "Evelyn Harper", unitNumber: "1001", Date: "11/02/2024", residentStatus: "Owner", phoneNumber: "97587 85828", Amount: 1000, Penalty: 0, wing: "B",
      Status: "Done",
      Payment: "Cash"
    }, {
      img: "src/assets/notification-img.png", fullName: "Evelyn Harper", unitNumber: "1001", Date: "12/02/2024", residentStatus: "Tenant", phoneNumber: "97587 85828", Amount: 1000, Penalty: 0, wing: "C",
      Status: "Pending",
      Payment: "Cash"
    }, {
      img: "src/assets/notification-img.png", fullName: "Evelyn Harper", unitNumber: "1001", Date: "13/02/2024", residentStatus: "Owner", phoneNumber: "97587 85828", Amount: 1000, Penalty: 250, wing: "D",
      Status: "Pending",
      Payment: "Online"
    }, 
  ];
  const wing = { backgroundColor: '#F6F8FB', width: "131px", padding: '5px 10px', borderRadius: '12px', color: '#5678E9', }
  const Done = { backgroundColor: '#39973D1A', width: "131px", padding: '5px 20px', borderRadius: '12px', color: '#39973D', }
  const Pending = {
    backgroundColor: '#FFC3131A', padding: '5px 10px', borderRadius: '12px', fontSize: "15px", color: '#FFC313',

  }
  const Tenant = { backgroundColor: '#FFF1F8', padding: '5px 10px', borderRadius: '12px', color: '#EC4899', }
  const Owner = { backgroundColor: '#F1F0FF', padding: '5px 10px', borderRadius: '12px', color: '#4F46E5', }
  const blanck = { backgroundColor: '#F6F8FB', padding: '5px 24px', borderRadius: '12px', color: '#4F4F4F', }
  const Penalty = { padding: '5px 14px', borderRadius: '12px', opacity: ' 0px', background: "#E74C3C", color: "#FFFFFF" }
  const view = { backgroundColor: '#F6F8FB', padding: '10px 10px', borderRadius: '12px', color: '#5678E9', }
  const Online = {
    backgroundColor: '#5678E91A', padding: '5px 15px', borderRadius: '12px', color: '#5678E9',
  }
  const Cash = { backgroundColor: '#2022240D', padding: '5px 15px', fontSize: "20px", borderRadius: '12px', color: '#202224', }
  const naviget = useNavigate()
  return (
    <>
      <div className="belence">
        <div className="totle-amount row d-flex  ">
          <div className="col-12 col-md-6">
            <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className=" amount-card   amount-card-pink" >
              <div className="amount-box">
                <div className="amount-label">Maintenance Amount</div>
                <div className="amount-value">₹ 0</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 ">
            <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className="amount-card    amount-card-red"  ><div className="amount-box">
              <div className="amount-label">Penalty Amount</div>
              <div className="amount-value-red">₹ 0</div>
            </div>
            </div>
          </div>
        </div>
        <div className="setmaintenance">
          <button className='l-btn text-white' onClick={() => setShowsetmantenenc(true)}>Set Maintenance</button>
        </div>
      </div>
      <div className="maintanensDetels">
        <div className='row'>
          <div className="d-flex mt-4 ">
            <div onClick={() => naviget("/Icome")} style={{ background: location.pathname === "/Icome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Icome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
              <p >Maintenance</p>
            </div>
            <div onClick={() => naviget("/Otherincome")} style={{ background: location.pathname === "/Otherincome" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Otherincome" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
              <p >Other Income</p>
            </div>
          </div>
        </div>
        <Box className="radious" bgcolor={"white"} sx={{ height: '580px', width: '100%', padding: 2 }}>
          <div className="row mt-3 justify-content-between align-items-center">
            <div className="col-12 col-md-6 mt-2 add-text ">
              <h5 className='fs-4 add-text'>Maintenance  Details</h5>
            </div>
          </div>
          <div className="responsive-table-container">
            <table className="responsive-table">
              <thead className='tabal-header'>
                <tr>
                  <th className='redious'> &nbsp;&nbsp;   Name</th>
                  <th>Unit Number</th>
                  <th> &nbsp;&nbsp;&nbsp;Date</th>
                  <th> &nbsp;&nbsp;&nbsp; Status</th>
                  <th>Phone Number</th>
                  <th>Amount</th>
                  <th>Penalty</th>
                  <th>&nbsp;&nbsp; &nbsp;&nbsp; Status </th>
                  <th>Payment </th>
                  <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Action</th>
                </tr>
              </thead>
              <tbody className='sroll'>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {
                        item.fullName === "" || item.img === "" ? <span><img src="\src\assets\blenck.png" alt="" /> <span>--</span></span> :
                          <span><img src={item.img} alt="" /> <span>  {item.fullName}</span> </span>
                      }
                    </td>
                    <td ><span className='status-badge-wing' style={wing}>{item.wing}</span>   {item.unitNumber}</td>
                    <td>
                      {
                        item.phoneNumber === "" ? <span style={blanck}>--</span> : <span>{item.Date}</span>
                      }
                    </td>
                    <td>
                      {
                        item.residentStatus === "" ? <span style={blanck}>--</span> : <span>
                          {
                            item.residentStatus === "Tenant" ? <span style={Tenant}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#EC4899" />
                              <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#EC4899" />
                            </svg>
                              <span className=''>{item.residentStatus}</span></span> : <span style={Owner}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM12 5.75C13.29 5.75 14.33 6.79 14.33 8.08C14.33 9.37 13.29 10.41 12 10.41C10.71 10.41 9.67 9.36 9.67 8.08C9.67 6.79 10.71 5.75 12 5.75ZM14.68 15.06H9.32C8.51 15.06 8.04 14.16 8.49 13.49C9.17 12.48 10.49 11.8 12 11.8C13.51 11.8 14.83 12.48 15.51 13.49C15.96 14.16 15.48 15.06 14.68 15.06Z" fill="#4F46E5" />
                              </svg>
                              <span>{item.residentStatus}</span> </span>
                          }
                        </span>
                      }

                    </td>
                    <td>
                      {
                        item.phoneNumber === "" ? <span style={blanck}>--</span> : <span>{item.phoneNumber}</span>
                      }
                    </td>
                    <td>
                      <span className='list-amount' > ₹ {item.Amount}</span>
                    </td>
                    <td>
                      {item.Penalty <= 0 ? <span style={blanck}>--</span> : <span style={Penalty} > {item.Penalty} </span>}
                    </td>
                    <td>
                      {
                        item.Status === "Pending" ? <span style={Pending}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0001 4.6499C7.22008 4.6499 3.33008 8.5399 3.33008 13.3199C3.33008 18.0999 7.22008 21.9999 12.0001 21.9999C16.7801 21.9999 20.6701 18.1099 20.6701 13.3299C20.6701 8.5499 16.7801 4.6499 12.0001 4.6499ZM12.7501 12.9999C12.7501 13.4099 12.4101 13.7499 12.0001 13.7499C11.5901 13.7499 11.2501 13.4099 11.2501 12.9999V7.9999C11.2501 7.5899 11.5901 7.2499 12.0001 7.2499C12.4101 7.2499 12.7501 7.5899 12.7501 7.9999V12.9999Z" fill="#FFC313" />
                          <path d="M14.8896 3.45H9.10965C8.70965 3.45 8.38965 3.13 8.38965 2.73C8.38965 2.33 8.70965 2 9.10965 2H14.8896C15.2896 2 15.6096 2.32 15.6096 2.72C15.6096 3.12 15.2896 3.45 14.8896 3.45Z" fill="#FFC313" />
                        </svg>
                          <span className=''>{item.Status}</span></span> : <span style={Done}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5599 10.7401L20.1999 9.16006C19.9399 8.86006 19.7299 8.30006 19.7299 7.90006V6.20006C19.7299 5.14006 18.8599 4.27006 17.7999 4.27006H16.0999C15.7099 4.27006 15.1399 4.06006 14.8399 3.80006L13.2599 2.44006C12.5699 1.85006 11.4399 1.85006 10.7399 2.44006L9.16988 3.81006C8.86988 4.06006 8.29988 4.27006 7.90988 4.27006H6.17988C5.11988 4.27006 4.24988 5.14006 4.24988 6.20006V7.91006C4.24988 8.30006 4.03988 8.86006 3.78988 9.16006L2.43988 10.7501C1.85988 11.4401 1.85988 12.5601 2.43988 13.2501L3.78988 14.8401C4.03988 15.1401 4.24988 15.7001 4.24988 16.0901V17.8001C4.24988 18.8601 5.11988 19.7301 6.17988 19.7301H7.90988C8.29988 19.7301 8.86988 19.9401 9.16988 20.2001L10.7499 21.5601C11.4399 22.1501 12.5699 22.1501 13.2699 21.5601L14.8499 20.2001C15.1499 19.9401 15.7099 19.7301 16.1099 19.7301H17.8099C18.8699 19.7301 19.7399 18.8601 19.7399 17.8001V16.1001C19.7399 15.7101 19.9499 15.1401 20.2099 14.8401L21.5699 13.2601C22.1499 12.5701 22.1499 11.4301 21.5599 10.7401ZM16.1599 10.1101L11.3299 14.9401C11.1899 15.0801 10.9999 15.1601 10.7999 15.1601C10.5999 15.1601 10.4099 15.0801 10.2699 14.9401L7.84988 12.5201C7.55988 12.2301 7.55988 11.7501 7.84988 11.4601C8.13988 11.1701 8.61988 11.1701 8.90988 11.4601L10.7999 13.3501L15.0999 9.05006C15.3899 8.76006 15.8699 8.76006 16.1599 9.05006C16.4499 9.34006 16.4499 9.82006 16.1599 10.1101Z" fill="#39973D" />
                          </svg>
                          <span>{item.Status}</span> </span>
                      }
                    </td>

                    <td> {
                      item.Payment === "Online" ? <span style={Online}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0002 10.97V13.03C22.0002 13.58 21.5602 14.03 21.0002 14.05H19.0402C17.9602 14.05 16.9702 13.26 16.8802 12.18C16.8202 11.55 17.0602 10.96 17.4802 10.55C17.8502 10.17 18.3602 9.95001 18.9202 9.95001H21.0002C21.5602 9.97001 22.0002 10.42 22.0002 10.97Z" fill="#5678E9" />
                        <path d="M20.47 15.55H19.04C17.14 15.55 15.54 14.12 15.38 12.3C15.29 11.26 15.67 10.22 16.43 9.48C17.07 8.82 17.96 8.45 18.92 8.45H20.47C20.76 8.45 21 8.21 20.97 7.92C20.75 5.49 19.14 3.83 16.75 3.55C16.51 3.51 16.26 3.5 16 3.5H7C6.72 3.5 6.45 3.52 6.19 3.56C3.64 3.88 2 5.78 2 8.5V15.5C2 18.26 4.24 20.5 7 20.5H16C18.8 20.5 20.73 18.75 20.97 16.08C21 15.79 20.76 15.55 20.47 15.55ZM13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z" fill="#5678E9" />
                      </svg>
                        <span className='ms-1'>{item.Payment}</span></span> : <span style={Cash}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.17 6.64002C18.74 4.47002 17.13 3.52002 14.89 3.52002H6.10996C3.46996 3.52002 1.70996 4.84002 1.70996 7.92002V13.07C1.70996 15.29 2.61996 16.59 4.11996 17.15C4.33996 17.23 4.57996 17.3 4.82996 17.34C5.22996 17.43 5.65996 17.47 6.10996 17.47H14.9C17.54 17.47 19.3 16.15 19.3 13.07V7.92002C19.3 7.45002 19.26 7.03002 19.17 6.64002ZM5.52996 12C5.52996 12.41 5.18996 12.75 4.77996 12.75C4.36996 12.75 4.02996 12.41 4.02996 12V9.00002C4.02996 8.59002 4.36996 8.25002 4.77996 8.25002C5.18996 8.25002 5.52996 8.59002 5.52996 9.00002V12ZM10.5 13.14C9.03996 13.14 7.85996 11.96 7.85996 10.5C7.85996 9.04002 9.03996 7.86002 10.5 7.86002C11.96 7.86002 13.14 9.04002 13.14 10.5C13.14 11.96 11.96 13.14 10.5 13.14ZM16.96 12C16.96 12.41 16.62 12.75 16.21 12.75C15.8 12.75 15.46 12.41 15.46 12V9.00002C15.46 8.59002 15.8 8.25002 16.21 8.25002C16.62 8.25002 16.96 8.59002 16.96 9.00002V12Z" fill="#292D32" />
                          <path d="M22.2998 10.92V16.07C22.2998 19.15 20.5398 20.48 17.8898 20.48H9.10977C8.35977 20.48 7.68977 20.37 7.10977 20.15C6.63977 19.98 6.22977 19.73 5.89977 19.41C5.71977 19.24 5.85977 18.97 6.10977 18.97H14.8898C18.5898 18.97 20.7898 16.77 20.7898 13.08V7.91997C20.7898 7.67997 21.0598 7.52997 21.2298 7.70997C21.9098 8.42997 22.2998 9.47997 22.2998 10.92Z" fill="#292D32" />
                        </svg>
                        <span>{item.Payment}</span> </span>
                    }
                    </td>
                    <td className="action-buttons">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span onClick={handleShow} style={view} className='cursor' > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                        <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                      </svg></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
        <Modal className='' show={show} >
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title className='model-title'>View Maintenance Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="model-profile d-flex">
              <div className="img">
                <img src="/src/assets/Avatar.png" alt="" />
              </div>
              <div className="name">
                <h5>
                  Cody Fisher
                </h5>
                <p className='mode-date'>Feb 10, 2024</p>
              </div>
            </div>
            <div className="profile-detels">
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Wing</h6>
                <p className="block">
                  <p className='wing mt-1' ><p className='wing-chile mt-1' >A</p> </p>
                </p>
              </div>
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Unit</h6>
                <p className="block">
                  <p className='mt-1' >1001 </p>
                </p>
              </div>
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Status</h6>
                <p className="block">
                  <span className='status-badge-owner d-flex' ><RiShieldUserFill className='mt-1 ' /> Owner</span>
                </p>
              </div>
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Amount</h6>
                <p className="block">
                  <p className='mt-1' ><p className=' mt-1 ms-3 text-success' >1000</p> </p>
                </p>
              </div>
            </div>
            <div className="profile-detels">
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Penalty</h6>
                <p className="block">
                  <p className=' mt-1' ><p className=' mt-1 ms-3  ' >--</p> </p>
                </p>
              </div>
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Status</h6>
                <p className="block">
                  <p className='mt-1' >Pending </p>
                </p>
              </div>
              <div className="wing-detels col-12 col-md-3">
                <h6 className="wing-text">Payment</h6>
                <p className="block">
                  <span className='' > Cash</span>
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showsetmantenenc} onHide={handleClosesetmantence}>
          <Modal.Header closeButton>
            <Modal.Title>Set Maintenance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 col-12">
              <label className='text-wrap'>Password<span className='text-danger1 '>*</span></label>
              <input id="password" type={showPassword ? 'text' : 'password'} className='form-control  input-text input-style p-3' placeholder="Enter your password" />
              <span className='mantenese-hide' onClick={togglePasswordVisibility} style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }} >  {
                showPassword ? <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.25 6.14993C16.94 2.51993 13.56 0.429932 10 0.429932C8.22 0.429932 6.49 0.949932 4.91 1.91993C3.33 2.89993 1.91 4.32993 0.75 6.14993C-0.25 7.71993 -0.25 10.2699 0.75 11.8399C3.06 15.4799 6.44 17.5599 10 17.5599C11.78 17.5599 13.51 17.0399 15.09 16.0699C16.67 15.0899 18.09 13.6599 19.25 11.8399C20.25 10.2799 20.25 7.71993 19.25 6.14993ZM10 13.0399C7.76 13.0399 5.96 11.2299 5.96 8.99993C5.96 6.76993 7.76 4.95993 10 4.95993C12.24 4.95993 14.04 6.76993 14.04 8.99993C14.04 11.2299 12.24 13.0399 10 13.0399Z" fill="#292D32" />
                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.2699 9.18005C20.9799 8.72005 20.6699 8.29005 20.3499 7.89005C19.9799 7.42005 19.2799 7.38005 18.8599 7.80005L15.8599 10.8001C16.0799 11.4601 16.1199 12.2201 15.9199 13.0101C15.5699 14.4201 14.4299 15.5601 13.0199 15.9101C12.2299 16.1101 11.4699 16.0701 10.8099 15.8501C10.8099 15.8501 9.37995 17.2801 8.34995 18.3101C7.84995 18.8101 8.00995 19.6901 8.67995 19.9501C9.74995 20.3601 10.8599 20.5701 11.9999 20.5701C13.7799 20.5701 15.5099 20.0501 17.0899 19.0801C18.6999 18.0801 20.1499 16.6101 21.3199 14.74C22.2699 13.2301 22.2199 10.6901 21.2699 9.18005Z" fill="#292D32" />
                  <path d="M14.0201 9.97989L9.98014 14.0199C9.47014 13.4999 9.14014 12.7799 9.14014 11.9999C9.14014 10.4299 10.4201 9.13989 12.0001 9.13989C12.7801 9.13989 13.5001 9.46989 14.0201 9.97989Z" fill="#292D32" />
                  <path d="M18.25 5.74993L14.86 9.13993C14.13 8.39993 13.12 7.95993 12 7.95993C9.76 7.95993 7.96 9.76993 7.96 11.9999C7.96 13.1199 8.41 14.1299 9.14 14.8599L5.76 18.2499H5.75C4.64 17.3499 3.62 16.1999 2.75 14.8399C1.75 13.2699 1.75 10.7199 2.75 9.14993C3.91 7.32993 5.33 5.89993 6.91 4.91993C8.49 3.95993 10.22 3.42993 12 3.42993C14.23 3.42993 16.39 4.24993 18.25 5.74993Z" fill="#292D32" />
                  <path d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z" fill="#292D32" />
                  <path d="M21.7699 2.22988C21.4699 1.92988 20.9799 1.92988 20.6799 2.22988L2.22988 20.6899C1.92988 20.9899 1.92988 21.4799 2.22988 21.7799C2.37988 21.9199 2.56988 21.9999 2.76988 21.9999C2.96988 21.9999 3.15988 21.9199 3.30988 21.7699L21.7699 3.30988C22.0799 3.00988 22.0799 2.52988 21.7699 2.22988Z" fill="#292D32" />
                </svg>


              }
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center w-100">
            <div className="d-flex gap-3 w-100 justify-content-center">
              <Button
                className="cancel-btn radious"
                style={{
                  border: "1px solid #D3D3D3",
                  width: "45%",
                  textAlign: "center",
                }}
                onClick={handleClosesetmantence}
              >
                Cancel
              </Button>
              <Button
                className="save-btn radious l-btn"
                style={{
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "45%",
                  textAlign: "center",
                }}
                onClick={comform}
              >
                Continue
              </Button>
            </div>
          </Modal.Footer>

        </Modal>
        <Modal show={showsetmantenencdetels} >
          <Modal.Header closeButton>
            <Modal.Title> Add Maintenance Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="amount d-flex gap-1">
              <div className="A-1">
                <label className='text-wrap'>Maintenance Amount</label>
                <input type="number" className="form-control  input-text input-style" placeholder="₹ 0000" />
              </div>
              <div className="A-1 ">
                <label className='text-wrap ms-2'>Penalty Amount</label>
                <input type="number" className="form-control  input-text input-style" placeholder="₹ 0000" />
              </div>
            </div>
            <div className="date mt-2">
              <label className='text-wrap'>Maintenance Due Date</label>
              <input type="date" className="form-control  input-text input-style" placeholder="Enter Relation" />
            </div>
            <div className="select mt-2">
              <label className='text-wrap'>Unit<span className='text-danger1 '>*</span></label>
              <select className="form-select  input-text mt-1 input-style" required>
                <option style={{ color: '#A7A7A7' }}>Select Penalty Applied After Day Selection</option>
                <option>4 day</option>
                <option>3 day</option>
                <option>2 day</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-3">
              <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} onClick={handleClosesetshowsetmantenencdetels} >
                Cancel
              </Button>
              <Button className="save-btn radious l-btn " style={{ color: "white", border: "none", cursor: "pointer" }} onClick={() => naviget("/Icome" && setshowsetmantenencdetels(false))}   >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
