import React from 'react';

const Visitor = () => {

  const visitors = [
    { name: "Evelyn Harper", phone: "97852 12369", date: "10/01/2024", unit: "A", number: "1001", time: "3:45 PM" },
    { name: "Wade Warren", phone: "97852 25893", date: "11/01/2024", unit: "B", number: "1002", time: "2:45 AM" },
    { name: "John Doe", phone: "97852 36958", date: "12/01/2024", unit: "C", number: "1003", time: "12:30 PM" },
    { name: "Sarah Connor", phone: "97852 45678", date: "13/01/2024", unit: "D", number: "1004", time: "1:15 PM" },
    { name: "Michael Smith", phone: "97852 78965", date: "14/01/2024", unit: "E", number: "1005", time: "9:00 AM" },
    { name: "Laura Wilson", phone: "97852 98765", date: "15/01/2024", unit: "F", number: "1006", time: "4:45 PM" },
    { name: "James Brown", phone: "97852 74123", date: "16/01/2024", unit: "G", number: "1007", time: "10:20 AM" },
    { name: "Emily Davis", phone: "97852 96385", date: "17/01/2024", unit: "H", number: "1008", time: "11:50 AM" },
    { name: "David Clark", phone: "97852 85247", date: "18/01/2024", unit: "I", number: "1009", time: "2:30 PM" },
    { name: "Sophia Martinez", phone: "97852 75319", date: "19/01/2024", unit: "J", number: "1010", time: "6:10 PM" },
    { name: "Daniel Lopez", phone: "97852 65412", date: "20/01/2024", unit: "K", number: "1011", time: "7:45 PM" },

  ];

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <h3 className="mb-4">Visitor Logs</h3>
      <div className="table-responsive">
        <table className="table table-borderless align-middle">
          <thead >
            <tr >
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>Visitor Name</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Date</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD" }}>Unit Number</th>
              <th scope="col" className='p-3' style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>Time</th>
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
                  <span>{visitor.name}</span>
                </td>
                <td>{visitor.phone}</td>
                <td>{visitor.date}</td>
                <td>
                  <span className="badge text-primary rounded-circle" style={{ background: "#F6F8FB", textAlign: "center", justifyContent: "center" }}>{visitor.unit}</span> {visitor.number}
                </td>
                <td style={{ backgroundColor: "#E5ECFD", color: "#4F4F4F", width: "90px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "15px", padding: "0px" }}
                >
                  {visitor.time}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitor;