import React from 'react'
import styled from 'styled-components';
import { FaBarsStaggered, FaGreaterThan } from "react-icons/fa6";
import { MdNotificationImportant } from "react-icons/md"
import { MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoMdClose } from "react-icons/io";
import { FaClipboardUser } from "react-icons/fa6";
import { CiSearch } from 'react-icons/ci';
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdCalendar } from "react-icons/io";
import { GiShirtButton } from "react-icons/gi";
import { IoWallet } from "react-icons/io5";
import { GiSecurityGate } from "react-icons/gi";
export default function ResidentManageMentLayout({ component }) {
    const [show, setShow] = useState(false);
    const naviget = useNavigate()
    const [serch, setserch] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const [show2, setShow2] = useState(false);
    const [showFinancialSubmenu2, setShowFinancialSubmenu2] = useState(false);




    // Toggle Financial Management submenu
    const toggleFinancialSubmenu = () => setShowFinancialSubmenu2(!showFinancialSubmenu2);




    // notification 


    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleAccept = (id) => {
        alert(`Accepted notification with ID ${id}`);
    };

    const handleDecline = (id) => {
        alert(`Declined notification with ID ${id}`);
    };

    const clearAll = () => {
        setNotifications([]);
    };


    const [notifications, setNotifications] = useState([
        {
            id: 1,
            img: "src/assets/notification-img.png",
            title: "Evelyn Harper (A-101)",
            time: "Monday 11:41 AM",
            message: "Evelyn Harper gave a fund of 1000 rupees for Navratri.",
            linkText: "1000 rupees",
            timeAgo: "32 Minutes ago",
        },
        {
            id: 2,
            img: "src/assets/notification-img.png",
            title: "Maintenance (A-101)",
            time: "Tuesday 11:41 AM",
            message: "Evelyn Harper gave a Maintenance of 1000 rupees.",
            linkText: "Maintenance of 1000 rupees",
            timeAgo: "2 days ago",
        },
        {
            id: 3,
            img: "src/assets/notification-img.png",
            title: "Ganesh Chaturthi (A-101)",
            time: "Saturday 11:41 AM",
            message: "Per Person Amount : ₹1,500\nThe celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in OurResident.",
            linkText: "₹1,500",
            timeAgo: "2 days ago",
        },
    ]);

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
  higth:50vh;
  
`;


    const NavLink = styled.li`
  padding: 14px ;
  margin:14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #4F4F4F;
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

    const SidebarMiniButton = styled.div`
  width: 10px;
  height: 50px;
  padding: 14px ;
left:-23px;
  background: linear-gradient(180deg, #ff5722, #ff9800);
  border-radius: 6px;
   border-right:2px solid black
  cursor: pointer;
  position: relative;
  
 Optional shadow for a bit of 3D effect
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
    return (
        <div className='container-fulid' style={{ overflow: "hidden" }}>

            <div className="row  ">
                <div className=" d-flex ">

                    <div className="  layout  col-12 col-md-3 side-bar    ">
                        <Logo className="mt-1">
                            <Link to={"/deshbord"}>
                                <img className='sidebar-logo' src="src/assets/Logo.png" alt="Logo" />
                            </Link>
                            <center>
                                <div style={{ border: "1px solid #F4F4F4" }} className="  mt-5 ">
                                </div>
                            </center>
                        </Logo>
                        <NavLinks className='h-100' style={{ height: "100vh" }}>
                            <Link className='link-tag' to={"/deshbord"}  > <div className='side-design' style={{ display: location.pathname === "/deshbord" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <BsFillBoxSeamFill className=' fs-3 mb-1' />Service And Complaint  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <IoMdCalendar className=' fs-3 mb-1' />Events Participation  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <GiShirtButton className=' fs-3 mb-1' />Community  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <IoWallet className=' fs-3 mb-1' />Payment Portal  </NavLink></Link>
                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <GiSecurityGate  className=' fs-3 mb-1' />Security Protocols  </NavLink></Link>
                          

                            <p className=' text-danger' style={{ margin: " 10px", padding: "15px", cursor: "pointer", borderTop: "1px solid #F4F4F4", marginTop: "60vh" }}> <TbLogout className='fs-3' />  Logout</p>
                        </NavLinks>
                    </div>
                    <div className="col-12 col-md-9  ">
                        <div style={{ borderLeft: "2px solid #F6F8FB" }} className="navbar p-4 ">
                            <div className="app-bar  ">
                                <FaBarsStaggered variant="primary" onClick={handleShow} />
                                <Offcanvas show={show} onHide={handleClose}>
                                    <Offcanvas.Header closeButton className='fs-3' />
                                    <Offcanvas.Title>
                                        <Logo className="mt-1">
                                            <Link to={"/deshbord"}>
                                                <img className='sidebar-logo' src="src/assets/Logo.png" alt="Logo" />
                                            </Link>
                                            <center>
                                                <div style={{ border: "1px solid #F4F4F4" }} className="  mt-5 ">
                                                </div>
                                            </center>
                                        </Logo>
                                    </Offcanvas.Title>
                                    <Offcanvas.Body>
                                        {/* sidebar for A mobail sceen */}
                                        <NavLinks className='h-100' style={{ height: "100vh" }}>
                                            <Link className='link-tag' to={"/deshbord"}  > <div className='side-design' style={{ display: location.pathname === "/deshbord" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                            <Link className='link-tag' to={"/PersonalDetail"}  > <div className='side-design' style={{ display: location.pathname === "/PersonalDetail" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/PersonalDetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <FaClipboardUser className=' fs-3 mb-1' />Personal Detail  </NavLink></Link>
                                           
                                            <p className=' text-danger' style={{ margin: " 10px", padding: "15px", cursor: "pointer", borderTop: "1px solid #F4F4F4", marginTop: "60vh" }}> <TbLogout className='fs-3' />  Logout</p>
                                        </NavLinks>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                            <div className="search">
                                {
                                    location.pathname === "/deshbord" ? <div><SearchBar className='perent-search' onChange={() => setserch(2)} type='search' placeholder="           Search Here" />  <CiSearch className='fs-3 fw-bolde child-search ' style={{ display: serch == 0 ? "block" : "none" }} /> </div> : <div> <span onClick={() => naviget("/deshbord")} style={{ color: "#A7A7A7", cursor: "pointer" }}>Home</span>  <span className='ms-2  mb-2'><FaGreaterThan className='' /></span> <span style={{ color: "#5678E9" }} className='ms-2'>{location.pathname.split("/")}</span></div>
                                }


                            </div>
                            <UserInfo>

                                <Notifiction >

                                    <MdNotificationImportant style={{ cursor: "pointer" }} onClick={toggleDropdown} className='fs-2 mx-2' />

                                    {
                                        isOpen && (
                                            <div className="notifications-container">
                                                <div className="notifications-header">
                                                    <h2>Notification</h2>
                                                    {
                                                        notifications.length > 0 ? <button className="clear-all" onClick={clearAll}>Clear all</button> : <IoMdClose className='fs-3 mb-1' style={{ cursor: "pointer" }} onClick={toggleDropdown} />
                                                    }
                                                </div>
                                                <div className="notifications-list col-12">
                                                    {notifications.length > 0 ? notifications.map((notification) => (
                                                        <div key={notification.id} className="notification-item">
                                                            <div className="notification-content">
                                                                <h3><img src={notification.img} alt="" /> {notification.title}</h3>
                                                                <p className="notification-time">{notification.time}</p>
                                                                <p>
                                                                    {notification.message.replace(notification.linkText, '')}
                                                                    <a href="#">{notification.linkText}</a>
                                                                </p>
                                                            </div>
                                                            <div className="notification-actions">
                                                                <button onClick={() => handleAccept(notification.id)} className="accept-btn">Accept</button>
                                                                <button onClick={() => handleDecline(notification.id)} className="decline-btn">Decline</button>
                                                                <span className="time-ago">{notification.timeAgo}</span>
                                                            </div>
                                                        </div>
                                                    )) : <img width={"100%"} src='src/assets/notification.png' />}
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        isOpen && (
                                            <div className="notifications-mobile d-sm-block d-md-none" >
                                                <div className="row">
                                                    <div className="col-12 w-100">
                                                        <div className="notifications-header">
                                                            <h2 className='ms-2'>Notification</h2>
                                                            {
                                                                notifications.length > 0 ? <button className="clear-all mx-3" onClick={clearAll}>Clear all</button> : <IoMdClose className='fs-3 mb-1 mx-3' style={{ cursor: "pointer" }} onClick={toggleDropdown} />
                                                            }

                                                        </div>
                                                        <div className="notifications-list col-12">
                                                            {notifications.length > 0 ? notifications.map((notification) => (
                                                                <div key={notification.id} className="notification-item">
                                                                    <div className="notification-content">
                                                                        <h3><img src={notification.img} alt="" /> {notification.title}</h3>
                                                                        <p className="notification-time">{notification.time}</p>
                                                                        <p>
                                                                            {notification.message.replace(notification.linkText, '')}
                                                                            <a href="#">{notification.linkText}</a>
                                                                        </p>
                                                                    </div>
                                                                    <div className="notification-actions">
                                                                        <button onClick={() => handleAccept(notification.id)} className="accept-btn">Accept</button>
                                                                        <button onClick={() => handleDecline(notification.id)} className="decline-btn">Decline</button>
                                                                        <span className="time-ago">{notification.timeAgo}</span>
                                                                    </div>
                                                                </div>
                                                            )) : <img width={"100%"} src='src/assets/notification.png' />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }



                                </Notifiction>
                                <div className="lile border   " style={{ height: "40px" }}>
                                </div>

                                <UserAvatar onClick={() => naviget("/profile")} className='' src="src/assets/Avatar.png" alt="User" style={{ cursor: "pointer" }} />


                                <UserName className=' search'>Moni Roy
                                    <br />
                                    <span className='mx-1 text-color '>admin</span>

                                </UserName>
                            </UserInfo>
                        </div>
                        <div className="component-layout  h-100    ">

                            <br />
                            <div className="p-4">
                                <div className="container-fluid" >


                                    {component}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}