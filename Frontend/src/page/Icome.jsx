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
  const [MaintenanceDetail, setMaintenanceDetail] = useState({
    MaintenanceAmount: 0,
    PenaltyAmount: 0,
    MaintenanceDueDate: "",
    PenaltyAppliedAfterDaySelection: ""
  })

  function comform() {
    setShowsetmantenenc(false)
    setshowsetmantenencdetels(true)
  }
  const rows = [
    { id: 1, Name: 'Evelyn Harper', unitNumber: '1001', wing: "A", date: '10/11/3624', residentStatus: 'Tenant', phoneNumber: '97687 85628', Amount: 0, Payment: "Online", Status: "Pending", Penalty: "200", img: "src/assets/notification-img.png" },
    { id: 2, Name: 'vced', unitNumber: '1002', date: '10/11/3624', wing: "B", residentStatus: 'Owner', phoneNumber: '7201000140', Amount: 3, Penalty: "", Payment: "Cash", Status: "Pending", },
    { id: 3, Name: 'Evelyn Harper', unitNumber: '1003', date: '10/11/3624', wing: "C", residentStatus: 'Tenant', phoneNumber: '97687 85628', Amount: 3, Payment: "Cash", Status: "Done", Penalty: "200", img: "src/assets/notification-img.png" },
    { id: 4, Name: 'Evelyn Harper', unitNumber: '1003', date: '10/11/3624', wing: "C", residentStatus: 'Owner', phoneNumber: '97687 85628', Amount: 3, Payment: "Online", Status: "Pending", Penalty: "600", img: "src/assets/notification-img.png" },
    // Additional rows...
  ];

  // Define Columns
  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => (
        <div className=' ms-3 ' style={{ display: 'flex', alignItems: 'center' }}>

          <img
            src={params.row.img || "/src/assets/defultProfile.png"}
            alt={params.value}
            style={{ width: 35, height: 35, borderRadius: '50%', marginRight: 8, border: params.row.img ? "" : "1px solid #F4F4F4", backgroundColor: params.row.img ? "" : "#F4F4F4" }}
          />
           <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'unitNumber', headerName: 'Unit Number', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>
        <span className='status-badge-wing'> {params.row.wing}</span>   <span> {params.value}</span>
        </span>
      )

    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>

          {params.value}</span>
        )
    },
    {
      field: 'residentStatus',
      headerName: 'Resident Status',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>

          {
            params.row.residentStatus === "Tenant" ? <span> <FaUser /> {params.value}</span> : <span><RiShieldUserFill /> {params.value}</span>
          }
        </span>
      )
    },
    {
      field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span>
          {
            <span>{params.value}</span>
          }
        </span>
      )
    },
    {
      field: 'Amount', headerName: 'Amount', type: 'number', flex: 0.5, minWidth: 100, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span>
          {
            <span style={{ color: "#39973D" }} className='  p-2 '>< CurrencyRupeeIcon />  {params.value}</span>
          }
        </span>
      )

    },
    {
      field: 'Penalty', headerName: 'Penalty', type: 'number', flex: 0.5, minWidth: 100, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <span  >
          {
            params.row.Penalty > 0 ? <span className={`status-badge-Penalty`} >{params.value}</span> : <span className={`status-badge-emty`} >-</span>
          }
        </span>
      )
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value}`}>

          {
            params.row.Status === "Pending" ? <span> <AccessTimeIcon /> {params.value}</span> : <span><VerifiedIcon /> {params.value}</span>
          }
        </span>
      )
    },
    {
      field: 'Payment',
      headerName: 'Payment',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge ${params.value}`}>

          {
            params.row.Payment === "Online" ? <span> < AccountBalanceWalletIcon /> {params.value}</span> : <span ><GiMoneyStack /> {params.value}</span>
          }
        </span>
      )
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className={`status-badge-view `} >

          <span onClick={handleShow}><VisibilityIcon >{params.value}</VisibilityIcon></span>
        </span>
      )
    },

  ];
  const naviget = useNavigate()
  return (
    <>
      <div className="belence">
        <div className="totle-amount row d-flex  ">

          <div className="col-12 col-md-6">
            <div
              title="Total Unit"
              value="₹ 20,550"
              iconSrc="src/Assets/button4.png"
              className=" amount-card   amount-card-pink"
            >
              <div className="amount-box">

                <div className="amount-label">Maintenance Amount</div>
                <div className="amount-value">₹ 0</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 ">
            <div
              title="Total Unit"
              value="₹ 20,550"
              iconSrc="src/Assets/button4.png"
              className="amount-card    amount-card-red"
            >
              <div className="amount-box">

                <div className="amount-label">Maintenance Amount</div>
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
        <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
          <div className="row mt-3 justify-content-between align-items-center">
            <div className="col-12 col-md-6 mt-2 add-text ">
              <h5 className='fs-4 add-text'>Maintenance  Details</h5>
            </div>

          </div>
          <DataGrid
            className='mt-4 h-75'
            rows={rows}
            columns={columns}
            pageSize={2}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{

              '& .status-badge.tenant': {
                backgroundColor: '#FFF1F8',
                padding: '5px 10px',
                borderRadius: '12px',
                color: '#EC4899',
              },
              '& .status-badge.owner': {
                backgroundColor: '#F1F0FF',

                padding: '5px 10px',
                borderRadius: '12px',
                color: '#4F46E5',
              },
              '& .status-badge.Pending': {
                backgroundColor: ' #FFC3131A',
                padding: '5px 10px',
                borderRadius: '12px',
                color: '#FFC313',
              },
              '& .status-badge.Done': {
                backgroundColor: '#39973D1A',

                padding: '5px 15px',

                borderRadius: '12px',
                color: '#39973D',
              },
              '& .status-badge-Penalty': {
                backgroundColor: '#E74C3C',

                padding: '5px 15px',

                borderRadius: '12px',
                color: 'white',
              },
              '& .status-badge-emty': {
                backgroundColor: '#F6F8FB',

                padding: '5px 25px',

                borderRadius: '12px',
                color: '#39973D',
              },
              '& .status-badge-wing': {
                backgroundColor: '#F6F8FB',
                width: "131px",
                padding: '5px 10px',
                borderRadius: '12px',
                color: '#5678E9',
              },
              '& .status-badge.Online': {
                backgroundColor: '#5678E91A',

                padding: '5px 15px',

                borderRadius: '12px',
                color: '#5678E9',
              },
              '& .status-badge.Cash': {
                backgroundColor: '#2022240D',

                padding: '5px 15px',
                fontSize: "20px",
                borderRadius: '12px',
                color: '#202224',
              },
              '& .status-badge-view': {
                backgroundColor: '#2022240D',

                padding: '10px 10px',
                fontSize: "20px",
                borderRadius: '12px',
                color: '#5678E9',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#eaf1f8',
              },
            }}
          />
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
              <span
                className='mantenese-hide'
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
              >
                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </span>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-3">
              <Button
                className=" cancel-btn radious  "
                style={{ border: "1px solid #D3D3D3", }}
                variant=""
                onClick={handleClosesetmantence}
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
              <Button
                className=" cancel-btn radious  "
                style={{ border: "1px solid #D3D3D3", }}
                variant=""
                onClick={handleClosesetshowsetmantenencdetels}
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

                onClick={() => naviget("/Icome" && setshowsetmantenencdetels(false))}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>




      </div>



    </>
  )
}
