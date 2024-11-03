import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { FaRegEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { Modal, Button, Form } from 'react-bootstrap';
import '../App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js 
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]); 

  // Function to toggle the modal
  const toggleModal = () => setShowModal(!showModal);

  //   adding a new contact
  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
    setShowModal(false); 
  };

  // Data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: 'Balance',
        data: [10000, 15000, 20000, 25000, 30000, 55000, 35000, 45000, 40000, 50000, 45000, 30000],
        fill: false,
        backgroundColor: '#6a5acd',
        borderColor: '#6a5acd',
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (in ₹)',
        },
      },
    },
  };

  return (
    <div className="container-fluid p-4">
      {/* Statistics  */}
      <div className="row mb-4">
        <StatCard title="Total Balance" value="₹ 2,22,520" borderColor="#6a5acd" />
        <StatCard title="Total Income" value="₹ 55,000" borderColor="#28a745" />
        <StatCard title="Total Expense" value="₹ 20,550" borderColor="#dc3545" />
        <StatCard title="Total Unit" value="₹ 20,550" borderColor="#ffc107" />
      </div>

      {/* Total Balance Chart */}
      <div className="row mb-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="card-title me-3">Total Balance</h3>
                <select className="form-select mb-2" style={{ width: 'auto' }}>
                  <option>Month</option>
                  <option>Last week</option>
                  <option>Last month</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div style={{ height: '300px' }}>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        </div>

        {/* Important Numbers and Pending Maintenance */}
        <div className="col-lg-6 d-flex flex-wrap">
          <div className="col-lg-6 col-md-6 mb-4">
            <div className="card h-100 " style={{ marginRight: "5px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="card-title">Important Numbers</h6>
                  <Button
                    onClick={toggleModal}
                    className="btn mb-4"
                    style={{
                      background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                      color: "white",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaPlus />
                    Add
                  </Button>
                </div>
                {contacts.map((contact, index) => (
                  <ContactCard key={index} name={contact.fullName} phone={contact.phoneNumber} work={contact.work} />

                ))}
                <ContactCard name="Hanna Donin" phone="+91 985957 33657" work="Plumber" />
                <ContactCard name="Jane Doe" phone="+91 9123456789" work="Electrician" />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="card-title ">Pending Maintenances</h6>
                  <a href="#" className="text-primary" style={{ textDecoration: "none" }}>View all</a>
                </div>
                <MaintenanceCard name="Roger Lubin" amount="₹ 5,000" photo="path_to_roger_photo.jpg" />
                <MaintenanceCard name="Mark Smith" amount="₹ 7,500" photo="path_to_mark_photo.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint List and Upcoming Activities */}
      <div className="row mb-4">
        {/* Complaint List */}
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className='d-flex'>
              <h3 className="card-title">Complaint List</h3>
              <select className="form-select mb-2 " style={{ width: 'auto' }}>
                  <option>Month</option>
                  <option>Last week</option>
                  <option>Last month</option>
                  <option>Last Year</option>
                </select>
              </div>
              <ComplaintTable />
            </div>
          </div>
        </div>

        {/* Upcoming Activity */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <div className='d-flex'>
              <h6 className="card-title">Upcoming Activities</h6>
              <select className="form-select mb-2 " style={{ width: 'auto' }}>
                  <option>Month</option>
                  <option>Last week</option>
                  <option>Last month</option>
                  <option>Last Year</option>
                </select>
              </div>
              
              <ActivityList />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <ModalForm show={showModal} handleClose={toggleModal} handleAddContact={handleAddContact} />
    </div>
  );
}

function ModalForm({ show, handleClose, handleAddContact }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    work: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContact(formData); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Important Number </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label style={{color:"black"}}>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                borderRadius:"15px"
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label style={{color:"black"}}>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={{
                borderRadius:"15px"
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWork">
            <Form.Label style={{color:"black"}}>Work Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter work"
              name="work"
              value={formData.work}
              onChange={handleChange}
              required
              style={{
                borderRadius:"15px"
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
           
            <Button style={{width:"40%",border:"1px solid grey",backgroundColor:"transparent",color:"black"}} onClick={handleClose}>
              Cancel
            </Button>
            <Button style={{backgroundColor:"lightgrey",border:"none",width:"40%"}} type="submit">
              Save 
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// Component for the statistic cards at the top
function StatCard({ title, value }) {
  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <div
        className="card-container text-center p-3"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
   
        <div style={{ textAlign: 'left', zIndex: 1 }}>
          <h5 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{title}</h5>
          <h2
            className="display-4"
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: '#FFF4E5',
            color: '#FF5722',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 1,
          }}
        >
          ≡
        </div>
      </div>
    </div>

  );
}


function ContactCard({ name, phone, work }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h6>{name}</h6>
        <p>{phone}</p>
        <small>{work}</small>
      </div>
      <div>
        <FaRegEdit className="me-2" style={{ cursor: "pointer" }} />
        <MdOutlineDeleteOutline style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}


function MaintenanceCard({ name, amount, photo }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <img src="https://img.utdstc.com/screen/1ae/615/1ae6159dd734a54776bd20d4261353325615934be1c1dab40ac88d2ed83bc8ea:600" alt={name} style={{ width: "50px", borderRadius: "50%" }} />
      <span>{name}</span>
      <div>

        <span style={{ color: "red" }}>{amount}</span>
      </div>
    </div>
  );
}

// Component for the complaint table
function ComplaintTable() {
  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          <th style={{ backgroundColor: '#DEEFF5' }}>Complainer Name</th>
          <th style={{ backgroundColor: '#DEEFF5' }}>Complaint Name</th>
          <th style={{ backgroundColor: '#DEEFF5' }} >Date</th>
          <th style={{ backgroundColor: '#DEEFF5' }}>Status</th>
          <th style={{ backgroundColor: '#DEEFF5' }} >Priority</th>
          <th style={{ backgroundColor: '#DEEFF5' }}>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <img
              src="https://lh3.googleusercontent.com/3a7VAqoTUFK__VNs5pBh97OfXcJErjYSIXFGkl_ggXY5-juaAdvynr5G3Wbb_rgWmlowP4nlb4OUXEZFpCY5XXc8l7SjuROzf9Q=h200"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
            John Doe
          </td>
          <td>Unethical Behavior</td>
          <td>2024-11-01</td>
          <td>
            <span className="text-danger" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              Open
            </span>
          </td>
          <td>
            <span className="text-warning" style={{ backgroundColor: 'rgba(255, 165, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              Medium
            </span>
          </td>
          <td>
            <FaEye className="text-primary" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FaRegEdit className="text-warning" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <MdOutlineDeleteOutline className="text-danger" style={{ cursor: 'pointer' }} />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src="https://lh3.googleusercontent.com/3a7VAqoTUFK__VNs5pBh97OfXcJErjYSIXFGkl_ggXY5-juaAdvynr5G3Wbb_rgWmlowP4nlb4OUXEZFpCY5XXc8l7SjuROzf9Q=h200"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
            Jane Smith
          </td>
          <td>Noise Complaint</td>
          <td>2024-11-01</td>
          <td>
            <span className="text-warning" style={{ backgroundColor: 'rgba(255, 255, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              Pending
            </span>
          </td>
          <td>
            <span className="text-danger" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              High
            </span>
          </td>
          <td>
            <FaEye className="text-primary" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FaRegEdit className="text-warning" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <MdOutlineDeleteOutline className="text-danger" style={{ cursor: 'pointer' }} />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src="https://lh3.googleusercontent.com/3a7VAqoTUFK__VNs5pBh97OfXcJErjYSIXFGkl_ggXY5-juaAdvynr5G3Wbb_rgWmlowP4nlb4OUXEZFpCY5XXc8l7SjuROzf9Q=h200"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
            Alex Johnson
          </td>
          <td>Pothole Issue</td>
          <td>2024-11-01</td>
          <td>
            <span className="text-success" style={{ backgroundColor: 'rgba(0, 255, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              Solved
            </span>
          </td>
          <td>
            <span className="text-success" style={{ backgroundColor: 'rgba(0, 255, 0, 0.1)', padding: '5px', borderRadius: '4px' }}>
              Low
            </span>
          </td>
          <td>
            <FaEye className="text-primary" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FaRegEdit className="text-warning" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <MdOutlineDeleteOutline className="text-danger" style={{ cursor: 'pointer' }} />
          </td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>



  );
}

// Component for upcoming activity list
function ActivityList() {
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
    <h6 style={{
        backgroundColor: "lightgreen",
        width: "40px", 
        height: "40px", 
        textAlign: "center",
        justifyContent: "center",
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        fontWeight: "bold",
        color: "green",
        marginRight: "10px" 
    }}>S</h6>
     <span>Society Meeting</span>
</div>

        <span>24-09-2024</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
        <h6 style={{
        backgroundColor: "#E6BBAD",
        width: "40px", 
        height: "40px", 
        textAlign: "center",
        justifyContent: "center",
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        fontWeight: "bold", 
        color: "DarkOrange", 
        marginRight: "10px" 
    }}>H</h6>
          Holi Festival
        </div>
        <span>24-09-2024</span>
      </li>
    </ul>
  );
}
