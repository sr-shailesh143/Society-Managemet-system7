import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnnouncements } from '../apiservices/announcementservice'; 

import '../index.css';

export default function Activity() {
    const location = useLocation();
    const navigate = useNavigate();

    const [eventsData, setEventsData] = useState([]);  
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');  

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            setError(''); 

            try {
                const response = await getAnnouncements(); 
                console.log('API Response:', response); 

             
                if (response && response.data && Array.isArray(response.data.records)) {
                    setEventsData(response.data.records); 
                } else {
                    setError('No announcements found or data is in an unexpected format');
                }
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setError('Failed to load announcements');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements(); 
    }, []); 

   
    const formatLocalDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "Invalid Time"; 
        const [hours, minutes] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
      };
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <div
                        onClick={() => navigate("/EventParticipation")}
                        style={{
                            background: location.pathname === "/EventParticipation" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff",
                            color: location.pathname === "/EventParticipation" ? "white" : "black"
                        }}
                        className="b-btn d-flex justify-content-center"
                    >
                        <p>Event Participation</p>
                    </div>
                    <div
                        onClick={() => navigate("/Activity")}
                        style={{
                            background: location.pathname === "/Activity" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff",
                            color: location.pathname === "/Activity" ? "white" : "black"
                        }}
                        className="b-btn d-flex justify-content-center"
                    >
                        <p>Activity Participation</p>
                    </div>
                </div>
            </div>

            <div className="complaints-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-weight-bold" style={{ fontWeight: "bold" }}>Event Participation</h4>
                </div>

               
                {loading && <p>Loading...</p>}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-hover custom-table">
                        <thead className="table-light">
                            <tr>
                                <th style={{ background: "#E5ECFD" }}>Participant Name</th>
                                <th style={{ background: "#E5ECFD" }}>Description</th>
                                <th style={{ background: "#E5ECFD" }}>Activity Time</th>
                                <th style={{ background: "#E5ECFD" }}>Activity Date</th>
                                <th style={{ background: "#E5ECFD" }}>Activity Name</th>
                            </tr>
                        </thead>
                        <tbody>
                  
                            {eventsData.length > 0 ? (
                                eventsData.map((event, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={`https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png`}
                                                    alt="Profile"
                                                    className="rounded-circle"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                Name 
                                            </div>
                                        </td>
                                        <td>{event.description}</td>
                                        <td>
                                            <span className="time-badge">
                                                {formatTime(event.announcementTime)} 
                                            </span>
                                        </td>
                                        <td>
                                            {formatLocalDate(event.announcementDate)} 
                                        </td>
                                        <td>{event.title}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
