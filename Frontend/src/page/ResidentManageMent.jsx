import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { CiSquarePlus } from "react-icons/ci";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LuBuilding2 } from "react-icons/lu";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const ResidentManageMent = () => {
   const naviget = useNavigate()
    // Sample Data
    const rows = [
        { id: 1, fullName: 'Evelyn Harper', unitNumber: '1001', wing: "A", unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 0, vehicles: 1, img: "src/assets/notification-img.png" },
        { id: 2, fullName: '', unitNumber: '1002', unitStatus: 'Vacate', wing: "B", residentStatus: '', phoneNumber: '', members: 3, vehicles: 2 },
        { id: 3, fullName: 'Evelyn Harper', unitNumber: '1003', unitStatus: 'Occupied', wing: "C", residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 3, vehicles: 1, img: "src/assets/notification-img.png" },
        { id: 4, fullName: 'Evelyn Harper', unitNumber: '1003', unitStatus: 'Occupied', wing: "C", residentStatus: 'Owner', phoneNumber: '97687 85628', members: 3, vehicles: 0, img: "src/assets/notification-img.png" },
        // Additional rows...
    ];

    // Define Columns
    const columns = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <img
                        src={params.row.img || "/src/assets/defultProfile.png"}
                        alt={params.value}
                        style={{ width: 35, height: 35, borderRadius: '50%', marginRight: 8, border: params.row.img ? "" : "1px solid #F4F4F4", backgroundColor: params.row.img ? "" : "#F4F4F4" }}
                    />
                    {
                        params.row.fullName === "" ? "-" : <span>{params.value}</span>
                    }



                </div>
            ),
        },
        {
            field: 'unitNumber', headerName: 'Unit Number', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className={`status-badge ${params.value.toLowerCase()} d-flex gap-3`}>
                    <p className='wing mt-2' ><p className='wing-chile mb-4'>{params.row.wing}</p> </p>  <span> {params.value}</span>

                </div>

            )

        },
        {
            field: 'unitStatus',
            headerName: 'Unit Status',
            flex: 1,
            minWidth: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>
                    {
                        params.row.unitStatus === "Occupied" ? <span> <LuBuilding2 /> {params.value}</span> : <span><FaBuildingUser /> {params.value}</span>
                    }



                </span>
            )
        },
        {
            field: 'residentStatus',
            headerName: 'Resident Status',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>

                    {
                        params.row.residentStatus === "Tenant" ? <span> <FaUser /> {params.value}</span> : params.row.residentStatus === "" ? <span>--</span> : <span><RiShieldUserFill /> {params.value}</span>
                    }
                </span>
            )
        },
        {
            field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.phoneNumber ? <span>{params.value}</span> : <span>--</span>
                    }
                </span>
            )
        },
        {
            field: 'members', headerName: 'Members', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.members > 0 ? <span className=' wing p-2 '>{params.value}</span> : <span>-</span>
                    }
                </span>
            )

        },
        {
            field: 'vehicles', headerName: 'Vehicles', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.vehicles > 0 ? <span className=' wing p-2 '>{params.value}</span> : <span>-</span>
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
                        params.row.fullName === "" && params.row.residentStatus === "" && params.row.phoneNumber === "" ? <span>--</span> : <span>
                            <span className=''>
                                <Edit style={{ cursor: "pointer" }} className='bg-success text-white p-1 radious mx-3' />
                            </span>
                            <span>
                                <VisibilityIcon style={{ cursor: "pointer" }} className='bg-primary p-1 radious text-white' />
                            </span>
                        </span>

                    }


                </div>
            ),
        },
    ];



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [status, setStatus] = useState("Occupied");
    const [isAgreed, setIsAgreed] = useState(false);

    const handleStatusChange = (event) => setStatus(event.target.value);
    const handleAgreementChange = () => setIsAgreed(!isAgreed);
    

    // form page route  function 

    function HandleSubmit() {
        try {
            if(status=== "Occupied"){

                naviget("/owner") 
                setShow(false)
            } 
            // if(status=== "Vacant") {
            //      naviget("/rent")
            //      setShow(false)
            // }
        } catch (error) {
            console.log(error)
        }
    } 
    
    

    return (
        <>
            <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
                <div className="row mt-3 justify-content-between align-items-center">
                    <div className="col-12 col-md-6 mt-2 ">
                        <h5 className='fs-4'>Resident Tenant and Owner Details</h5>
                    </div>
                    <div className="col-12 col-md-4 mt-2 d-flex justify-content-md-end">
                        <Button onClick={handleShow}
                            startIcon={<CiSquarePlus className="fs-2" />}
                            className="l-btn text-white w-100 w-md-auto"
                        >
                            Add New Resident Details
                        </Button>
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
                        '& .status-badge.occupied': {
                            backgroundColor: '#ECFFFF',
                            width: "131px",
                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#14B8A6',
                        },
                        '& .status-badge.vacate': {
                            backgroundColor: '#FFF6FF',
                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#9333EA',
                            maxWidth: "95.31px",

                        },
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
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#eaf1f8',
                        },
                    }}
                />
            </Box>
            <div className="d-flex justify-content-center">
                <Modal
                    className="custom-modal"
                    show={show}
                    onHide={handleClose}
                    centered
                >
                    <Modal.Header >
                        <Modal.Title>Residence Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="status-options d-flex justify-content-between">
                                {/* Occupied Option */}
                                <div
                                    className={`p-2 d-flex align-items-center option ${status === "Occupied" ? "selected" : ""
                                        }`}
                                    onClick={() => setStatus("Occupied")}
                                    style={{ border: "1px solid #D3D3D3", borderColor: status === "Occupied" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Occupied" ? "black" : "#D3D3D3" }}
                                >
                                    <Form.Check
                                        type="radio"
                                        label="Occupied"
                                        name="status"
                                        value="Occupied"
                                        checked={status === "Occupied"}
                                        onChange={handleStatusChange}
                                        className="status-radio mt-2"
                                    />
                                </div>
                                {/* Vacant Option */}
                                <div
                                    style={{ border: "1px solid #D3D3D3", borderColor: status === "Vacant" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Vacant" ? "black" : "#D3D3D3" }}

                                    className={`p-2 d-flex align-items-center option ${status === "Vacant" ? "selected" : ""
                                        }`}
                                    onClick={() => setStatus("Vacant")}
                                >
                                    <Form.Check
                                        type="radio"
                                        label="Vacant"
                                        name="status"
                                        value="Vacant"
                                        checked={status === "Vacant"}
                                        onChange={handleStatusChange}
                                        className="status-radio mt-2"
                                    />
                                </div>
                            </div>
                            {/* Agreement Checkbox */}
                            <Form.Group controlId="agreementCheckbox" className="mt-4">
                                <Form.Check
                                    type="checkbox"
                                    label="By submitting, you agree to select Occupied"
                                    checked={isAgreed}
                                    className='mt-3'
                                    onChange={handleAgreementChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className=" d-flex justify-content-between">
                        <Button
                            className="cancel-btn radious "
                            style={{ border: "1px solid #D3D3D3", width: "175px" }}
                            variant="light"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="save-btn radious "
                            style={{
                                background: "linear-gradient(90deg, #FE512E, #F09619)",
                                border: "none",
                                width: "175px", cursor: "pointer"
                            }}

                            onClick={HandleSubmit}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    );
};

export default ResidentManageMent;
