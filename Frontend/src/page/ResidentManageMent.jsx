import React, { useState } from 'react';
import { Button, Box, styled } from '@mui/material';
import { Edit, Image, PlusOne } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LuBuilding2 } from "react-icons/lu";
import { FaBuildingUser, FaPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArticleIcon from '@mui/icons-material/Article';
const ResidentManageMent = () => {
    const naviget = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [status, setStatus] = useState("Occupied");
    const [isAgreed, setIsAgreed] = useState(false);

    const handleStatusChange = (event) => setStatus(event.target.value);
    const handleAgreementChange = () => setIsAgreed(!isAgreed);

    function HandleSubmit() {
        try {
            if (status === "Occupied") {

                naviget("/owner")
                setShow(false)
            } else {

                setShow(false)
                setShow3(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function HandleSubmit1() {
        try {
            setShow3(false)
            setShow4(true)

        } catch (error) {
            console.log(error)
        }
    }
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false)

    function handleShow1(Residence) {
        try {
            if (Residence === "Owner") {
                console.log("Owner")
                setShow1(true)
            } else {
                console.log("terent")
                setShow2(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const data = [
        {
            img: "src/assets/notification-img.png",
            fullName: "Evelyn Harper",
            unitNumber: "1001",
            unitStatus: "Occupied",
            residentStatus: "Tenant",
            phoneNumber: "97587 85828",
            member: 1,
            vehicle: 2,
            wing: "A"
        },
        {
            img: "",

            fullName: " ",
            unitNumber: "1002",
            unitStatus: "Vacate",
            residentStatus: "",
            phoneNumber: "",
            member: 0,
            vehicle: 0,
            wing: "B"
        },
        {
            img: "src/assets/notification-img.png",

            fullName: "Robert Fox",
            unitNumber: "2002",
            unitStatus: "Occupied",
            residentStatus: "Tenant",
            phoneNumber: "97587 85828",
            member: 3,
            vehicle: 1,
            wing: "C"
        },
        {
            img: "src/assets/notification-img.png",

            fullName: "Evelyn Harper",
            unitNumber: "2004",
            unitStatus: "Occupied",
            residentStatus: "Owner",
            phoneNumber: "97587 85828",
            member: 6,
            vehicle: 3,
            wing: "D"
        },
    ];

    const wing = { backgroundColor: '#F6F8FB', width: "131px", padding: '5px 10px', borderRadius: '12px', color: '#5678E9', }
    const occupied = { backgroundColor: '#ECFFFF', width: "131px", padding: '5px 10px', borderRadius: '12px', color: '#14B8A6', }
    const vacate = { backgroundColor: '#FFF6FF', padding: '5px 20px', borderRadius: '12px', color: '#9333EA', maxWidth: "95.31px", }
    const Tenant = { backgroundColor: '#FFF1F8', padding: '5px 10px', borderRadius: '12px', color: '#EC4899', }
    const Owner = { backgroundColor: '#F1F0FF', padding: '5px 10px', borderRadius: '12px', color: '#4F46E5', }
    const blanck = { backgroundColor: '#F6F8FB', padding: '5px 40px', borderRadius: '12px', color: '#4F4F4F', }
    const view = { backgroundColor: '#F6F8FB', padding: '10px 10px', borderRadius: '12px', color: '#5678E9', }
    return (
        <>
            <Box className="radious" bgcolor={"white"} sx={{ height: '904px', width: '100%', padding: 2 }}>
                <div className="row mt-3 justify-content-between align-items-center">
                    <div className="col-12 col-md-6 mt-2 add-text ">
                        <h5 className='fs-4 add-text'>Resident Tenant and Owner Details</h5>
                    </div>
                    <div className="col-12 col-md-3 mt-1 add-p-btn p-2 ">
                        <div className=' add-btn ' onClick={() => naviget("/owner")}> <span><FaPlus /></span> <span>Add New Resident details</span> </div>
                    </div>
                </div>
                <div className="responsive-table-container">
                    <table className="responsive-table">
                        <thead className='tabal-header'>
                            <tr>
                                <th className='redious'> &nbsp;&nbsp;  Full Name</th>
                                <th>Unit Number</th>
                                <th> &nbsp;&nbsp;&nbsp;Unit Status</th>
                                <th>Resident Status</th>
                                <th>Phone Number</th>
                                <th>Member</th>
                                <th>Vehicle </th>
                                <th className='redious1'> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.fullName === "" || item.img === "" ? <span><img src="\src\assets\blenck.png" alt="" /> <span>--</span></span> : <span><img src={item.img} alt="" /> <span>  {item.fullName}</span> </span>
                                        }
                                    </td>
                                    <td ><span className='status-badge-wing' style={wing}>{item.wing}</span>   {item.unitNumber}</td>
                                    <td>
                                        {
                                            item.unitStatus === "Occupied" ? <span style={occupied}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="#14B8A6" />
                                                <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="#14B8A6" />
                                                <path d="M14.9502 6H9.1202C7.7802 6 6.7002 7.08 6.7002 8.42V19.58C6.7002 20.92 7.7802 22 9.1202 22H10.7502C11.0302 22 11.2502 21.78 11.2502 21.5V19C11.2502 18.59 11.5902 18.25 12.0002 18.25C12.4102 18.25 12.7502 18.59 12.7502 19V21.5C12.7502 21.78 12.9702 22 13.2502 22H14.9602C16.2902 22 17.3702 20.92 17.3702 19.59V8.42C17.3702 7.08 16.2902 6 14.9502 6ZM14.0002 14.75H10.0002C9.5902 14.75 9.2502 14.41 9.2502 14C9.2502 13.59 9.5902 13.25 10.0002 13.25H14.0002C14.4102 13.25 14.7502 13.59 14.7502 14C14.7502 14.41 14.4102 14.75 14.0002 14.75ZM14.0002 11.75H10.0002C9.5902 11.75 9.2502 11.41 9.2502 11C9.2502 10.59 9.5902 10.25 10.0002 10.25H14.0002C14.4102 10.25 14.7502 10.59 14.7502 11C14.7502 11.41 14.4102 11.75 14.0002 11.75Z" fill="#14B8A6" />
                                            </svg>
                                                <span className=''>{item.unitStatus}</span></span> : <span style={vacate}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.3196 3H5.08961C3.09961 3 2.09961 4.01 2.09961 6.02V22H7.49961V18.25C7.49961 17.84 7.83961 17.5 8.24961 17.5C8.65961 17.5 8.99961 17.83 8.99961 18.25V22H14.2996V6.02C14.2996 4.01 13.3096 3 11.3196 3ZM10.7496 12.75H5.79961C5.38961 12.75 5.04961 12.41 5.04961 12C5.04961 11.59 5.38961 11.25 5.79961 11.25H10.7496C11.1596 11.25 11.4996 11.59 11.4996 12C11.4996 12.41 11.1596 12.75 10.7496 12.75ZM10.7496 9H5.79961C5.38961 9 5.04961 8.66 5.04961 8.25C5.04961 7.84 5.38961 7.5 5.79961 7.5H10.7496C11.1596 7.5 11.4996 7.84 11.4996 8.25C11.4996 8.66 11.1596 9 10.7496 9Z" fill="#9333EA" />
                                                    <path d="M23 21.2501H20.73V18.2501C21.68 17.9401 22.37 17.0501 22.37 16.0001V14.0001C22.37 12.6901 21.3 11.6201 19.99 11.6201C18.68 11.6201 17.61 12.6901 17.61 14.0001V16.0001C17.61 17.0401 18.29 17.9201 19.22 18.2401V21.2501H1C0.59 21.2501 0.25 21.5901 0.25 22.0001C0.25 22.4101 0.59 22.7501 1 22.7501H19.93C19.95 22.7501 19.96 22.7601 19.98 22.7601C20 22.7601 20.01 22.7501 20.03 22.7501H23C23.41 22.7501 23.75 22.4101 23.75 22.0001C23.75 21.5901 23.41 21.2501 23 21.2501Z" fill="#9333EA" />
                                                </svg>
                                                <span className='mt-1 ms-1'>{item.unitStatus}</span> </span>
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
                                        {
                                            item.member <= 0 ? <span style={wing}>-</span> : <span >  &nbsp; &nbsp;{item.member}</span>
                                        }
                                    </td>
                                    <td colSpan={1}>
                                        {
                                            item.vehicle <= 0 ? <span style={wing}>-</span> : <span>  &nbsp; &nbsp;{item.vehicle} </span>
                                        }
                                    </td>
                                    <td className="action-buttons">
                                        {
                                            item.fullName === "" || item.residentStatus === "" || item.phoneNumber === "" ? <span style={blanck}> --</span> : <span className='d-flex gap-2'>
                                                <span className='cursor' onClick={handleShow} style={view}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#39973D" />
                                                    </svg>
                                                </span>
                                                <span onClick={() => handleShow1(item.residentStatus)} style={view} className='cursor'>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                                                        <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                                                    </svg>

                                                </span>
                                            </span>

                                        }
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </Box>

            <Offcanvas show={show1} placement={"end"} >
                <div className="show-layout">
                    <div className="show-layout-body">
                        <div className="show-layout-header d-flex gap-4 mt-3">
                            <img className='mb-2 ms-3' src="/src/assets/closearo.png" alt="" onClick={handleClose1} />
                            <h4 className='mt-1 header-text'>View Owner Details</h4>
                        </div>

                        <div className="view-layour-body mt-3">
                            <div className="iew-layout-profile mt-4">
                                <center>
                                    <img width={"90px"} height={"90px"} src="/src/assets/Avatar.png" className='fs-1' alt="" />
                                    <h5 className='view-name mt-1'>Roger Lubin</h5>
                                    <p className='view-email'>RogerLubin@gmail.com</p>
                                </center>
                            </div>
                            <center>

                                <div className="viwe-detels-layout ">
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Wing</p>
                                        <p className='mx-3 text-2'>A</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2 ">
                                        <p className='ms-3  text-1'>Unit</p>
                                        <p className='mx-3 text-2'>101</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Age</p>
                                        <p className='mx-3 text-2'>20</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2">
                                        <p className='ms-3  text-1'>Gender</p>
                                        <p className='mx-3 text-2'>Male</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout mt-3 ">
                                    <div className="profile-detels ">
                                        <div >
                                            <h5 className='title'>Document</h5>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon  cursor">
                                                            <Image className='fs-3 cursor' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Adharcard Front Side.JPG
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1 cursor">
                                                        <VisibilityIcon />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <ArticleIcon className='fs-3 text-danger' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Address Proof Front Side.PDF
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Member Counting</h6>
                                        <h6 className='mx-3 mt-2 text-white'>02</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                </div>

                            </center>
                        </div>
                    </div>
                </div>
            </Offcanvas>

            <Offcanvas show={show2} placement={"end"} >
                <div className="show-layout">
                    <div className="show-layout-body">
                        <div className="show-layout-header d-flex gap-4 mt-3">
                            <img className='mb-2 ms-3' src="/src/assets/closearo.png" alt="" onClick={handleClose2} />
                            <h4 className='mt-1 header-text'>View Tenant Details</h4>
                        </div>

                        <div className="view-layour-body mt-3">
                            <div className="iew-layout-profile mt-4">
                                <center>
                                    <img width={"90px"} height={"90px"} src="/src/assets/Avatar.png" className='fs-1' alt="" />
                                    <h5 className='view-name mt-1'>Roger Lubin</h5>
                                    <p className='view-email'>RogerLubin@gmail.com</p>
                                </center>
                            </div>
                            <center>

                                <div className="viwe-detels-layout ">
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Wing</p>
                                        <p className='mx-3 text-2'>A</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2 ">
                                        <p className='ms-3  text-1'>Unit</p>
                                        <p className='mx-3 text-2'>101</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Age</p>
                                        <p className='mx-3 text-2'>20</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2">
                                        <p className='ms-3  text-1'>Gender</p>
                                        <p className='mx-3 text-2'>Male</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout mt-3 ">
                                    <div className="profile-detels ">
                                        <div >
                                            <h5 className='title'>Document</h5>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <Image className='fs-3' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Adharcard Front Side.JPG
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <ArticleIcon className='fs-3 text-danger' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Address Proof Front Side.PDF
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Owner Details</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'> Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Address</p>
                                            <p className='mx-3 text-2'>2972 Westheimer Rd..</p>
                                        </div>
                                        z
                                    </div>

                                </div>

                            </center>
                            <center>

                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Member Counting</h6>
                                        <h6 className='mx-3 mt-2 text-white'>02</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                </div>

                            </center>
                        </div>
                    </div>
                </div>
            </Offcanvas>
            <div className="d-flex justify-content-center" style={{ width: "500px" }}>
                <Modal className="custom-modal" show={show} centered style={{ width: "100%" }} >
                    <Modal.Header >
                        <Modal.Title>Residence Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form>
                            <div className="status-options d-flex justify-content-between" style={{ width: "100%" }} >
                                {/* Occupied Option */}
                                <div
                                    className={`p-4 d-flex align-items-center option ${status === "Occupied" ? "selected" : ""
                                        }`}
                                    onClick={() => setStatus("Occupied")}
                                    style={{ border: "1px solid #D3D3D3", borderColor: status === "Occupied" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Occupied" ? "black" : "#D3D3D3", width: "50%" }}
                                >
                                    <Form.Check type="radio" label="Occupied" name="status" value="Occupied" checked={status === "Occupied"} onChange={handleStatusChange} className="status-radio mt-2" />
                                </div>

                                <div style={{ border: "1px solid #D3D3D3", borderColor: status === "Vacant" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Vacant" ? "black" : "#D3D3D3", width: "50%" }}

                                    className={`p-4 d-flex align-items-center option ${status === "Vacant" ? "selected" : ""
                                        }`} onClick={() => setStatus("Vacant")} >
                                    <Form.Check type="radio" label="Vacant" name="status" value="Vacant" checked={status === "Vacant"} onChange={handleStatusChange} className="status-radio mt-2 " />
                                </div>
                            </div>

                            <Form.Group controlId="agreementCheckbox" className=" d-flex align-items-center">
                                <Form.Check type="checkbox" label="" checked={isAgreed} onChange={handleAgreementChange} />
                                <span className="no-wrap p-3" style={{ color: "lightgrey" }}>
                                    By submitting, you agree to select Occupied
                                </span>

                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <div className="d-flex w-100 gap-3 justify-content-center">
                            <Button
                                className="cancel-btn radious w-100"
                                style={{
                                    border: "1px solid #D3D3D3",
                                    textAlign: "center",
                                }}
                                variant="light"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="save-btn radious w-100"
                                style={{
                                    background: "linear-gradient(90deg, #FE512E, #F09619)",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "center",
                                }}
                                onClick={HandleSubmit}
                            >
                                Save
                            </Button>
                        </div>
                    </Modal.Footer>

                </Modal>
            </div>
            {/* Residence Status popup for select wing and unit */}
            <div className="d-flex justify-content-center">
                <Modal className="custom-modal" show={show3} centered >
                    <Modal.Header >
                        <Modal.Title>Residence Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="status-options d-flex ">
                                {/* Occupied Option */}
                                <div className="col-md-6 col-10">
                                    <label className='text-wrap fw-bold' style={{ textAlign: "center" }}>Wing<span className='text-danger1 '>*</span></label>
                                    <select className="form-select  input-text mt-1 input-style  custom-select-width" style={{ width: "175px" }} required>
                                        <option>Select Wing</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                                {/* Vacant Option */}
                                <div className="col-md-6 col-10 ">
                                    <label className='text-wrap fw-bold'>Unit<span className='text-danger1 '>*</span></label>
                                    <select className="form-select input-text mt-1 input-style custom-select-width" style={{ width: "175px!important" }} required>
                                        <option>Select Unit</option>
                                        <option>1000</option>
                                        <option>1002</option>
                                        <option>1003</option>
                                    </select>
                                </div>
                            </div>
                            {/* Agreement Checkbox */}
                            <Form.Group controlId="agreementCheckbox" className="mt-4 d-flex align-items-center">

                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <div className="d-flex w-100 gap-2">
                            <Button className="cancel-btn radious w-100" style={{ border: "1px solid #D3D3D3", textAlign: "center", }} variant="light" onClick={handleClose3} >
                                Cancel
                            </Button>
                            <Button className="save-btn radious w-100" style={{ background: "linear-gradient(90deg, #FE512E, #F09619)", border: "none", cursor: "pointer", textAlign: "center", }} onClick={HandleSubmit1} >
                                Confirm
                            </Button>
                        </div>

                    </Modal.Footer>

                </Modal>
            </div>


            {/* Do you want to vacate the finlay flat? */}

            <div className="">
              

                <Modal show={show4}>
                    <Modal.Header>
                        <Modal.Title>Do you want to vacate the finlay flat?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='mode-date'>Are you sure you want to delate all details?</p>
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
                                onClick={handleClose4}
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
                                onClick={() => naviget("/resident") || setShow4(false)}
                            >
                                Conform
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    );
};

export default ResidentManageMent;
