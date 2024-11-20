import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

export default function EventParticipation() {
    const location = useLocation();
    const naviget = useNavigate();

    // Sample events data
    const eventsData = [
        {
            name: "Cody Fisher",
            description: "Event and recreational activities.",
            time: "2:45 PM",
            date: "11/02/2024",
            eventName: "Holi Festival",
        },
        {
            name: "Esther Howard",
            description: "Securing critical government systems.",
            time: "1:45 AM",
            date: "12/02/2024",
            eventName: "Ganesh Chaturthi",
        },
        {
            name: "Brooklyn Simmons",
            description: "Implementing surveillance in public spaces.",
            time: "2:00 PM",
            date: "13/02/2024",
            eventName: "Holi Festival",
        },
        {
            name: "Jenny Wilson",
            description: "Event and recreational activities.",
            time: "4:00 AM",
            date: "14/02/2024",
            eventName: "Ganesh Chaturthi",
        },
        {
            name: "Guy Hawkins",
            description: "Expenses will way sense for you.",
            time: "5:30 PM",
            date: "15/02/2024",
            eventName: "Ganesh Chaturthi",
        },
    ];

    // State for managing modal visibility
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container-fluid">
            {/* Navigation */}
            <div className='row'>
                <div className="d-flex ">
                    <div onClick={() => naviget("/EventParticipation")}
                        style={{ background: location.pathname === "/EventParticipation" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/EventParticipation" ? "white" : "black" }}
                        className='b-btn d-flex justify-content-center'>
                        <p>Event Participation</p>
                    </div>
                    <div onClick={() => naviget("/Activity")}
                        style={{ background: location.pathname === "/Activity" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/Activity" ? "white" : "black" }}
                        className='b-btn d-flex justify-content-center'>
                        <p>Activity Participation</p>
                    </div>
                </div>
            </div>

            {/* Event List */}
            <div className="complaints-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-weight-bold" style={{ fontWeight: "bold" }}>Event Participation</h4>
                </div>

                {/* Add table-responsive class here */}
                <div className="table-responsive">
                    <table className="table table-hover custom-table">
                        <thead >
                            <tr>
                                <th style={{ background: "#E5ECFD" }} >Participant Name</th>
                                <th style={{ background: "#E5ECFD" }}>Description</th>
                                <th style={{ background: "#E5ECFD" }}>Event Time</th>
                                <th style={{ background: "#E5ECFD" }}>Event Date</th>
                                <th style={{ background: "#E5ECFD" }}>Event Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventsData.map((event, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {/* Profile Image */}
                                            <img
                                                src={`https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png`} // Replace with actual image URL
                                                alt="Profile"
                                                className="rounded-circle"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    marginRight: "10px", // Space between image and text
                                                }}
                                            />
                                            {/* Participant Name */}
                                            {event.name}
                                        </div>
                                    </td>
                                    <td>{event.description}</td>
                                    <td>
                                        <span className="time-badge">{event.time}</span>
                                    </td>
                                    <td>{event.date}</td>
                                    <td>{event.eventName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
