import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from 'react-icons/ci';
import { Link } from "react-router-dom";

export default function Question() {

  const [selectedChat, setSelectedChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });

  const [vote, setVote] = useState(0); // Adding state to track the vote count

  const [chats] = useState([
    { id: 1, name: 'Michael John', message: 'Hi, John! How are you doing?', time: '10:27', status: 'read' },
    { id: 2, name: 'Elizabeth Sarah', message: 'Thank you for your order!', time: '9:20', status: 'read' },
    { id: 3, name: 'Jenny Wilson', message: 'Hello, Jenny', time: '7:00', status: 'unread' },
    { id: 4, name: 'Arlene McCoy', message: 'Typing...', time: '9:20', status: 'typing' },
    { id: 5, name: 'Esther Howard', message: 'Hello, Esther', time: '10:27', status: 'read' },
    { id: 6, name: 'Community', message: 'Hello, Esther', time: '10:27', status: 'read' },
  ]);

  const [questions, setQuestions] = useState([
    { votes: 0, answers: 1, views: 20, title: 'What is the capital of France?', content: 'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!' },
    // Additional questions
  ]);

  const increaseVote = () => {
    setVote(vote + 1); // Increase the vote count by 1
  };

  const decreaseVote = () => {
    setVote(vote - 1); // Decrease the vote count by 1
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleQuestionsSection = () => {
    setShowQuestions(!showQuestions);
  };

  const handleAddQuestion = () => {
    if (newQuestion.title && newQuestion.content) {
      const newQuestionData = { votes: 0, answers: 0, views: 0, title: newQuestion.title, content: newQuestion.content };
      setQuestions([...questions, newQuestionData]);
      setNewQuestion({ title: '', content: '' });
      setShowQuestions(false);
    }
  };

  const titles = [
    'How to improve React performance?',
    'What is the best JavaScript framework?',
    'How to handle state in React?',
    'What are the latest trends in web development?',
    'What is the best way to manage dependencies in a React app?',
    'How to create reusable components in React?',
    'What is React Context and when should you use it?'
  ];

  const getRandomTitle = () => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
  };

  useEffect(() => {
    setNewQuestion({ ...newQuestion, title: getRandomTitle() });
  }, []);

  const [Search, setSearch] = useState("");
  return (
    <div className="chetbox" style={{ height: '904px' }}>
      <div className="row">
        <div className="col-12 col-md-3 main-chet-list" style={{ height: '904px' }}>
          <h4 className="Chat-title m-3">Chat</h4>
          <div className="chet-search">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className=' search-chet' placeholder='Search Here' />
            <CiSearch className='fs-3 fw-bolde child-search1 ' style={{ display: Search === "" ? "block" : "none" }} />
          </div>
          <div className="chat-list mt-3">
            {chats.map((chat) => (
              <div key={chat.id} className="chat-item" onClick={() => setSelectedChat(chat)}>
                <div className="avatar">
                  <img src={`/src/assets/Avatar.png`} alt={chat.name} />
                </div>
                <div className="chat-details">
                  <div className="chat-header">
                    <h5>{chat.name}</h5>
                    <span className="time">
                      {chat.time}
                      <br />
                      <span>
                        <DoneAllIcon color="primary" />
                      </span>
                    </span>
                  </div>
                  <div className="chat-message">
                    {chat.status === 'typing' ? (
                      <span className="typing">Typing...</span>
                    ) : (
                      chat.message
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-md-7 side-chet " style={{ height: '904px' }}>
          <nav className="nav-bar-chet">
            <div className="ms-2 d-flex justify-content-between">
              <div className="chetprofile d-flex m-3">
                <div className="profile-img">
                  <img src={`/src/assets/Avatar.png`} alt="Avatar" />
                </div>
                <div className="chet-name ms-4">
                  <p>{selectedChat ? selectedChat.name : 'Select a chat'}</p>
                  <p className="chat-message">{selectedChat ? '9:00 PM' : ''}</p>
                </div>
              </div>
              <div className="chet-icon m-3 d-flex gap-2">
                <button className="btn d-flex align-items-center btn-8" onClick={toggleQuestionsSection}>
                  Ask Question
                </button>
                <div className="video" onClick={handleClick}>
                  <MoreVertIcon className="fs-2" />
                  <div className="basic-menu bg-white radious" style={{ display: open ? 'block' : 'none' }} open={open}>
                    <MenuItem>Copy</MenuItem>
                    <MenuItem>Forward</MenuItem>
                  </div>
                </div>
              </div>
            </div>
          </nav>

        
            <div className="question-form-container d-flex flex-column justify-content-center align-items-center ">
      <div className="d-flex flex-column align-items-center p-3" style={{ marginRight: "800px", marginBottom: "-180px" }}>
     
        <button
          className="btn btn-outline-secondary btn-sm rounded-squeare bg-white"
          onClick={increaseVote}
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="bi bi-caret-up text-dark" style={{ fontSize: "20px" }}></i> {/* Bootstrap Icon */}
        </button>

       
        <span
          id="voteCount"
          className="my-2 fw-bold "
          style={{ fontSize: "1.5rem", color: "#FE512E" }}
        >
          {vote}
        </span>


        <button
          className="btn btn-outline-secondary btn-sm rounded-squeare bg-white"
          onClick={decreaseVote}
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="bi bi-caret-down" style={{ color: "black", fontSize: "20px" }}></i> {/* Bootstrap Icon */}
        </button>
      </div>
      <div
        className="new-box"
        style={{
          backgroundColor: '#5678E90D',
          marginBottom: '-4px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '906px',
          marginLeft: "200px",
         
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
    
          <h5 className="text-start" style={{ marginRight: '10px' }}>
            What is the capital of France?
          </h5>

       
          <span
            className="views text-end"
            style={{
              fontSize: '12px',
              color: '#888',
              display: 'inline-flex', 
              alignItems: 'center',
              background: 'white',
              padding: '5px',
              borderRadius: '30px',
              textAlign: 'center',
            }}
          >
            <i className="eye-icon" style={{ marginRight: '5px', color: '#4F4F4F' }}>
              <FaEye />
            </i>
            20
          </span>
        </div>
        <p className="text-start">
          Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.
        </p>
        <hr style={{ color: "#F6F8FB", border: "2px solid" }} />

        <h6 style={{ color: "#5678E9" }}>Answers</h6>
        <ul>
          <li>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.</li>
          <li>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.</li>
          <li>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.</li>
        </ul>
      </div>

      <p style={{ marginLeft: "-85%", marginBottom: "-10px" }}>Your Answer</p>
      <div
        className="question-form "
        style={{
          width: '130%',
          height: '129px',
          backgroundColor: 'white',
          boxShadow: 'none',
          border: '1px solid #D3D3D3',
          alignContent: 'center',
          justifyContent: 'center',
          marginLeft: '30%',
        }}
      >
        <textarea
          placeholder="Type Here"
          value={newQuestion.content}
          onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
          className="form-control mb-2"
          style={{ border: "none", height: "100px" }}
        />
      </div>
      <button
        onClick={handleAddQuestion}
        style={{
          background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
          border: 'none',
          color: 'white',
          textAlign: 'right',
          float: 'right',
          marginRight: '-140%', 
        }}
      >
        Post Your Answer
      </button>
    </div>
    
        </div>
      </div>
    </div>
  );
}
