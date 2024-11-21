import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MenuItem from '@mui/material/MenuItem';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Webcam from "react-webcam";
import { Table, Button, Modal, Form } from 'react-bootstrap';

export default function Community() {
  const [camera, setcamera] = useState(false)
  const handleCamara = () => {
    setcamera((prevState) => !prevState);
  };
  const [open, setopen] = useState(false)
  const handleClick = () => {
    setopen((prevState) => !prevState);
  };
  const [Search, setSearch] = useState("")
  const [chats] = useState([
    { id: 1, name: "Michael John", message: "Hi, John! how are you doing?", time: "10:27", status: "read" },
    { id: 2, name: "Elizabeth Sarah", message: "Thank you for your order!", time: "9:20", status: "read" },
    { id: 3, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00", status: "unread", },
    { id: 4, name: "Arlene McCoy", message: "Typing...", time: "9:20", status: "typing" },
    { id: 5, name: "Esther Howard", message: "Hello, Esther", time: "10:27", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", status: "read" },
  ]);


  return (
    <div className='chetbox'>
      <div className="row">
        <div className="col-12 col-md-3 main-chet-list">
          <h4 className='Chat-title m-3'>
            Chat
          </h4>


          <div className="chet-search">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className=' search-chet' placeholder='        Search Here' />
            <CiSearch className='fs-3 fw-bolde child-search1 ' style={{ display: Search === "" ? "block" : "none" }} />
          </div>
          <div className="chat-list mt-3">
            {chats.map((chat) => (
              <div className={`chat-item `} >
                <div className="avatar">
                  <img src={`/src/assets/Avatar.png`} alt={chat.name} />
                </div>
                <div className="chat-details">
                  <div className="chat-header">
                    <h5>{chat.name}</h5>


                    <span className="time">{chat.time}
                      <br />
                      <span className=''><DoneAllIcon color="primary" /> </span>
                    </span>
                  </div>
                  <div className="chat-message">
                    {chat.status === "typing" ? <span className="typing">Typing...</span> : chat.message}
                  </div>
                </div>
                {/* {chat.status === "unread" && <div className="badge">{chat.unreadCount}</div>} */}
                {/* <span className=''><DoneAllIcon/></span> */}
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-md-7 side-chet ">
          <nav className='nav-bar-chet  '>
            <div className=" ms-2 d-flex justify-content-between ">
              <div className="chetprofile d-flex m-3">
                <div className="profile-img">
                  <img src={`/src/assets/Avatar.png`} />
                </div>
                <div className="chet-name ms-4">
                  <p>Arlene McCoy (A/1001)</p>
                  <p className='chat-message'>9:00 Pm </p>
                </div>
              </div>
              <div className="chet-icon m-3 d-flex gap-2">
                <div className="video">
                  <VideocamIcon className='fs-2' />
                </div>
                <div className="video">
                  <PhoneIcon className='fs-2' />
                </div>
                <div className="video" onClick={handleClick}>
                  <MoreVertIcon className='fs-2'

                  />
                  <div
                    className='basic-menu bg-white radious'
                    style={{ display: open ? "block" : "none" }}
                    open={open}


                  >
                    <MenuItem >Copy</MenuItem>
                    <MenuItem >Forward</MenuItem>

                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="main-chet">
            {/* <div className="chet-user">

            </div> */}



          </div>
          <div className="chet-input  ">
            <div className="row  ">
              <div className="col-12 col-md-11 ">
                <div className="row m-4 input-chet-icon w-100 gap-4 position-sticky ">
                  <div className="col-12 col-md-2 ">
                    <SentimentSatisfiedAltIcon className='fs-2' style={{ cursor: "pointer" }} />
                  </div>
                  <div className="col-12 col-md-8">
                    <input type="search" className='input-chet-main ' style={{ width: "100%" }} />
                  </div>

                  <div className="col-12 col-md-1 d-flex gap-3 position-sticky ">
                    <label className="photo-upload mt-2 ">

                      <input type="file" accept="image/*" />
                      <AttachmentIcon className='position-sticky fs-2' style={{ cursor: "pointer" }} />
                    </label>
                    <label className="photo-upload mt-2 " onClick={handleCamara}>
                      <CameraAltIcon className='position-sticky fs-2' style={{ cursor: "pointer" }} />

                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-1 mt-2 ">
                <div className="voice  m-3 mx-2">
                  <KeyboardVoiceIcon className='fs-2' />
                </div>
              </div>

            </div>
          </div>
          <Modal className='bg-none' show={camera} onHide={()=>setcamera(false)}>
            <Modal.Body>
            <Webcam
             height={"100%"}
             screenshotFormat="image/jpeg"
             width={"100%"} />
            </Modal.Body>

          </Modal>
        </div>
      </div>
    </div>
  )
}
