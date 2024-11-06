import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { CiSquarePlus } from "react-icons/ci";
import VisibilityIcon from '@mui/icons-material/Visibility';


const ResidentManageMent = () => {
    // Sample Data
    const rows = [
        { id: 1, fullName: 'Evelyn Harper', unitNumber: '1001', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 1 },
        { id: 2, fullName: '-', unitNumber: '1002', unitStatus: 'Vacate', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 3, vehicles: 2 },
        { id: 3, fullName: 'Evelyn Harper', unitNumber: '1003', unitStatus: 'Occupied', residentStatus: 'Owner', phoneNumber: '97687 85628', members: 3, vehicles: 1 },
        { id: 5, fullName: 'Robert Foxc', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 6, fullName: 'Robecsrt Fox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 8, fullName: 'Robertcsa Fox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 9, fullName: 'Robertvf dFox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 10, fullName: 'Robertvsv Fox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 11, fullName: 'Robert vdvFox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 12, fullName: 'Robert vdsFox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        { id: 13, fullName: 'Robert Fox', unitNumber: '2002', unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 2, vehicles: 3 },
        // Add more resident objects as needed
    ];

    // Define Columns
    const columns = [
        { field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: 'unitNumber', headerName: 'Unit Number', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'unitStatus',
            headerName: 'Unit Status',
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
            field: 'residentStatus',
            headerName: 'Resident Status',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>
                    {params.value}
                </span>
            )
        },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: 'members', headerName: 'Members', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center' },
        { field: 'vehicles', headerName: 'Vehicles', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <>
                    <span>
                        <Edit style={{ cursor: "pointer" }} className='bg-success text-white p-1 radious mx-3' />
                        <VisibilityIcon className='bg-primary p-1 radious text-white' />
                    </span>

                </>
            ),
        },
    ];

    return (
        <Box bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
            <div className='row d-flex justify-content-between gap-5 '>
                <div className="col-12 col-md-6 ">
                    <Typography variant="h5" className='ms-2' component="div">
                        Resident Tenant and Owner Details
                    </Typography>
                </div>
                <div className="col-12 col-md-4" style={{ textWrap: "wrap" }} >
                    <Button variant="contained" className='l-btn' color={"secondary"} startIcon={<CiSquarePlus className='fs-3 text-white' />} >
                        Add New Resident Details
                    </Button>
                </div>

            </div>

            <DataGrid
                className='mt-3'
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                sx={{
                    '& .status-badge.occupied': {
                        backgroundColor: '#4caf50',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        color: '#fff',
                    },
                    '& .status-badge.vacate': {
                        backgroundColor: '#ff4081',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        color: '#fff',
                    },
                    '& .status-badge.tenant': {
                        backgroundColor: '#ff7a00',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        color: '#fff',
                    },
                    '& .status-badge.owner': {
                        backgroundColor: '#1e88e5',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        color: '#fff',
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
