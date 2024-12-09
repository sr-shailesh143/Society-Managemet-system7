import React, { useEffect, useState } from 'react';
import '../index.css';
import { getAllSecurityProtocols } from '../apiservices/securityProtocolservice';
import toast from 'react-hot-toast';

export default function SecurityProtocolUI() {
  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await getAllSecurityProtocols();
        console.log('API Response:', response);

        if (response.data && Array.isArray(response.data.records)) {
          setProtocols(response.data.records);
        } else {
          console.error("API response does not have 'records' as an array:", response);
          setProtocols([]);
        }
      } catch (error) {
        console.error('Error fetching protocols:', error);
        toast.error('Failed to fetch protocols');
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div className="container-fluid p-4 " style={{ backgroundColor: 'white', borderRadius: '10px', height:"904px" }}>
      <div className="complaints-section" style={{ borderRadius: '15px', backgroundColor: '#fff', padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-4">
            Security Protocols
          </h4>
        </div>

        <div className="table-container" style={{ maxHeight: '700px', overflowY: 'auto', border: '1px solid #E5ECFD', borderRadius: '10px' }}>
          <table className="table table-hover custom-table" style={{ margin: 0 }}>
            <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th className='justify-content-between p-3' style={{ background: '#E5ECFD', textAlign: 'center' }}>Title</th>
                <th className='justify-content-between' style={{ background: '#E5ECFD', textAlign: 'center' }}>Description</th>
                <th className='justify-content-between' style={{ background: '#E5ECFD', textAlign: 'center' }}>Date</th>
                <th className='justify-content-between'style={{ background: '#E5ECFD', textAlign: 'center' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((protocol, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td  className=" align-items-center"style={{boxShadow:"none"}}>{protocol.title}</td>
                  <td className=" align-items-center"style={{boxShadow:"none"}}>{protocol.description}</td>
                  <td className=" align-items-center"style={{boxShadow:"none"}}>{new Date(protocol.date).toLocaleDateString()}</td>
                  <td className=' p-3 m-4 justify-content-center' style={{ textAlign: 'center',alignItems:"center",justifyContent:"center",boxShadow:"none"}} ><span className='time-badge2 'style={{ textAlign: 'center'}}>{protocol.time}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
