import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from 'react-icons/ci';
export default function CommunitiesDiscussion() {


  const [selectedChat, setSelectedChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });

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
    { votes: 0, answers: 1, views: 20, title: 'What is the capital of France?', content: 'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!' },
    { votes: 0, answers: 1, views: 20, title: 'What is the capital of France?', content: 'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!' },
  ]);

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
  const [Search, setSearch] = useState("")
  return (
    <div className="chetbox" style={{ height: '904px' }}>
      <div className="row">
        <div className="col-12 col-md-3 main-chet-list" style={{ height: '904px' }}>
          <h4 className="Chat-title m-3">Chat</h4>
          <div className="chet-search">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className=' search-chet' placeholder='        Search Here' />
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

        <div className="col-12 col-md-7 side-chet" style={{ height: '904px' }}>
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

          {/* Questions Section or Messages */}
          {showQuestions ? (
            <div className="question-form-container d-flex flex-column justify-content-center align-items-center">
              <div
                className="new-box"
                style={{
                  backgroundColor: '#5678E91A',
                  marginBottom: '-4px',
                  borderRadius: '8px',
                  width: '100%',
                  maxWidth: '806px',
                  border: '4px solid #5678E9',
                }}
              >
                <h5 className="text-start">Writing a good question</h5>
                <p className="text-start">
                  You're ready to <span className="text-primary">ask</span> a <span className="text-primary">programming-related question</span> and this form will help guide you through the process.
                </p>
                <p className="text-start">
                  Looking to ask a non-programming question? See <span className="text-primary">the topics here</span> to find a relevant site.
                </p>

                <h6>Steps</h6>
                <ul>
                  <li>Summarize your problem in a one-line title.</li>
                  <li>Describe your problem in more detail.</li>
                  <li>Describe what you tried and what you expected to happen.</li>
                  <li>Add "tags" which help surface your question to members of the community.</li>
                  <li>Review your question and post it to the site.</li>
                </ul>
              </div>

              {/* Question Form */}
              <div
                className="question-form"
                style={{
                  width: '130%',
                  height: '229px',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: '1px solid #D3D3D3',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginLeft: '30%',
                }}
              >
                <p>Title</p>
                <p>Be specific and imagine you're asking a question to another person.</p>
                <textarea
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  className="form-control mb-2"
                />
                <button
                  onClick={handleAddQuestion}
                  className="btn btn-success w-10"
                  style={{
                    background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)',
                    border: 'none',
                    color: 'white',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="messages-section mt-3">
              {questions.map((question, index) => (
                <div key={index} className="message-block">
                  <div className="message-header">
                    <div className="message-icons">
                      <div className="vote-section">
                        <span className="votes text-success">{question.votes} votes</span>
                      </div>
                    </div>
                    <h5 className="message-question">{question.title}</h5>
                    <span className="views" style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', background: 'white', padding: '5px', borderRadius: '30px', textAlign: 'center' }}>
                      <i className="eye-icon" style={{ marginRight: '5px', color: '#4F4F4F' }}>
                        <FaEye />
                      </i>
                      {question.views}
                    </span>
                  </div>
                  <div className="message-footer" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                    <div className="answer-section" style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="answers text-primary" style={{ fontSize: '12px', marginRight: '30px' }}>
                        {question.answers} answers
                      </span>
                      <span className="message-text" style={{ fontSize: '14px', flexShrink: 0 }}>
                        {question.content}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
