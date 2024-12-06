import React, { useState } from 'react';
import CardVoter from "../card/Card";
import { Modal, Form } from 'react-bootstrap';
import { LuCircle } from "react-icons/lu";
const Polls = () => {
    const [show, setShow] = useState(false);
    const [selectedPoll, setSelectedPoll] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([{ id: 1, text: "" }, { id: 2, text: "" }]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSelectedPoll("");
        setQuestion("");
        setOptions([{ id: 1, text: "" }, { id: 2, text: "" }]);
    };

    const handlePollChange = (e) => setSelectedPoll(e.target.value);
    const handleQuestionChange = (e) => setQuestion(e.target.value);

    const handleOptionChange = (id, text) => {
        setOptions((prevOptions) =>
            prevOptions.map((option) => (option.id === id ? { ...option, text } : option))
        );
    };

    const handleAddOption = () => {
        setOptions((prevOptions) => [
            ...prevOptions,
            { id: prevOptions.length + 1, text: "" },
        ]);
    };

    const handleRemoveOption = (id) => {
        setOptions((prevOptions) => prevOptions.filter((option) => option.id !== id));
    };

    const handleCreatePoll = () => {
        if (!question || options.some((option) => !option.text)) {
            alert("Please fill out the question ");
            return;
        }
        console.log("Poll Created:", { selectedPoll, question, options });
        handleClose();
    };

    const pollData = [
        {
            id: 1,
            name: "Arlene McCoy",
            role: "Multichoice Polls",
            question: "Solid Deal With Toyota - Azure + AWS Amplify?",
            options: [
                { id: "yes", text: "Yes", votes: 73 },
                { id: "no", text: "No", votes: 43 },
            ],
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            id: 1,
            name: "Arlene McCoy",
            role: "Multichoice Polls",
            question: "Solid Deal With Toyota - Azure + AWS Amplify?",
            options: [
                { id: "yes", text: "Yes", votes: 73 },
                { id: "no", text: "No", votes: 43 },
            ],
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            id: 1,
            name: "Arlene McCoy",
            role: "Multichoice Polls",
            question: "Solid Deal With Toyota - Azure + AWS Amplify?",
            options: [
                { id: "yes", text: "Yes", votes: 73 },
                { id: "no", text: "No", votes: 43 },
            ],
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            id: 1,
            name: "Arlene McCoy",
            role: "Multichoice Polls",
            question: "Solid Deal With Toyota - Azure + AWS Amplify?",
            options: [
                { id: "yes", text: "Yes", votes: 73 },
                { id: "no", text: "No", votes: 43 },
            ],
            timestamp: "01/07/2024, 10:00 AM",
        },



    ];

    return (
        <div>
            <div className="polls-box">
                <div className="row mt-3 d-flex justify-content-between align-items-center p-1">
                    <h2 className="col-12 col-md-3 mt-4">Polls</h2>
                    <button className="col-12 col-md-2 l-btn text-white mx-2" onClick={handleShow}>
                        Create Polls
                    </button>
                </div>
                <div className="row">
                    {pollData.map((poll) => (
                        <div className="col-lg-3 col-md-6 col-sm-12" key={poll.id}>
                            <CardVoter poll={poll} />
                        </div>
                    ))}
                </div>
            </div>


            <Modal show={show} onHide={handleClose} centered>
                
                <div className="modal-header"closeButton>
                 <h5>Create Polls</h5>
                </div>
                <div className="modal-body">
                    <form>
                    <div  controlId="pollType">
                        
                          
                            <label htmlFor="">Polls</label>
                            <select className="form-control" onChange={handlePollChange} as="select" value={selectedPoll}>
                       
                                <option value="" disabled >


                                    👆🏼 Select Polls
                                </option>
                                <option value="multichoice" style={{ color: "grey" }}>🔘 Multichoice polls</option>
                                <option value="ranking" style={{ color: "grey" }}>⚪ Ranking polls</option>
                                <option value="rating" style={{ color: "grey" }}>⚪ Rating polls</option>
                                <option value="numeric" style={{ color: "grey" }}>⚪ Numeric polls</option>
                                <option value="text" style={{ color: "grey" }}>⚪ Text polls</option>
                            </select>
                        </div>



                        {selectedPoll && (
                            <>
                             <div className="form-group mt-3" controlId="pollQuestion">
                             <label htmlFor="">Question</label>
                             <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ask a question"
                                    value={question}
                                    onChange={handleQuestionChange}
                                />
                                   
                              </div>


                                {options.map((option, index) => (
                                    <div key={option.id} className="d-flex align-items-center my-2">
                                         <input
                                        type="text"
                                        className="form-control"
                                        placeholder={`Option ${index + 1}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                    />
                                       
                                        {options.length > 2 && (
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => handleRemoveOption(option.id)}
                                                style={{ backgroundColor: "#F6F8FB" }}
                                            >
                                                <span >

                                                    <svg className='cursor' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#E74C3C" />
                                                        <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#E74C3C" />
                                                    </svg>
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button className="btn  mt-2" onClick={handleAddOption} type="button" style={{ border: "none", color: "#fe512e", alignItems: "center", justifyContent: "center" }} >
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', borderRadius: "10px", alignItems: "center", justifyContent: "center" }}
                                        className='svg-plus p-1 m-1'
                                    >
                                        <path
                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM18 12.75H12.75V18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H11.25V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                                            fill="white"
                                        />
                                    </svg>    Add an option
                                </button>
                            </>
                        )}
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={handleClose} style={{ alignItems: "center" }}>
                        Cancel
                    </button>
                    <button className="btn " onClick={handleCreatePoll} disabled={!selectedPoll || !question || options.some(option => !option.text)} style={{ background: 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)', border: "none", color: "white", width: "45%", alignItems: "center" }}>
                        Create
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default Polls;
