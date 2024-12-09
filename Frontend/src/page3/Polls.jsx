import React, { useState } from 'react';
import CardVoter from "../card/Card";
import { Modal, Form, Button } from 'react-bootstrap';
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

    const handlePollChange = (e) => {
        const pollType = e.target.value;
        setSelectedPoll(pollType);

      
        if (pollType === "singlechoice") {
            setOptions([{ id: 1, text: "" }, { id: 2, text: "" }, { id: 3, text: "" }]);
        } else {
            setOptions([{ id: 1, text: "" }, { id: 2, text: "" }]); 
        }
    };

    const handleQuestionChange = (e) => setQuestion(e.target.value);

    const handleOptionChange = (id, text) => {
        setOptions((prevOptions) =>
            prevOptions.map((option) => (option.id === id ? { ...option, text } : option))
        );
    };

    const handleCreatePoll = () => {
        if (!question || options.some((option) => !option.text)) {
            alert("Please fill out the question and all options.");
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
        // Add more poll data if needed
    ];

    return (
        <div>
            <div className="polls-box">
                <div className="row mt-3 d-flex justify-content-between align-items-center p-1">
                    <h2 className="col-12 col-md-3 mt-4">Polls</h2>
                    <button className="col-12 col-md-2 l-btn text-white mx-2" onClick={handleShow}>
                        Create Poll
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

            {/* Modal for Creating Poll */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Poll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="pollType" style={{ width: "100%" }}>
                            <Form.Label>Poll Type <span className='text-danger'>*</span></Form.Label>
                            <Form.Select
                                value={selectedPoll}
                                className="polls-type"
                                onChange={handlePollChange}
                                style={{ width: "100%" }}
                            >
                                <option value="">Select Poll Type</option>
                                <option value="multichoice">Multichoice</option>
                                <option value="singlechoice">Ranking Polls</option>
                                <option value="singlechoice">Rating polls</option>
                                <option value="singlechoice">Numeric Polls</option>
                                <option value="singlechoice">Text Polls</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="pollQuestion">
                            <Form.Label>Question  <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your poll question"
                                value={question}
                                onChange={handleQuestionChange}
                            />
                        </Form.Group>

                        <Form.Label>Options <span className='text-danger'>*</span></Form.Label>
                        {options.map((option) => (
                            <div key={option.id} className="d-flex align-items-center mb-2">
                                <Form.Control
                                    type="text"
                                    placeholder={`Option ${option.id}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ width: "45%" }} className="p-3" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        style={{
                            width: "45%",
                            background: "linear-gradient(90deg, #fe512e 0%, #f09619 100%)",
                            border: "none",
                            color: "white",
                        }}
                        className="p-3"
                        onClick={handleCreatePoll}
                    >
                        Create Poll
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Polls;
