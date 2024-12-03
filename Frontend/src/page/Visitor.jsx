import React, { useState, useEffect } from 'react';
import { getAllVisitors } from '../apiservices/visitourtrackingservice'; 


const Visitor = () => {
  const [visitors, setVisitors] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await getAllVisitors(); 
      setVisitors(response.data.records || []);

      setLoading(false);
    } catch (err) {
      setError('Failed to load visitor data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors(); 
  }, []);

  const formatTime = (timeStr) => {

    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  

  return (
    <div className="container-fluid p-4 " style={{ backgroundColor: 'white', borderRadius: '10px', height:"904px" }}>
      <h3 className="mb-4">Visitor Logs</h3>
      {loading ? (
        <p>Loading visitors...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : visitors.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-borderless align-middle">
            <thead>
              <tr>
                <th scope="col" className="p-3" style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>Visitor Name</th>
                <th scope="col" className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
                <th scope="col" className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Date</th>
                <th scope="col" className="p-3" style={{ backgroundColor: "#E5ECFD" }}>Unit Number</th>
                <th scope="col" className="p-3" style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, index) => (
                <tr key={index}>
                  <td className="d-flex align-items-center">
                    <img
                      src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
                      alt="visitor"
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <span>{visitor.visitorName}</span>
                  </td>
                  <td>{visitor.phoneNumber}</td>
                  <td>{new Date(visitor.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className="badge  rounded-circle"
                      style={{
                        background: "#F6F8FB",
                        textAlign: "center",
                        justifyContent: "center",
                    color:"#5678E9"
                       
                      }}
                    >
                     {visitor.wing.toUpperCase()}
                    </span>{" "}
                    {visitor.unit}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#E5ECFD",
                      color: "#4F4F4F",
                      width: "90px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "15px",
                      padding: "0px",
                    }}
                  >
                   {formatTime(visitor.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No visitors found.</p>
      )}
    </div>
  );
};

export default Visitor;
