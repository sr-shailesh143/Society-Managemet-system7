import React, { useState } from 'react';
import CardVoter from "../card/Card"
import { Modal } from 'react-bootstrap';


const Polls = () => {
    const [show, setshow] = useState(false);
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
            id: 2,
            name: "John Doe",
            role: "Product Polls",
            question: "Adopt AI in Marketing Strategies?",
            options: [
                { id: "yes", text: "Yes", votes: 95 },
                { id: "no", text: "No", votes: 21 },
            ],
            timestamp: "01/08/2024, 09:30 AM",
        },
        {
            id: 3,
            name: "Jane Smith",
            role: "Survey Polls",
            question: "Is remote work here to stay?",
            options: [
                { id: "yes", text: "Yes", votes: 102 },
                { id: "no", text: "No", votes: 37 },
            ],
            timestamp: "01/09/2024, 02:00 PM",
        },
        {
            id: 4,
            name: "Emily Brown",
            role: "Opinion Polls",
            question: "Should governments adopt blockchain?",
            options: [
                { id: "yes", text: "Yes", votes: 84 },
                { id: "no", text: "No", votes: 50 },
            ],
            timestamp: "01/10/2024, 11:15 AM",
        },
    ];

    return (
        <div>
            <div className="d-flex   ">
                <div onClick={() => naviget("/PersonalDetail")} style={{ background: location.pathname === "/polls" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/polls" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                    <p className='polls-text'>Own Poll</p>
                </div>
                <div onClick={() => naviget("/RecidencTarent")} style={{ background: location.pathname === "/RecidencTarent" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/RecidencTarent" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                    <p className='polls-text' >New Poll</p>
                </div>
                <div onClick={() => naviget("/RecidencTarent")} style={{ background: location.pathname === "/RecidencTarent" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/RecidencTarent" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                    <p className='polls-text'>Previous Poll</p>
                </div>
            </div>
            <div className="polls-box">
                <div className="row mt-3 d-flex justify-content-between align-items-center p-1   ">
                    <h2 className=' col-12 col-md-3 mt-4' style={{ textWrap: "wrap" }}>Polls</h2>
                    <button className=' col-12 col-md-2 l-btn text-white mx-2  ' onClick={() => setshow(true)} >
                        Create Polls
                    </button>
                </div>
                <div className="row  ">
                    {pollData.map((poll) => (
                        <div className="col-lg-3 col-md-6 col-sm-12" key={poll.id}>
                            <CardVoter poll={poll} />
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>
                    Create Polls
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Polls;
