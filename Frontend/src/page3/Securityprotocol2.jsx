import React, { useEffect, useState } from 'react';
import '../index.css';
import { getAllSecurityProtocols } from '../apiservices/securityProtocolservice';
import toast from 'react-hot-toast';

export default function Securityprotocol2() {
  const [protocols, setProtocols] = useState([]);


  // Fetch all protocols on load
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await getAllSecurityProtocols();
        console.log('API Response:', response); // Log the response to check its structure
 
 


        // Assuming response.data.records contains the protocols
        if (response.data && Array.isArray(response.data.records)) {
          setProtocols(response.data.records);
        } else {
          console.error("API response does not have 'records' as an array:", response);
          setProtocols([]); // Fallback in case of an invalid structure
        }
      } catch (error) {
        console.error('Error fetching protocols:', error);
        toast.error('Failed to fetch protocols'); // Show error toast
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div className="container-fluid">
      <div className="complaints-section" style={{ borderRadius: '15px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="font-weight-bold" style={{ fontWeight: 'bold' }}>
            Security Protocols
          </h4>
        </div>

        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table custom-table">
            <thead className="table-light">
              <tr>
                <th style={{ background: '#E5ECFD' }}>Title</th>
                <th style={{ background: '#E5ECFD' }}>Description</th>
                <th style={{ background: '#E5ECFD' }}>Date</th>
                <th style={{ background: '#E5ECFD' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((protocol, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">{protocol.title}</div>
                  </td>
                  <td>{protocol.description}</td>
                  <td>{new Date(protocol.date).toLocaleDateString()}</td>
                  <td>{protocol.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
