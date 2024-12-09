import React, { useEffect } from 'react'
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logout } from '../apiservices/Authentication';
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from '../redux/authslice';
import { toast } from "react-hot-toast";
import { getProfiles } from '../apiservices/profileservice';

export default function Layout({ component }) {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [serch, setserch] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const [show2, setShow2] = useState(false);
    const [showFinancialSubmenu2, setShowFinancialSubmenu2] = useState(false);
    const [showFinancialSubmenu3, setShowFinancialSubmenu3] = useState(false);
    const [showFinancialSubmenu4, setShowFinancialSubmenu4] = useState(false);


    const handleLogout = async () => {
        try {
            const response = await logout();


            navigate("/");
            dispatch(logoutuser());
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfiles();
                const profiles = response.data;
                if (profiles && profiles.length > 0) {
                    setProfile(profiles[0]);
                }
            } catch (error) {
                toast.error("Error fetching profiles:", error);
            }
        };

        fetchProfile();
    }, []);

    const toggleFinancialSubmenu = () => setShowFinancialSubmenu2(!showFinancialSubmenu2);
    const toggleFinancialSubmenu1 = () => setShowFinancialSubmenu3(!showFinancialSubmenu3);
    const toggleFinancialSubmenu2 = () => setShowFinancialSubmenu4(!showFinancialSubmenu4);

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
        <div className='container-fulid bg-white' style={{ overflow: "hidden" }}>
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
                        <NavLinks className='h-50'>

                            {/* <Link className='link-tag' to={"/deshbord"}  > <div className='side-design' style={{ display: location.pathname === "/deshbord" || location.pathname === "/profile" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/deshbord" || location.pathname === "/profile" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                            <Link className='link-tag' to={"/resident"} >  <div className='side-design' style={{ display: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'>  <MdAddHomeWork className=' fs-3 mb-1' />Resident Management </NavLink></Link>

                            <Link className='link-tag' to={"/Financial"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? "block" : "none" }}><SidebarMiniButton /> </div>   <NavLink style={{ background: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-2  radious'><HiMiniCurrencyDollar className=' fs-3 mb-1 ' /> Financial Management   {location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? <ArrowDropDownIcon className='' /> : ""}</NavLink>  </Link> */}

                            <Link className='link-tag hover-deshbord' to={"/deshbord"}   > <div className='side-design' style={{ display: location.pathname === "/deshbord" || location.pathname === "/profile" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/deshbord" || location.pathname === "/profile" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <svg width="24" height="24" viewBox="0 0 24 24" className='hover-deshbord' fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z" fill={`${location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "#292D32"}`} />
                                <path d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z" fill={`${location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "#292D32"}`} />
                                <path d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z" fill={`${location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "#292D32"}`} />
                                <path d="M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z" fill={`${location.pathname === "/deshbord" || location.pathname === "/profile" ? "white" : "#292D32"}`} />
                            </svg>
                                Dashboard  </NavLink></Link>
                            <Link className='link-tag hover-deshbord' to={"/resident"} >  <div className='side-design' style={{ display: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'>  <svg width="24" height="24" className='hover-deshbord' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM6.25 14.5C6.25 14.91 5.91 15.25 5.5 15.25C5.09 15.25 4.75 14.91 4.75 14.5V9.5C4.75 9.09 5.09 8.75 5.5 8.75C5.91 8.75 6.25 9.09 6.25 9.5V14.5ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM19.25 14.5C19.25 14.91 18.91 15.25 18.5 15.25C18.09 15.25 17.75 14.91 17.75 14.5V9.5C17.75 9.09 18.09 8.75 18.5 8.75C18.91 8.75 19.25 9.09 19.25 9.5V14.5Z" fill={`${location.pathname === "/resident" || location.pathname === "/owner" || location.pathname === "/Tenant" ? "white" : "#292D32"}`} />
                            </svg>
                                Resident Management </NavLink></Link>

                            <Link className='link-tag hover-deshbord' to={"/Financial"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "block" : "none" }}><SidebarMiniButton /> </div>   <NavLink style={{ background: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-2  radious'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2499 8.08002V10.94L10.2399 10.59C9.72992 10.41 9.41992 10.24 9.41992 9.37002C9.41992 8.66002 9.94992 8.08002 10.5999 8.08002H11.2499Z" fill={`${location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "white" : "#292D32"}`} />
                                <path d="M14.58 14.63C14.58 15.34 14.05 15.92 13.4 15.92H12.75V13.06L13.76 13.41C14.27 13.59 14.58 13.76 14.58 14.63Z" fill={`${location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "white" : "#292D32"}`} />
                                <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19.83 4.17 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM14.26 12C15.04 12.27 16.08 12.84 16.08 14.63C16.08 16.17 14.88 17.42 13.4 17.42H12.75V18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V17.42H10.89C9.25 17.42 7.92 16.03 7.92 14.33C7.92 13.92 8.25 13.58 8.67 13.58C9.08 13.58 9.42 13.92 9.42 14.33C9.42 15.21 10.08 15.92 10.89 15.92H11.25V12.53L9.74 12C8.96 11.73 7.92 11.16 7.92 9.37C7.92 7.83 9.12 6.58 10.6 6.58H11.25V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V6.58H13.11C14.75 6.58 16.08 7.97 16.08 9.67C16.08 10.08 15.75 10.42 15.33 10.42C14.92 10.42 14.58 10.08 14.58 9.67C14.58 8.79 13.92 8.08 13.11 8.08H12.75V11.47L14.26 12Z" fill={`${location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? "white" : "#292D32"}`} />
                            </svg>
                                Financial Management   {location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" || location.pathname === "/Otherincome" ? <ArrowDropDownIcon className='' /> : ""}</NavLink>  </Link>

                            {
                                location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? <div> {showFinancialSubmenu2 && (
                                    <Submenu>
                                        <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/Icome" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Icome")}> Income</span></SubmenuItem>
                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Expense" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Expense")}>Expense</span></SubmenuItem>
                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Financial" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Financial")} >Note</span></SubmenuItem>
                                    </Submenu>
                                )} </div> : ""
                            }
                            {/* <Link className='link-tag' to={"/FacilityManagement"} >  <div className='side-design' style={{ display: location.pathname === "/FacilityManagement" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/FacilityManagement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/FacilityManagement" ? "white" : "", textDecoration: "none" }}><PiBuildingsFill className='fs-3 mb-1' />  Facility Management</NavLink></Link> */}
                            {/* <Link className='link-tag' to={"/traking"} onClick={toggleFinancialSubmenu2}  > <div className='side-design' style={{ display: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "white" : "", textDecoration: "none" }}><MdAttachEmail className='mb-1 fs-3' />   Complaint Tracking    {location.pathname === "/traking" || location.pathname === "/RequestTracking" ? <ArrowDropDownIcon /> : ""}</NavLink></Link> */}

                            <Link className='link-tag hover-deshbord' to={"/FacilityManagement"} >  <div className='side-design' style={{ display: location.pathname === "/FacilityManagement" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/FacilityManagement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/FacilityManagement" ? "white" : "", textDecoration: "none" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7497 4.6401L6.31973 2.4501C3.92973 1.2801 1.96973 2.47011 1.96973 5.09011V19.9301C1.96973 21.0701 2.91973 22.0001 4.07973 22.0001H11.4997C12.0497 22.0001 12.4997 21.5501 12.4997 21.0001V7.4101C12.4997 6.3601 11.7097 5.1101 10.7497 4.6401ZM8.96973 13.7501H5.49973C5.08973 13.7501 4.74973 13.4101 4.74973 13.0001C4.74973 12.5901 5.08973 12.2501 5.49973 12.2501H8.96973C9.37973 12.2501 9.71973 12.5901 9.71973 13.0001C9.71973 13.4101 9.38973 13.7501 8.96973 13.7501ZM8.96973 9.7501H5.49973C5.08973 9.7501 4.74973 9.4101 4.74973 9.0001C4.74973 8.59011 5.08973 8.2501 5.49973 8.2501H8.96973C9.37973 8.2501 9.71973 8.59011 9.71973 9.0001C9.71973 9.4101 9.38973 9.7501 8.96973 9.7501Z" fill={`${location.pathname === "/FacilityManagement" ? "white" : "#4F4F4F"}`} />
                                <path d="M22 18.04V19.5C22 20.88 20.88 22 19.5 22H14.97C14.43 22 14 21.57 14 21.03V18.87C15.07 19 16.2 18.69 17.01 18.04C17.69 18.59 18.56 18.92 19.51 18.92C20.44 18.92 21.31 18.59 22 18.04Z" fill={`${location.pathname === "/FacilityManagement" ? "white" : "#4F4F4F"}`} />
                                <path d="M22 15.05V15.06C21.92 16.37 20.85 17.42 19.51 17.42C18.12 17.42 17.01 16.29 17.01 14.92C17.01 16.45 15.6 17.68 14 17.37V12C14 11.36 14.59 10.88 15.22 11.02L17.01 11.42L17.49 11.53L19.53 11.99C20.02 12.09 20.47 12.26 20.86 12.51C20.86 12.52 20.87 12.52 20.87 12.52C20.97 12.59 21.07 12.67 21.16 12.76C21.62 13.22 21.92 13.89 21.99 14.87C21.99 14.93 22 14.99 22 15.05Z" fill={`${location.pathname === "/FacilityManagement" ? "white" : "#4F4F4F"}`} />
                            </svg>
                                Facility Management</NavLink></Link>
                            <Link className='link-tag hover-deshbord' to={"/traking"} onClick={toggleFinancialSubmenu2}  > <div className='side-design' style={{ display: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "white" : "", textDecoration: "none" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 13C3.24 13 1 15.23 1 18C1 20.77 3.24 23 6 23C8.76 23 11 20.76 11 18C11 15.24 8.77 13 6 13ZM3.96 15.96H6C6.38 15.96 6.68 16.27 6.68 16.64C6.68 17.01 6.38 17.32 6 17.32H3.96C3.58 17.32 3.28 17.01 3.28 16.64C3.28 16.27 3.58 15.96 3.96 15.96ZM8.04 20.04H3.96C3.58 20.04 3.28 19.73 3.28 19.36C3.28 18.99 3.59 18.68 3.96 18.68H8.05C8.43 18.68 8.73 18.99 8.73 19.36C8.73 19.73 8.42 20.04 8.04 20.04Z" fill={`${location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "white" : "#4F4F4F"}`} />
                                <path d="M17 3H7C4 3 2 4.5 2 8V11.14C2 11.87 2.75 12.33 3.42 12.04C4.52 11.56 5.77 11.38 7.08 11.59C9.7 12.02 11.84 14.09 12.37 16.69C12.52 17.45 12.54 18.19 12.44 18.9C12.36 19.49 12.84 20.01 13.43 20.01H17C20 20.01 22 18.51 22 15.01V8C22 4.5 20 3 17 3ZM17.47 8.59L14.34 11.09C13.68 11.62 12.84 11.88 12 11.88C11.16 11.88 10.31 11.62 9.66 11.09L6.53 8.59C6.21 8.33 6.16 7.85 6.41 7.53C6.67 7.21 7.14 7.15 7.46 7.41L10.59 9.91C11.35 10.52 12.64 10.52 13.4 9.91L16.53 7.41C16.85 7.15 17.33 7.2 17.58 7.53C17.84 7.85 17.79 8.33 17.47 8.59Z" fill={`${location.pathname === "/traking" || location.pathname === "/RequestTracking" ? "white" : "#4F4F4F"}`} />
                            </svg>
                                Complaint Tracking    {location.pathname === "/traking" || location.pathname === "/RequestTracking" ? <ArrowDropDownIcon /> : ""}</NavLink></Link>

                            {
                                location.pathname === "/traking" || location.pathname === "/RequestTracking" ? <div>
                                    {showFinancialSubmenu4 && (
                                        <Submenu>
                                            <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/traking" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/traking")}> Create Complaint</span></SubmenuItem>
                                            <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/RequestTracking" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/RequestTracking")}>Request Tracking</span></SubmenuItem>

                                        </Submenu>
                                    )}
                                </div> : ""
                            }

                            {/* <Link className='link-tag' to={"/Visitor"} onClick={toggleFinancialSubmenu1} > <div className='side-design' style={{ display: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "white" : "", textDecoration: "none" }}><SiSpringsecurity className='fs-3 mb-1' />  Security Management     {location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? <ArrowDropDownIcon /> : ""}</NavLink></Link> */}

                            <Link className='link-tag hover-deshbord' to={"/Visitor"} onClick={toggleFinancialSubmenu1} > <div className='side-design' style={{ display: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "white" : "", textDecoration: "none" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5398 4.16989L13.0398 2.10989C12.4698 1.89989 11.5398 1.89989 10.9698 2.10989L5.4698 4.16989C4.4098 4.56989 3.5498 5.80989 3.5498 6.93989V15.0399C3.5498 15.8499 4.0798 16.9199 4.7298 17.3999L10.2298 21.5099C11.1998 22.2399 12.7898 22.2399 13.7598 21.5099L19.2598 17.3999C19.9098 16.9099 20.4398 15.8499 20.4398 15.0399V6.93989C20.4498 5.80989 19.5898 4.56989 18.5398 4.16989ZM12.7498 12.8699V15.4999C12.7498 15.9099 12.4098 16.2499 11.9998 16.2499C11.5898 16.2499 11.2498 15.9099 11.2498 15.4999V12.8699C10.2398 12.5499 9.4998 11.6099 9.4998 10.4999C9.4998 9.11989 10.6198 7.99989 11.9998 7.99989C13.3798 7.99989 14.4998 9.11989 14.4998 10.4999C14.4998 11.6199 13.7598 12.5499 12.7498 12.8699Z" fill={`${location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? "white" : "#4F4F4F"}`} />
                            </svg>
                                Security Management     {location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9202 8.18005H11.6902H6.08024C5.12024 8.18005 4.64024 9.34005 5.32024 10.0201L10.5002 15.2001C11.3302 16.0301 12.6802 16.0301 13.5102 15.2001L15.4802 13.2301L18.6902 10.0201C19.3602 9.34005 18.8802 8.18005 17.9202 8.18005Z" fill="white" />
                                </svg>
                                    : ""}</NavLink></Link>


                            {
                                location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? <div>

                                    {showFinancialSubmenu3 && (
                                        <Submenu>
                                            <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/Visitor" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Visitor")}> Visitor Logs</span></SubmenuItem>
                                            <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Securityprotocols" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Securityprotocols")}>Security Protocols</span></SubmenuItem>
                                        </Submenu>
                                    )}
                                </div> : ""
                            }

                            <Link className='link-tag hover-deshbord' to={"/SecurityGuard"}   > <div className='side-design' style={{ display: location.pathname === "/SecurityGuard" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/SecurityGuard" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/SecurityGuard" ? "white" : "", textDecoration: "none" }} > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5002 4.11007L13.5102 2.24007C12.6802 1.93007 11.3202 1.93007 10.4902 2.24007L5.50016 4.11007C4.35016 4.54007 3.41016 5.90007 3.41016 7.12007V14.5501C3.41016 15.7301 4.19016 17.2801 5.14016 17.9901L9.44016 21.2001C10.8502 22.2601 13.1702 22.2601 14.5802 21.2001L18.8802 17.9901C19.8302 17.2801 20.6102 15.7301 20.6102 14.5501V7.12007C20.5902 5.90007 19.6502 4.54007 18.5002 4.11007ZM11.9302 7.03007C13.1102 7.03007 14.0702 7.99007 14.0702 9.17007C14.0702 10.3301 13.1602 11.2601 12.0102 11.3001H11.9902H11.9702C11.9502 11.3001 11.9302 11.3001 11.9102 11.3001C10.7102 11.2601 9.81016 10.3301 9.81016 9.17007C9.80016 7.99007 10.7602 7.03007 11.9302 7.03007ZM14.1902 16.3601C13.5802 16.7601 12.7902 16.9701 12.0002 16.9701C11.2102 16.9701 10.4102 16.7701 9.81016 16.3601C9.24016 15.9801 8.93016 15.4601 8.92016 14.8901C8.92016 14.3301 9.24016 13.7901 9.81016 13.4101C11.0202 12.6101 12.9902 12.6101 14.2002 13.4101C14.7702 13.7901 15.0902 14.3101 15.0902 14.8801C15.0802 15.4401 14.7602 15.9801 14.1902 16.3601Z" fill={`${location.pathname === "/SecurityGuard" ? "white" : "#4F4F4F"}`} />
                            </svg>
                                Security Guard</NavLink></Link>
                            <Link className='link-tag hover-deshbord' to={"/Announcement"} >  <div className='side-design' style={{ display: location.pathname === "/Announcement" ? "block" : "none" }}><SidebarMiniButton /> </div>   <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/Announcement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Announcement" ? "white" : "", textDecoration: "none" }} ><svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7754 9V7H20.7754V9H16.7754ZM17.9754 16L14.7754 13.6L15.9754 12L19.1754 14.4L17.9754 16ZM15.9754 4L14.7754 2.4L17.9754 0L19.1754 1.6L15.9754 4ZM3.77539 15V11H2.77539C2.22539 11 1.75456 10.8042 1.36289 10.4125C0.971224 10.0208 0.775391 9.55 0.775391 9V7C0.775391 6.45 0.971224 5.97917 1.36289 5.5875C1.75456 5.19583 2.22539 5 2.77539 5H6.77539L11.7754 2V14L6.77539 11H5.77539V15H3.77539ZM12.7754 11.35V4.65C13.2254 5.05 13.5879 5.5375 13.8629 6.1125C14.1379 6.6875 14.2754 7.31667 14.2754 8C14.2754 8.68333 14.1379 9.3125 13.8629 9.8875C13.5879 10.4625 13.2254 10.95 12.7754 11.35Z" fill={`${location.pathname === "/Announcement" ? "white" : "#4F4F4F"}`} />
                            </svg>
                                Announcement</NavLink></Link>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p className='mt-4 mb-5 ' style={{ margin: " 10px", padding: "15px", cursor: "pointer", borderTop: "1px solid #F4F4F4", color: "#E74C3C" }} onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7.2 2H9.8C13 2 15 4 15 7.2V11.25H8.75C8.34 11.25 8 11.59 8 12C8 12.41 8.34 12.75 8.75 12.75H15V16.8C15 20 13 22 9.8 22H7.21C4.01 22 2.01 20 2.01 16.8V7.2C2 4 4 2 7.2 2Z" fill="#E74C3C" />
                                <path d="M19.4386 11.2498L17.3686 9.17984C17.2186 9.02984 17.1486 8.83984 17.1486 8.64984C17.1486 8.45984 17.2186 8.25984 17.3686 8.11984C17.6586 7.82984 18.1386 7.82984 18.4286 8.11984L21.7786 11.4698C22.0686 11.7598 22.0686 12.2398 21.7786 12.5298L18.4286 15.8798C18.1386 16.1698 17.6586 16.1698 17.3686 15.8798C17.0786 15.5898 17.0786 15.1098 17.3686 14.8198L19.4386 12.7498H14.9986V11.2498H19.4386Z" fill="#E74C3C" />
                            </svg>
                                Logout</p>
                        </NavLinks>
                    </div>
                    <div className="col-12 col-md-9 ">
                        <div style={{ borderLeft: "2px solid #F6F8FB" }} className="navbar p-4">
                            <div className="app-bar ">
                                <FaBarsStaggered variant="primary" onClick={handleShow} />
                                <Offcanvas show={show} onHide={handleClose}>
                                    <Offcanvas.Header className='fs-3  ' closeButton />
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

                                        <NavLinks className='h-50'>


                                            <Link className='link-tag' to={"/deshbord"}  > <div className='side-design' style={{ display: location.pathname === "/deshbord" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>    <NavLink style={{ background: location.pathname === "/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>
                                            <Link className='link-tag' to={"/resident"} >  <div className='side-design' style={{ display: location.pathname === "/resident" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/resident" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/resident" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'>  <MdAddHomeWork className=' fs-3 mb-1' />Resident Management </NavLink></Link>

                                            <Link className='link-tag' to={"/Financial"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/Financial" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>   <NavLink style={{ background: location.pathname === "/Financial" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Financial" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'><HiMiniCurrencyDollar className=' fs-3 mb-1 ' /> Financial Management</NavLink>  </Link>

                                            {
                                                location.pathname === "/Financial" || location.pathname === "/Icome" || location.pathname === "/Expense" ? <div> {showFinancialSubmenu2 && (
                                                    <Submenu>
                                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Financial" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Financial")} >Note</span></SubmenuItem>
                                                        <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/Icome" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Icome")}> Income</span></SubmenuItem>
                                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Expense" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Expense")}>Expense</span></SubmenuItem>
                                                    </Submenu>
                                                )} </div> : ""
                                            }


                                            <Link className='link-tag' to={"/FacilityManagement"} >  <div className='side-design' style={{ display: location.pathname === "/FacilityManagement" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/FacilityManagement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/FacilityManagement" ? "white" : "", textDecoration: "none" }}><PiBuildingsFill className='fs-3 mb-1' />  Facility Management</NavLink></Link>
                                            <Link className='link-tag' to={"/traking"} onClick={toggleFinancialSubmenu2}  > <div className='side-design' style={{ display: location.pathname === "/traking" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/traking" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/traking" ? "white" : "", textDecoration: "none" }}><MdAttachEmail className='mb-1 fs-3' />   Complaint Tracking    {location.pathname === "/traking" ? <ArrowDropDownIcon /> : ""}</NavLink></Link>
                                            {
                                                location.pathname === "/traking" || location.pathname === "/RequestTracking" ? <div>
                                                    {showFinancialSubmenu4 && (
                                                        <Submenu>
                                                            <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/traking" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/traking")}> Create Complaint</span></SubmenuItem>
                                                            <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/RequestTracking" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/RequestTracking")}>Request Tracking</span></SubmenuItem>

                                                        </Submenu>
                                                    )}
                                                </div> : ""
                                            }

                                            <Link className='link-tag' to={"/Visitor"} onClick={toggleFinancialSubmenu1} > <div className='side-design' style={{ display: location.pathname === "/Visitor" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/Visitor" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Visitor" ? "white" : "", textDecoration: "none" }}><SiSpringsecurity className='fs-3 mb-1' />  Security Management     {location.pathname === "/Visitor" ? <ArrowDropDownIcon /> : ""}</NavLink></Link>


                                            {
                                                location.pathname === "/Visitor" || location.pathname === "/Securityprotocols" ? <div>

                                                    {showFinancialSubmenu3 && (
                                                        <Submenu>
                                                            <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/Visitor" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Visitor")}> Visitor Logs</span></SubmenuItem>
                                                            <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/Securityprotocols" ? "2px solid black" : "2px solid gray" }} onClick={() => navigate("/Securityprotocols")}>Security Protocols</span></SubmenuItem>
                                                        </Submenu>
                                                    )}
                                                </div> : ""
                                            }
                                            <Link className='link-tag' to={"/SecurityGuard"}   > <div className='side-design' style={{ display: location.pathname === "/SecurityGuard" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/SecurityGuard" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/SecurityGuard" ? "white" : "", textDecoration: "none" }} > <GrUserPolice className='fs-3 mb-1 ' /> Security Guard</NavLink></Link>
                                            <Link className='link-tag' to={"/Announcement"} >  <div className='side-design' style={{ display: location.pathname === "/Announcement" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>   <NavLink className=' d-flex gap-3 radious' style={{ background: location.pathname === "/Announcement" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/Announcement" ? "white" : "", textDecoration: "none" }} ><TfiAnnouncement className='fs-3 mb-1' /> Announcement</NavLink></Link>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                        </NavLinks>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                            <div className="search ms-4">
                                {
                                    location.pathname === "/deshbord" ? <div className="chet-search">
                                        <input onChange={(e) => setserch(e.target.value)} type="search" className=' search-chet' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search Here &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' />
                                        <CiSearch className='fs-3 fw-bolde child-search1 ' style={{ display: serch === "" ? "block" : "none" }} />
                                    </div> : <div> <span onClick={() => navigate("/deshbord")} style={{ color: "#A7A7A7", cursor: "pointer" }}>Home</span>  <span className='ms-2  mb-2'><FaGreaterThan className='' /></span> <span style={{ color: "#5678E9" }} className='ms-2'>{location.pathname.split("/")}</span></div>
                                }


                            </div>
                            <UserInfo>
                                <Search_Icon className='search-icon'>
                                    <CiSearch className='fs-2' />
                                </Search_Icon>
                                <Notifiction >
                                    <div className='notification-bell'>
                                        <svg style={{ cursor: "pointer" }} onClick={toggleDropdown} className='fs-1 mx-2' width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.1902 14.06L19.0602 12.18C18.8102 11.77 18.5902 10.98 18.5902 10.5V8.62999C18.5902 4.99999 15.6402 2.04999 12.0202 2.04999C8.3902 2.05999 5.4402 4.99999 5.4402 8.62999V10.49C5.4402 10.97 5.2202 11.76 4.9802 12.17L3.8502 14.05C3.4202 14.78 3.3202 15.61 3.5902 16.33C3.8602 17.06 4.4702 17.64 5.2702 17.9C6.3502 18.26 7.4402 18.52 8.5502 18.71C8.6602 18.73 8.7702 18.74 8.8802 18.76C9.0202 18.78 9.1702 18.8 9.3202 18.82C9.5802 18.86 9.8402 18.89 10.1102 18.91C10.7402 18.97 11.3802 19 12.0202 19C12.6502 19 13.2802 18.97 13.9002 18.91C14.1302 18.89 14.3602 18.87 14.5802 18.84C14.7602 18.82 14.9402 18.8 15.1202 18.77C15.2302 18.76 15.3402 18.74 15.4502 18.72C16.5702 18.54 17.6802 18.26 18.7602 17.9C19.5302 17.64 20.1202 17.06 20.4002 16.32C20.6802 15.57 20.6002 14.75 20.1902 14.06ZM12.7502 9.99999C12.7502 10.42 12.4102 10.76 11.9902 10.76C11.5702 10.76 11.2302 10.42 11.2302 9.99999V6.89999C11.2302 6.47999 11.5702 6.13999 11.9902 6.13999C12.4102 6.13999 12.7502 6.47999 12.7502 6.89999V9.99999Z" fill="#292D32" />
                                            <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#292D32" />
                                        </svg>

                                    </div>
                                    {/* <MdNotificationImportant style={{ cursor: "pointer" }} onClick={toggleDropdown} className='fs-2 mx-2' /> */}

                                    {
                                        isOpen && (
                                            <div className="notifications-container">
                                                <div></div>
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
                                    } { isOpen && (
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
                                                                        <h3>{notification.title}</h3>
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
                                <UserAvatar   onClick={() => navigate("/profile")}  className="" src={profile?.image || "src/assets/Avatar.png"}  alt={profile?.name || "User"}  style={{ cursor: "pointer" }} />
                                <UserName className="search">
                                    {profile?.firstName || "Unknown User"}  {profile?.lastName || "Unknown User"}
                                    <br />
                                    <span className="mx-1 text-color">{profile?.role || "Admin"}</span>
                                </UserName>
                            </UserInfo>
                        </div>
                        <div className="component-layout ">
                            <br />
                            <div>
                                <div className="container-fluid">
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
