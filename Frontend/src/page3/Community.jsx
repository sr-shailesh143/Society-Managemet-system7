import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function Community() {
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
            <div className="row ">

            <div className="input-chet col-12 col-md-11 mt-3 ">
            <div className="chet-search mt-1 ms-2">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className=' search-chet' placeholder='        Search Here' />
            <CiSearch className='fs-3 fw-bolde child-search1 ' style={{ display: Search === "" ? "block" : "none" }} />
          </div>
            </div>
            <div className=" col-12 col-md-1 mt-3">
            <div className="voice">

            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
