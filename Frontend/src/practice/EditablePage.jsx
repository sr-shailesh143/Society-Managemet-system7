import React, { useState } from 'react';

const EditablePage = () => {
  const data = [
    {
      fullName: "Evelyn Harper",
      unitNumber: "1001",
      unitStatus: "Occupied",
      residentStatus: "Tenant",
      phoneNumber: "97587 85828",
      member: 1,
      vehicle: 2,
    },
    {
      fullName: "-",
      unitNumber: "1002",
      unitStatus: "Vacate",
      residentStatus: "--",
      phoneNumber: "--",
      member: 0,
      vehicle: 0,
    },
    {
      fullName: "Robert Fox",
      unitNumber: "2002",
      unitStatus: "Occupied",
      residentStatus: "Tenant",
      phoneNumber: "97587 85828",
      member: 3,
      vehicle: 1,
    },
    {
      fullName: "Evelyn Harper",
      unitNumber: "2004",
      unitStatus: "Occupied",
      residentStatus: "Tenant",
      phoneNumber: "97587 85828",
      member: 6,
      vehicle: 3,
    },
  ];

  return (
    <div className="responsive-table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Unit Number</th>
            <th>Unit Status</th>
            <th>Resident Status</th>
            <th>Phone Number</th>
            <th>Member</th>
            <th>Vehicle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.fullName}</td>
              <td>{item.unitNumber}</td>
              <td>
                <span
                  className={`status-badge ${
                    item.unitStatus === "Occupied"
                      ? "occupied"
                      : "vacate"
                  }`}
                >
                  {item.unitStatus}
                </span>
              </td>
              <td>
                <span
                  className={`status-badge ${
                    item.residentStatus === "Tenant"
                      ? "tenant"
                      : "owner"
                  }`}
                >
                  {item.residentStatus}
                </span>
              </td>
              <td>{item.phoneNumber}</td>
              <td>{item.member}</td>
              <td>{item.vehicle}</td>
              <td className="action-buttons">
                <button className="btn edit-btn">✏️</button>
                <button className="btn view-btn">👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditablePage;
