import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { CiSquarePlus } from "react-icons/ci";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LuBuilding2 } from "react-icons/lu";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";

const ResidentManageMent = () => {
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
                        params.row.fullName === "" && params.row.residentStatus === "" && params.row.phoneNumber === ""  ?  <span>--</span>  :  <span>
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

    return (
        <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
            <div className="row mt-3 justify-content-between align-items-center">
                <div className="col-12 col-md-6 mt-2 ">
                    <h5 className='fs-4'>Resident Tenant and Owner Details</h5>
                </div>
                <div className="col-12 col-md-4 mt-2 d-flex justify-content-md-end">
                    <Button
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
    );
};

export default ResidentManageMent;
