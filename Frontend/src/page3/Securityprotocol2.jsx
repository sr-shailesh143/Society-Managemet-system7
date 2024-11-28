import React, { useState } from 'react';
import '../index.css';

export default function Securityprotocol2() {

 
    const Security = [
        {
            Title: "Cody Fisher",
            description: "Event and recreational activities.",
            time: "2:45 PM",
            date: "11/02/2024",
            eventName: "Holi Festival",
        },
        {
            Title: "Esther Howard",
            description: "Securing critical government systems.",
            time: "1:45 AM",
            date: "12/02/2024",
            eventName: "Ganesh Chaturthi",
        },
        {
            Title: "Brooklyn Simmons",
            description: "Implementing surveillance in public spaces.",
            time: "2:00 PM",
            date: "13/02/2024",
            eventName: "Navratri Festival",
        },
        {
            Title: "Jenny Wilson",
            description: "Event and recreational activities.",
            time: "4:00 AM",
            date: "14/02/2024",
            eventName: "Holi Festival",
        },
        {
            Title: "Guy Hawkins",
            description: "Expenses will way sense for you.",
            time: "5:30 PM",
            date: "15/02/2024",
            eventName: "Ganesh Chaturthi",
        },
    ];

    return (
        <div className="container-fluid">
            <div className="complaints-section"style={{borderRadius:"15px"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-weight-bold" style={{ fontWeight: "bold" }}>Security Protocols</h4>
                </div>

                <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table custom-table">
                        <thead className="table-light">
                            <tr>
                                <th style={{ background: "#E5ECFD" }}>Title</th>
                                <th style={{ background: "#E5ECFD" }}>Description</th>
                                <th style={{ background: "#E5ECFD" }}> Date</th>
                                <th style={{ background: "#E5ECFD" }}> Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Security.map((Security, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {Security.Title}
                                        </div>
                                    </td>
                                    <td>{Security.description}</td>
                                    <td>{Security.date}</td>
                                    <td>
                                        <span className="time-badge">{Security.time}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
