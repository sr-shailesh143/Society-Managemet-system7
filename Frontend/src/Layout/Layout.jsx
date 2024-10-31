import React from 'react'
import styled from 'styled-components';
import { FaBarsStaggered } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdNotificationImportant } from "react-icons/md"
import { MdDashboard } from "react-icons/md";
import { MdAddHomeWork } from "react-icons/md";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { PiBuildingsFill } from "react-icons/pi";
import { MdAttachEmail } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import { GrUserPolice } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';




export default function Layout({ component }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const [show2, setShow2] = useState(false);
    const [showFinancialSubmenu2, setShowFinancialSubmenu2] = useState(false);
    const [showFinancialSubmenu3, setShowFinancialSubmenu3] = useState(false);




    // Toggle Financial Management submenu
    const toggleFinancialSubmenu = () => setShowFinancialSubmenu2(!showFinancialSubmenu2);
    const toggleFinancialSubmenu1 = () => setShowFinancialSubmenu3(!showFinancialSubmenu3);



    const SearchBar = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  width: 250px;
background-color: #F6F8FB;

  
`;
    const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

    const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 14px;
`;

    const UserName = styled.span`
  font-size: 16px;
`;
    const Notifiction = styled.span`
  font-size: 16px;
  margin-left: 14px;

`;
    const Search_Icon = styled.span`
  font-size: 16px;
  margin-left: 14px;
 


`;
    const Submenu = styled.ul`
list-style-type: none;
padding-left: 20px;
margin-top: 5px;
`;

    const SubmenuItem = styled.li`
padding: 10px;
color: #202224;
cursor: pointer;

`;
    const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0;
`;

    const NavLink = styled.li`
  padding: 14px ;
  margin:10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #202224;
  cursor: pointer;
  &:hover {
   background: linear-gradient(90deg, #FE512E 0%, #F09619 100%);
color:white;
  }
`;
    const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;
    return (
        <div className='container-fulid' style={{ overflow: "hidden" }}>
            <div className="row d-flex">
                <div className="  layout  col-12 col-md-3  ">
                    <Logo className="mt-1">
                        <Link to={"/deshbord"}>
                            <img className='h-75 w-75' src="src/assets/Logo.png" alt="Logo" />
                        </Link>
                        <center>
                            <div style={{ border: "1px solid #F4F4F4" }} className="  mt-5 ">
                            </div>
                        </center>
                    </Logo>
                    <NavLinks>
                        <Link className='link-tag' to={"/deshbord"}  >  <NavLink style={{ background: location.pathname === "/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>  <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                        <Link className='link-tag' to={"/resident"} > <NavLink style={{ background: location.pathname === "/resident" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/resident" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'>  <MdAddHomeWork className=' fs-3 mb-1' />Resident Management </NavLink></Link>
                        <Link className='link-tag' to={"/financial"} onClick={toggleFinancialSubmenu} >  <NavLink style={{ background: location.pathname === "/financial" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/financial" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'><HiMiniCurrencyDollar className=' fs-3 mb-1 ' /> Financial Management </NavLink> </Link>
                        {/* acoding */}

                        {showFinancialSubmenu2 && (
                            <Submenu>
                                <SubmenuItem>   <span className='p-1' style={{borderLeft:location.pathname === "/income" ? "2px solid black" : "2px solid gray"  }}> Income</span></SubmenuItem>
                                <SubmenuItem> <span className='p-1' style={{borderLeft:location.pathname === "/income" ? "2px solid black" : "2px solid gray"  }}>Expense</span></SubmenuItem>
                                <SubmenuItem> <span className='p-1' style={{borderLeft:location.pathname === "/income" ? "2px solid black" : "2px solid gray"  }}>Note</span></SubmenuItem>
                            </Submenu>
                        )}

                        <Link className='link-tag' to={"/facility"} >  <NavLink className=' d-flex gap-3 radious'><PiBuildingsFill style={{ background: location.pathname === "/facility" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/facility" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' />  Facility Management</NavLink></Link>
                        <Link className='link-tag' to={"/complaint"} onClick={toggleFinancialSubmenu1}  > <NavLink className=' d-flex gap-3 radious'><MdAttachEmail style={{ background: location.pathname === "/complaint" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/complaint" ? "white" : "", textDecoration: "none" }} className='mb-1 fs-3' />   Complaint Tracking</NavLink></Link>
                        {showFinancialSubmenu3 && (
                            <Submenu>
                                <SubmenuItem>Income</SubmenuItem>
                                <SubmenuItem>Expense</SubmenuItem>
                                {/* <SubmenuItem>Note</SubmenuItem> */}
                            </Submenu>
                        )}
                        <Link className='link-tag' to={"/security"} onClick={toggleFinancialSubmenu1} > <NavLink className=' d-flex gap-3 radious'><SiSpringsecurity style={{ background: location.pathname === "/security" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/security" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' />  Security Management</NavLink></Link>
                        {showFinancialSubmenu3 && (
                            <Submenu>
                                <SubmenuItem>Income</SubmenuItem>
                                <SubmenuItem>Expense</SubmenuItem>
                                {/* <SubmenuItem>Note</SubmenuItem> */}
                            </Submenu>
                        )}
                        <Link className='link-tag' to={"/SecurityGuard"}   > <NavLink className=' d-flex gap-3 radious'> <GrUserPolice style={{ background: location.pathname === "/SecurityGuard" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/SecurityGuard" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1 ' /> Security Guard</NavLink></Link>
                        <Link className='link-tag' to={"/Announcement"} >   <NavLink className=' d-flex gap-3 radious'><TfiAnnouncement style={{ background: location.pathname === "/Announcement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Announcement" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' /> Announcement</NavLink></Link>
                        <p className='mt-5 text-danger' style={{ margin: " 10px", padding: "14px" }}> <TbLogout className='fs-3' />  Logout</p>
                    </NavLinks>
                </div>
                <div className="col-12 col-md-9">
                    <div style={{ borderLeft: "2px solid #F6F8FB" }} className="navbar p-4">
                        <div className="app-bar ">
                            <FaBarsStaggered variant="primary" onClick={handleShow} />
                            <Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton className='fs-3' />
                                <Offcanvas.Title>
                                    <Logo className="mt-1">
                                        <Link to={"/deshbord"}>
                                            <img className='h-75 w-75' src="src/assets/Logo.png" alt="Logo" />
                                        </Link>
                                        <center>
                                            <div style={{ border: "1px solid #F4F4F4" }} className="  mt-5 ">
                                            </div>
                                        </center>
                                    </Logo>
                                </Offcanvas.Title>
                                <Offcanvas.Body>
                                    {/* sidebar for A mobail sceen */}
                                    <NavLinks>
                                        <Link className='link-tag' to={"/deshbord"}  >  <NavLink style={{ background: location.pathname === "/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>  <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                                        <Link className='link-tag' to={"/resident"} > <NavLink style={{ background: location.pathname === "/resident" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/resident" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'>  <MdAddHomeWork className=' fs-3 mb-1' />Resident Management </NavLink></Link>
                                        <Link className='link-tag' to={"/financial"} >   <NavLink style={{ background: location.pathname === "/financial" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/financial" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'><HiMiniCurrencyDollar className=' fs-3 mb-1 ' /> Financial Management </NavLink></Link>
                                        <Link className='link-tag' to={"/facility"} >  <NavLink className=' d-flex gap-3 radious'><PiBuildingsFill style={{ background: location.pathname === "/facility" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/facility" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' />  Facility Management</NavLink></Link>
                                        <Link className='link-tag' to={"/complaint"} > <NavLink className=' d-flex gap-3 radious'><MdAttachEmail style={{ background: location.pathname === "/complaint" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/complaint" ? "white" : "", textDecoration: "none" }} className='mb-1 fs-3' />   Complaint Tracking</NavLink></Link>
                                        <Link className='link-tag' to={"/security"} > <NavLink className=' d-flex gap-3 radious'><SiSpringsecurity style={{ background: location.pathname === "/security" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/security" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' />  Security Management</NavLink></Link>
                                        <Link className='link-tag' to={"/SecurityGuard"} > <NavLink className=' d-flex gap-3 radious'> <GrUserPolice style={{ background: location.pathname === "/SecurityGuard" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/SecurityGuard" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1 ' /> Security Guard</NavLink></Link>
                                        <Link className='link-tag' to={"/Announcement"} >   <NavLink className=' d-flex gap-3 radious'><TfiAnnouncement style={{ background: location.pathname === "/Announcement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Announcement" ? "white" : "", textDecoration: "none" }} className='fs-3 mb-1' /> Announcement</NavLink></Link>
                                        <p className='mt-5 text-danger' style={{ margin: " 10px", padding: "14px" }}> <TbLogout className='fs-3' />  Logout</p>
                                    </NavLinks>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                        <div className="search">
                            <SearchBar className='perent-search' type='search' placeholder=" 🔍    Search Here" />
                            {/* <CiSearch className=' child-search fs-3 ' /> */}
                        </div>
                        <UserInfo>
                            <Search_Icon className='search-icon'>
                                <CiSearch className='fs-2' />
                            </Search_Icon>
                            <Notifiction>

                                <MdNotificationImportant className='fs-2 mx-2' />



                            </Notifiction>

                            <div className="lile border   " style={{ height: "40px" }}>

                            </div>
                            <UserAvatar className='' src="https://s3-alpha-sig.figma.com/img/0f9b/81fa/21460d39cd98ccca0d3fa906d5718aa3?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oNTPeM6vloIXEbk16p-TPHtaOf~txT2cNV3l566txULpzAiTqkjHx4obo3JYC9MOX2lmBBCihAl7K~uz0OA~pT61Fud2tAvlgf7pz1NFrV9GV6ptIJFZwK6U5UhU9Za~gZFJxXHt7QeueIGljRFF9kn1lIpNoLOFIePH9Y3fqTkN3ldOaKmvgA6cJahEmIfQwraOAUzKYnqZDBS4bcxYBVCpxQSrZ1f2P06Bc3q72NhOh1dQkVz5wOEfKrSoZ0HzPcVbRbpMuTmtFnLwN~~ZDviAQxfSEXszNPZmmScQGaFqkORB30bNoG2TjgUwWwDq3LSBf~PpfO6FmT~YLW5Dag__" alt="User" />
                            <UserName className=' search'>Moni Roy
                                <br />
                                <span className='mx-1 text-color '>admin</span>

                            </UserName>
                        </UserInfo>
                    </div>
                    <div className="component-layout  h-100 W-100 ">
                        <div className="container h-100 w-100">
                            {component}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
