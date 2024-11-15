
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
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
export default function Icome() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow() {
    try {

      setShow(true)

    } catch (error) {
      console.log(error)
    }
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
        <div className={` ms-5  status-badge ${params.value.toLowerCase()} d-flex gap-3`}>
          <p className='wing mt-2' ><p className='wing-chile mb-4'>{params.row.wing}</p> </p>  <span> {params.value}</span>

        </div>

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
          <button className='l-btn text-white'>Set Maintenance</button>
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

      </div>



    </>
  )
}
