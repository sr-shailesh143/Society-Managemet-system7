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
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoMdClose } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";




export default function SecurityLayout({ component }) {
    const [show, setShow] = useState(false);
    const naviget = useNavigate()
    const [serch, setserch] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const [show2, setShow2] = useState(false);
    const [showFinancialSubmenu2, setShowFinancialSubmenu2] = useState(false);
    const [showFinancialSubmenu3, setShowFinancialSubmenu3] = useState(false);




    // Toggle Financial Management submenu
    const toggleFinancialSubmenu = () => setShowFinancialSubmenu2(!showFinancialSubmenu2);
    const toggleFinancialSubmenu1 = () => setShowFinancialSubmenu3(!showFinancialSubmenu3);



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

            <div className="row ">
                <div className=" d-flex">

                    <div className="  layout  col-12 col-md-3 side-bar   ">
                        <Logo className="mt-1">
                            <Link to={"/deshbord"}>
                                <img className='sidebar-logo' src="src/assets/Logo.png" alt="Logo" />
                            </Link>
                            <center>
                                <div style={{ border: "1px solid #F4F4F4" }} className="  mt-5 ">
                                </div>
                            </center>
                        </Logo>
                        <NavLinks className='h-50' style={{ height: "60vh" }}>




                            <Link className='link-tag' to={"/VisitorTracking"} onClick={toggleFinancialSubmenu} >  <div className='side-design' ><SidebarMiniButton /> </div>   <NavLink style={{ background: "linear-gradient(90deg, #FE512E 0%, #F09619 100%)", color: "white", textDecoration: "none" }} className=' d-flex gap-3 radious'><svg width="24" height="24" color='white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.4098 6.95994V8.78994C20.4098 9.42994 20.1098 10.0299 19.5898 10.3999L8.58984 18.4599C7.87984 18.9799 6.90984 18.9799 6.20984 18.4499L4.76984 17.3699C4.11984 16.8799 3.58984 15.8199 3.58984 15.0099V6.95994C3.58984 5.83994 4.44984 4.59994 5.49984 4.20994L10.9698 2.15994C11.5398 1.94994 12.4598 1.94994 13.0298 2.15994L18.4998 4.20994C19.5498 4.59994 20.4098 5.83994 20.4098 6.95994Z" fill="white" />
                                <path d="M18.8201 12.3399C19.4801 11.8599 20.4101 12.3299 20.4101 13.1499V15.0299C20.4101 15.8399 19.8801 16.8899 19.2301 17.3799L13.7601 21.4699C13.2801 21.8199 12.6401 21.9999 12.0001 21.9999C11.3601 21.9999 10.7201 21.8199 10.2401 21.4599L9.41011 20.8399C8.87011 20.4399 8.87011 19.6299 9.42011 19.2299L18.8201 12.3399Z" fill="#ffff" />
                            </svg>Security </NavLink> </Link>



                            {/* acoding */}

                            {showFinancialSubmenu2 && (
                                <Submenu>
                                    <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/VisitorTracking" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/VisitorTracking")}> Visitor Tracking</span></SubmenuItem>
                                    <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/EmergencyManagement" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/EmergencyManagement")}>Emergency Management</span></SubmenuItem>
                                </Submenu>
                            )}



                            <br />
                            <br />

                            <p className=' text-danger' style={{ margin: " 10px", padding: "15px", cursor: "pointer", borderTop: "1px solid #F4F4F4", marginTop: "60vh" }}> <TbLogout className='fs-3' />  Logout</p>
                        </NavLinks>
                    </div>
                    <div className="col-12 col-md-9 ">
                        <div style={{ borderLeft: "2px solid #F6F8FB" }} className="navbar p-4">
                            <div className="app-bar ">
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
                                        <NavLinks>



                                            <Link className='link-tag' to={"/VisitorTracking"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/Security" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>   <NavLink style={{ background: location.pathname === "/VisitorTracking" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/VisitorTracking" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'><HiMiniCurrencyDollar className=' fs-3 mb-1 ' /> Security </NavLink> </Link>
                                            {/* acoding */}

                                            {showFinancialSubmenu2 && (
                                                <Submenu>
                                                    <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/VisitorTracking" ? "2px solid black" : "2px solid gray" }}> Visitor Tracking</span></SubmenuItem>
                                                    <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/EmergencyManagement" ? "2px solid black" : "2px solid gray" }}>Emergency Management</span></SubmenuItem>
                                                </Submenu>
                                            )}


                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />



                                            <p className='mt-5 text-danger' style={{ margin: " 10px", padding: "14px", cursor: "pointer", borderTop: "1px solid #F4F4F4", }}> <TbLogout className='fs-3' />  Logout</p>
                                        </NavLinks>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                            <div className="search">



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
                        <div className="component-layout  h-100   ">

                            <br />
                            <div className="p-4">
                                <div className="container-fluid" style={{ height: "100vh", overflow: "hidden" }}>


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
