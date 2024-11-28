import { Box } from '@mui/material'

import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import React, { useState } from 'react'
import { GiMoneyStack } from "react-icons/gi";
import '../index.css'
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const ViewOtherIncome = () => {
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
  function comform() {
    setShowsetmantenenc(false)
    setshowsetmantenencdetels(true)
  }
  const data = [
    {
      img: "src/assets/notification-img.png",
      fullName: "Evelyn Harper",
      unitNumber: "1001",
      Date: "10/02/2024",
      residentStatus: "Tenant",
      phoneNumber: "97587 85828",
      Amount: 1000,
      Penalty: 250,
      wing: "A",
      Status: "Done",
      Payment: "Online"
    },
    {
      img: "src/assets/notification-img.png",
      fullName: "Evelyn Harper",
      unitNumber: "1001",
      Date: "11/02/2024",
      residentStatus: "Owner",
      phoneNumber: "97587 85828",
      Amount: 1000,
      Penalty: 0,
      wing: "B",
      Status: "Done",
      Payment: "Cash"
    }
  ];
  const wing = {
    backgroundColor: '#F6F8FB',
    width: "131px",
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#5678E9',
  }
  const Pending = {
    backgroundColor: '#FFC3131A',
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: "15px",
    color: '#FFC313',
  }
  const Tenant = {
    backgroundColor: '#FFF1F8',
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#EC4899',
  }
  const Owner = {
    backgroundColor: '#F1F0FF',
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#4F46E5',
  }
  const blanck = {
    backgroundColor: '#F6F8FB',
    padding: '5px 24px',
    borderRadius: '12px',
    color: '#4F4F4F',
  }
  const Online = {
    backgroundColor: '#5678E91A',
    padding: '5px 15px',
    borderRadius: '12px',
    color: '#5678E9',
  }
  const Cash = {
    backgroundColor: '#2022240D',
    padding: '5px 15px',
    fontSize: "20px",
    borderRadius: '12px',
    color: '#202224',
  }
  return (
    <>
      <div className="maintanensDetels">
        <Box className="radious" bgcolor={"white"} sx={{ height: '900px', width: '100%', padding: 2 }}>
          <div className="row mt-3 justify-content-between align-items-center">
            <div className="col-12 col-md-6 mt-2 add-text ">
              <h5 className='fs-4 add-text'>Maintenance  Details</h5>
            </div>
          </div>
          <div className="responsive-table-container3">
            <table className="responsive-table">
              <thead className='tabal-header  justify-content-between '>
                <tr>
                  <th className='justify-content-between px-5 custom-th'>Unit Number</th>
                  <th className='justify-content-between px-5'> &nbsp;&nbsp;&nbsp;Date</th>
                  <th className='justify-content-between px-5'> &nbsp;&nbsp;&nbsp; Status</th>
                  <th className='justify-content-between px-5'>Phone Number</th>
                  <th className='justify-content-between px-5'>Amount</th>
                  <th className='text-end px-5  custom-th2'>Payment </th>
                </tr>
              </thead>
              <tbody className='sroll justify-content-between'>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td ><span className='status-badge-wing justify-content-center px-4' style={wing}>{item.wing}</span>   {item.unitNumber}</td>
                    <td className='px-5'> {item.phoneNumber === "" ? <span style={blanck}>--</span> : <span>{item.Date}</span>} </td>
                    <td className='px-5'>
                      {
                        item.residentStatus === "" ? <span style={blanck}>--</span> : <span>
                          {
                            item.residentStatus === "Tenant" ? <span style={Tenant}> <FaUser className='mb-1' /> <span className=''>{item.residentStatus}</span></span> : <span style={Owner}><RiShieldUserFill className='mb-1 fs-5' /> <span>{item.residentStatus}</span> </span>
                          }
                        </span>
                      }
                    </td>
                    <td className='px-5'> {item.phoneNumber === "" ? <span style={blanck}>--</span> : <span>{item.phoneNumber}</span>}  </td>
                    <td className='px-5'>
                      <span className='list-amount' > ₹ {item.Amount}</span>
                    </td>
                    <td className='text-end my-5 '>  {item.Payment === "Online" ? <span style={Online}> <AccountBalanceWalletIcon /> <span className=''>{item.Payment}</span></span> : <span style={Cash}><GiMoneyStack className='mb-1' /> <span>{item.Payment}</span> </span>
                    }</td>
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
              <input id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className='form-control  input-text input-style p-3'
                placeholder="Enter your password" />
              <span className='mantenese-hide' onClick={togglePasswordVisibility} style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }} >
                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-3">
              <Button className=" cancel-btn radious  " style={{ border: "1px solid #D3D3D3", }} onClick={handleClosesetmantence}  >
                Cancel
              </Button>
              <Button className="save-btn radious l-btn " style={{ color: "white", border: "none", cursor: "pointer" }} onClick={comform}  >
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
              <Button className=" cancel-btn radious " style={{ border: "1px solid #D3D3D3", }} onClick={handleClosesetshowsetmantenencdetels} > Cancel
              </Button>
              <Button className="save-btn radious l-btn " style={{ color: "white", border: "none", cursor: "pointer" }} onClick={() => naviget("/Icome" && setshowsetmantenencdetels(false))} >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ViewOtherIncome;