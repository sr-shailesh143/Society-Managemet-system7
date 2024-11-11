import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { FaRegEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { Modal, Button, Form } from 'react-bootstrap';

import '../App.css';
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
  const [editIndex, setEditIndex] = useState(null);

  // Function to toggle the modal
  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setEditIndex(null);
    }
  };

  const handleAddContact = (newContact) => {
    if (editIndex !== null) {

      const updatedContacts = contacts.map((contact, index) =>
        index === editIndex ? newContact : contact
      );
      setContacts(updatedContacts);
    } else {

      setContacts([...contacts, newContact]);
    }
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
  const handleDeleteContact = (index) => {
    const newContacts = contacts.filter((contact, idx) => idx !== index);
    setContacts(newContacts);
  };

  // Handle editing a contact
  const handleEditContact = (index) => {
    setEditIndex(index);
    setShowModal(true);
    setModalData(contacts[index]);
  };

  return (
    <div className="container-fluid p-4">
      {/* Statistics  */}
      <div className="row mb-4">
        <StatCard
          title="Total Balance"
          value="₹ 2,22,520"
          iconSrc="src/Assets/button1.png"
          cardClass="balance-card-orange"
        />
        <StatCard
          title="Total Income"
          value="₹ 55,000"
          iconSrc="src/Assets/button2.png"
          cardClass="balance-card-green"
        />
        <StatCard
          title="Total Expense"
          value="₹ 20,550"
          iconSrc="src/Assets/button3.png"
          cardClass="balance-card-blue"
        />
        <StatCard
          title="Total Unit"
          value="₹ 20,550"
          iconSrc="src/Assets/button4.png"
          cardClass="balance-card-pink"
        />

      </div>

      {/* Total Balance Chart */}
      <div className="row mb-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100" style={{ borderRadius: "15px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="card-title me-3">Total Balance</h3>
                <select className="form-select mb-2" style={{ width: 'auto' }}>
                  <option > Month</option>
                  <option >Last week</option>
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
  {/* Important Numbers Section */}
  <div className="col-lg-6 col-md-6 mb-4" style={{ marginLeft: "-10px", marginRight: "2px" }}>
    <div className="card h-100" style={{ marginRight: "5px", borderRadius: "15px" }}>
      <div className="card-body" style={{ paddingBottom: "0" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="card-title"style={{fontSize:"13px"}}>Important Numbers</h6>
          <Button
            onClick={toggleModal}
            className="btn "
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
          
              textAlign:"center",
              justifyContent:"center",
              position: "static",
              marginBottom: "15px",
            }}
          >
            <FaPlus  />
            Add
          </Button>
        </div>
        <div style={{ overflowY: "auto" }}>
  <ContactCard name="Hanna Donin" phone="98595733657" work="Plumber" />
  <ContactCard name="Jane Doe" phone="9123456789" work="Electrician" />

  {contacts.map((contact, index) => (
    <ContactCard
      key={index}
      name={contact.fullName}
      phone={contact.phoneNumber}
      work={contact.work}
      onEdit={() => handleEditContact(index)}
      onDelete={() => handleDeleteContact(index)}
    />
  ))}
</div>

      </div>
    </div>
  </div>

  {/* Pending Maintenances Section */}
  <div className="col-lg-6 col-md-6 mb-4" style={{ marginLeft: "7px" }}>
    <div className="card h-100" style={{ borderRadius: "15px" }}>
    <div className="card-body" style={{ paddingBottom: "0" }}>
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h6 className="card-title" style={{ fontSize: "13px" }}>Pending Maintenances</h6>
    <a href="#" className="text-primary" style={{ textDecoration: "none" }}>View all</a>
  </div>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    <MaintenanceCard name="Roger Lubin" amount="₹ 5,000" photo="path_to_roger_photo.jpg" />
    <MaintenanceCard name="Mark Smith" amount="₹ 7,500" photo="path_to_mark_photo.jpg" />
    <MaintenanceCard name="John Doe" amount="₹ 10,000" photo="path_to_john_photo.jpg" />
  </div>
</div>

    </div>
  </div>
</div>


      </div>


      <div className="row">
  {/* Complaint List Section */}
  <div className="col-lg-9 mb-4" style={{ height: "361px", overflowY: "auto" }}> {/* Increased width */}
    <div className="card h-100" style={{ borderRadius: "15px" }}>
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-center p-2" style={{ padding: "0" }}>
          <h5 className="card-title p-2" style={{ marginBottom: "0" }}>Complaint List</h5>
          <select className="form-select mb-0 position-absolute top-0 end-0 m-2" style={{ width: 'auto' }}>
            <option>Month</option>
            <option>Last week</option>
            <option>Last month</option>
            <option>Last Year</option>
          </select>
        </div>
        <div style={{ maxHeight: "250px", overflowY: "auto" }}>
          <ComplaintTable />
        </div>
      </div>
    </div>
  </div>

  {/* Upcoming Activities Section */}
  <div className="col-lg-3 mb-4" style={{ height: "361px", overflowY: "auto" }}>
    <div className="card h-100" style={{ borderRadius: "15px" }}>
    <div className="card-body p-0">
    <div className="d-flex justify-content-between align-items-center p-2" style={{ padding: "0" }}>
    <h6 className="card-title p-2" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" ,fontSize:"12px"}}>Upcoming Activities</h6>
    <select
          className="form-select  position-absolute top-0 end-0 m-2 p-1"
          style={{ width: 'auto', fontSize: '13px',  }}
        >
            <option>Month</option>
            <option>Last week</option>
            <option>Last month</option>
            <option>Last Year</option>
          </select>
        </div>
        <div style={{ maxHeight: "250px", overflowY: "auto", paddingTop: "10px" }}>
          <ActivityList />
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Modal Form */}
      <ModalForm
        show={showModal}
        handleClose={toggleModal}
        handleAddContact={handleAddContact}
        initialData={editIndex !== null ? contacts[editIndex] : null}
      />
    </div>
  );
}

function ModalForm({ show, handleClose, handleAddContact, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    fullName: '',
    phoneNumber: '',
    work: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const { fullName, phoneNumber, work } = formData;
    setIsFormValid(fullName && phoneNumber && work);
  }, [formData]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleAddContact(formData);
    setFormData({ fullName: '', phoneNumber: '', work: '' });
  };


  useEffect(() => {
    setFormData(initialData || { fullName: '', phoneNumber: '', work: '' });
  }, [initialData]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{initialData ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formWork">
            <Form.Label>Work<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="work"
              value={formData.work}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: '1px solid grey',
                width: '50%',
                color: 'black',
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: isFormValid
                  ? 'linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)'
                  : 'lightgrey',
                color: isFormValid ? 'white' : 'black',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '40%',
                justifyContent: 'center',
              }}
              type="submit"
              disabled={!isFormValid}
            >
              {initialData ? 'Save' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

  );
}
function StatCard({ title, value, iconSrc, cardClass }) {
  return (
    <div className="col-lg-3  ">
      <div className={`balance-card  ${cardClass}`}>
        <div className="balance-info ">
          <p className="mb-0 text-muted pt-2">{title}</p>
          <h5 className="balance-amount f-2">{value}</h5>
        </div>
        <div className="icon-container">
          <img src={iconSrc} alt="Icon" />
        </div>
      </div>
    </div>
  );
}


function ContactCard({ name, phone, work, onEdit, onDelete, id }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  return (
    <div className="d-flex justify-content-between align-items-center  border-bottom pb-2" style={{ borderRadius: "15px" }}>
     <div>
  <p style={{ color: "grey", marginBottom: "0" }}>
    <span style={{ color: "black",fontSize:"11px" }}>Name:-</span><span  style={{fontSize:"13px"}}>{name}</span> 
  </p>
  <div className="d-flex align-items-center">
    <p style={{ color: "grey", marginBottom: "0" }}>
      <span style={{ color: "black",fontSize:"11px" }}>Phone:-</span><span style={{fontSize:"13px"}}> {phone}</span>
    </p>
    {/* Edit and Delete buttons next to phone */}
    <div className="ms-2 d-flex align-items-center" style={{ whiteSpace: "nowrap" }}>
      <Button
        onClick={onEdit}
        style={{
          color: "green",
          backgroundColor: "transparent",
          border: "none",
          width: "30px",
          height: "30px",
        }}
        size="sm"
      >
        <FaRegEdit />
      </Button>
      <Button
        onClick={handleShowDeleteModal}
        style={{
          color: "red",
          backgroundColor: "transparent",
          border: "none",
          width: "30px",
          height: "30px",
        }}
        size="sm"
        className="ms-2"
      >
        <MdOutlineDeleteOutline />
      </Button>
    </div>
  </div>
  <p style={{ color: "grey" }}>
    <span style={{ color: "black", marginBottom: "0",fontSize:"11px" }}>Work:-</span><span style={{fontSize:"13px"}}> {work}</span>
  </p>
</div>


      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this number?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "transparent", border: "1px solid grey", color: "black" }} onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const MaintenanceCard = ({ name, amount, photo }) => {
  return (
    <div className="d-flex align-items-center mb-3 w-100">
      <img
        src="https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp"
        alt={name}
        style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
      />
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex flex-column align-items-start">
          <span>{name}</span>
          <p style={{ fontSize: "0.8em", color: "gray", margin: 0 }}>2 months</p>
        </div>
        <span style={{ color: "red" }}>{amount}</span>
      </div>
    </div>
  );
};


const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, name: 'John Doe', complaint: 'UnethicalBehavior', date: '2024-11-01', status: 'Open', priority: 'Medium', profilePhoto: 'https://www.shutterstock.com/image-vector/vector-illustration-color-avatar-user-260nw-2463110233.jpg' },
    { id: 2, name: 'Jane Smith', complaint: 'Noise Complaint', date: '2024-11-01', status: 'Pending', priority: 'High', profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbC_i3mdPG4rauxrzDGjwL1QHiqtDVuHbcifrdanG8VzxmqSQEvmEl3tpynyz0yiV7Y00&usqp=CAU' },
    { id: 3, name: 'Alex Johnson', complaint: 'Pothole Issue', date: '2024-11-01', status: 'Solved', priority: 'Low', profilePhoto: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg' },
    { id: 4, name: ' Johnson', complaint: 'Pothole ', date: '2024-11-01', status: 'Solved', priority: 'Low', profilePhoto: 'https://img.freepik.com/premium-photo/orange-white-picture-man-with-beard-smile_745528-17296.jpg' },

  ]);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);
  const [complaintToView, setComplaintToView] = useState(null);

  const handleEditClick = (complaint) => {
    setEditData(complaint);
    setShowEditModal(true);
  };

  const handleViewClick = (complaint) => {
    setComplaintToView(complaint);
    setShowViewModal(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setComplaints(
      complaints.map((comp) => (comp.id === editData.id ? editData : comp))
    );
    setEditData(null);
    setShowEditModal(false);
  };

  const handleDeleteClick = (complaint) => {
    setComplaintToDelete(complaint);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setComplaints(complaints.filter((comp) => comp.id !== complaintToDelete.id));
    setComplaintToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="table-responsive" style={{ borderRadius: "15px" }}>
      <table className="table table-hover table-striped" style={{  borderSpacing: '0' }}>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13px" }}>Complainer Name</th>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13px" }}>Complaint Name</th>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13px" }}>Date</th>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13px" }}>Priority</th>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13x" }}>Status</th>
            <th style={{ backgroundColor: "#E5E8FD",fontSize:"13px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((comp) => (
            <tr className="no-shadow"
              key={comp.id}
              style={{
                boxShadow: "none",
                textAlign: 'center',
                boxShadow: 'none',  // Remove the inset box-shadow here
fontSize:"16px"
              }}
            >
              <td
                style={{
                  boxShadow: "none",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  border: 'none',
                  fontSize:"16px"
                }}
              >
                <img
                  src={comp.profilePhoto}
                  alt="Profile"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    marginRight: '10px',
                    
                    fontSize:"13px"
                  }}
                />
                <span style={{ border: 'none', boxShadow: "none" }}>{comp.name}</span>
              </td>

              <td style={{ border: 'none', boxShadow: "none" ,fontSize:"16px" }}>{comp.complaint}</td>
              <td style={{ border: 'none', boxShadow: "none", fontSize:"16px" }}>{comp.date}</td>
              <td style={{ border: 'none', boxShadow: "none" }}>
                <span
                  style={{
                    boxShadow: "none",
                    display: 'inline-block',
                    padding: '5px 10px',
                    borderRadius: '12px',
                    backgroundColor: comp.priority === 'High' ? '#E74C3C' : comp.priority === 'Medium' ? '#5678E9' : '#39973D',
                    color: 'white',
                    width: '80px',
                    textAlign: 'center',
                    fontSize:"13px"
                  }}
                >
                  {comp.priority}
                </span>
              </td>
              <td style={{ border: 'none', boxShadow: "none" }}>
                <span
                  style={{
                    boxShadow: "none",
                    padding: '5px 10px',
                    borderRadius: '12px',
                    backgroundColor: comp.status === 'Open' ? '#b2f0b2' : comp.status === 'Pending' ? '#fff9c4' : '#cce7ff',
                    color: comp.status === 'Open' ? '#006400' : comp.status === 'Pending' ? '#f57f17' : '#1e3a8a',
                    minWidth: '80px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize:"13px"
                  }}
                >
                  {comp.status}
                </span>
              </td>
              <td style={{ border: 'none', boxShadow: 'none', padding: '0' }}>
  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
    <FaRegEdit
      className="text-success"
      onClick={() => handleEditClick(comp)}
      style={{
        marginRight: '10px',
        padding: '8px',
        borderRadius: '30%',
        fontSize: '30px',
        backgroundColor: '#f5f5f5',
        boxShadow: 'none', // Ensure no box-shadow
      }}
    />
    <FaEye
      className="text-primary"
      onClick={() => handleViewClick(comp)}
      style={{
        marginRight: '10px',
        padding: '8px',
        borderRadius: '30%',
        fontSize: '30px',
        backgroundColor: '#f5f5f5',
        boxShadow: 'none',
      }}
    />
    <MdOutlineDeleteOutline
      className="text-danger"
      onClick={() => handleDeleteClick(comp)}
      style={{
        textAlign:"center",
        padding: '8px',
        borderRadius: '30%',
        fontSize: '30px',
        backgroundColor: '#f5f5f5',
        boxShadow: 'none', // Ensure no box-shadow
        outline: 'none',
      }}
    />
  </div>
</td>

            </tr>
          ))}
        </tbody>



      </table>

      {/* Edit Modal */}
      {editData && (
        <div>
          <div className={`modal-backdrop fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}></div>

          <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Complaint</h5>
                </div>
                <div className="modal-body">
                  <label htmlFor="">Complainer Name <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    placeholder="Complainer Name"
                    className="form-control mb-2"
                  />
                  <label htmlFor="">Complaint Name <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    name="complaint"
                    value={editData.complaint}
                    onChange={handleChange}
                    placeholder="Complaint Name"
                    className="form-control mb-2"
                  />
                  <label htmlFor="">Date <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    name="date"
                    value={editData.date}
                    onChange={handleChange}
                    placeholder="Date"
                    className="form-control mb-2"
                  />

                  <div className="mb-2">
                    <label>Status<span style={{ color: "red" }}>*</span></label><br />
                    <div className="d-flex justify-content-start">
                      <div className="me-3" style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="status"
                          value="Open"
                          checked={editData.status === 'Open'}
                          onChange={handleChange}
                          id="statusOpen"
                          className='m-2'
                        />
                        <label htmlFor="statusOpen">Open</label>
                      </div>
                      <div className="me-3" style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="status"
                          value="Pending"
                          checked={editData.status === 'Pending'}
                          onChange={handleChange}
                          id="statusPending"
                          className='m-2'
                        />
                        <label htmlFor="statusPending">Pending</label>
                      </div>
                      <div style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="status"
                          value="Solved"
                          checked={editData.status === 'Solved'}
                          onChange={handleChange}
                          id="statusSolved"
                          className='m-2'
                        />
                        <label htmlFor="statusSolved">Solved</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label>Priority<span style={{ color: "red" }}>*</span></label><br />
                    <div className="d-flex justify-content-start">
                      <div className="me-3" style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="priority"
                          value="High"
                          checked={editData.priority === 'High'}
                          onChange={handleChange}
                          id="priorityHigh"
                          className='m-2'
                        />
                        <label htmlFor="priorityHigh" >High</label>
                      </div>
                      <div className="me-3" style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="priority"
                          value="Medium"
                          checked={editData.priority === 'Medium'}
                          onChange={handleChange}
                          id="priorityMedium"
                          className='m-2'
                        />
                        <label htmlFor="priorityMedium">Medium</label>
                      </div>
                      <div style={{ border: "1px solid grey", borderRadius: "45px", width: "100px", textAlign: "center", justifyContent: "center" }}>
                        <input
                          type="radio"
                          name="priority"
                          value="Low"
                          checked={editData.priority === 'Low'}
                          onChange={handleChange}
                          id="priorityLow"
                          className='m-2'
                        />
                        <label htmlFor="priorityLow">Low</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid grey",
                      color: "black",
                      width: "48%",
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                    style={{
                      background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                      border: "none",
                      width: "48%",
                    }}
                    disabled={!editData.name || !editData.complaint || !editData.date || !editData.status || !editData.priority}
                  >
                    Save
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}


      {/* View Modal */}
      {complaintToView && (
        <div>
          <div
            className={`modal-backdrop fade ${showViewModal ? 'show' : ''}`}
            style={{ display: showViewModal ? 'block' : 'none' }}
          ></div>

          <div
            className={`modal fade ${showViewModal ? 'show' : ''}`}
            style={{ display: showViewModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content" style={{ borderRadius: '12px', padding: '20px' }}>


                <div className="modal-header" style={{ position: 'relative', borderBottom: 'none' }}>
                  <h5 className="modal-title text-start" style={{ fontWeight: 'bold', textAlign: 'center', width: '100%' }}>View Complaint</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowViewModal(false)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '1.5rem',
                      color: '#000',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>


                <div className="modal-body" style={{ padding: '10px 20px' }}>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <img
                      src={complaintToView.profilePhoto} // Use the profilePhoto from the selected complaint
                      alt={`${complaintToView.name}'s profile`}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        marginRight: '15px'
                      }}
                    />
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0' }}>
                        {complaintToView.name}
                      </p>
                      <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        {complaintToView.date}
                      </p>
                    </div>
                  </div>



                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Request Name</p>
                    <p style={{ fontSize: '0.95rem', color: '#555' }}>{complaintToView.complaint}</p>


                    <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', marginBottom: '5px', marginTop: '10px' }}>Description</p>
                    <p style={{ fontSize: '0.95rem', color: '#555' }}>{complaintToView.description || 'a municipal law that regulates the nature and level of sound that can be emitted in a given place at a given time.'}</p>
                  </div>


                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', marginBottom: '5px' }}>Wing</p>
                      <span style={{
                        fontSize: '1rem',
                        color: '#fff',
                        backgroundColor: '#007bff',
                        padding: '5px 10px',
                        borderRadius: '8px'
                      }}>
                        {complaintToView.wing || 'A'}
                      </span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', marginBottom: '5px' }}>Unit</p>
                      <span style={{
                        fontSize: '1rem',
                        color: '#333',
                        backgroundColor: '#e9ecef',
                        padding: '5px 10px',
                        borderRadius: '8px'
                      }}>
                        {complaintToView.unit || '1002'}
                      </span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', marginBottom: '5px' }}>Priority</p>
                      <span style={{
                        fontSize: '1rem',
                        color: '#fff',
                        backgroundColor: complaintToView.priority === 'High' ? '#FF0000' : complaintToView.priority === 'Medium' ? '#FFC107' : '#4CAF50',
                        padding: '5px 10px',
                        borderRadius: '8px'
                      }}>
                        {complaintToView.priority}
                      </span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', marginBottom: '5px' }}>Status</p>
                      <span style={{
                        fontSize: '1rem',
                        color: '#fff',
                        backgroundColor: complaintToView.status === 'Open' ? '#007bff' : '#6c757d',
                        padding: '5px 10px',
                        borderRadius: '8px'
                      }}>
                        {complaintToView.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Delete Confirmation Modal */}
      {complaintToDelete && (
        <div>

          <div className={`modal-backdrop fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}></div>


          <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none', boxShadow: "3px 4px 5px solid black" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div
                className="modal-content"
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Delete Complaint</h5>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete the complaint from {complaintToDelete.name}?</p>
                </div>
                <div className="modal-footer d-flex" style={{ justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowDeleteModal(false)}
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      border: "1px solid grey",
                      width: "48%"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteConfirm}
                    style={{
                      width: "48%"
                    }}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
//  upcoming activity list
function ActivityList() {
  return (
    <ul className="list-group custom-scroll" style={{ height: "250px" }}>
    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex align-items-center w-100">
        <h6
          style={{
            backgroundColor: "#E6BBAD",
            width: "30px",
            padding: "2px",
            height: "30px",
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "DarkOrange",
            marginRight: "10px",
            fontSize: "0.9em",
          }}
        >
          H
        </h6>
  
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginRight: '10px',
                flex: 1
              }}
            >
              Holi Festival
            </span>
            <span
              className="text-muted"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: "13px"
              }}
            >
              {`24-09-2024`}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.8em",
              margin: 0,
              color: "gray",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            10 AM to 3 PM
          </p>
        </div>
      </div>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex align-items-center w-100">
        <h6
          style={{
            backgroundColor: "#E6BBAD",
            width: "30px",
            padding: "2px",
            height: "30px",
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "DarkOrange",
            marginRight: "10px",
            fontSize: "0.9em",
          }}
        >
          H
        </h6>
  
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginRight: '10px',
                flex: 1
              }}
            >
              Holi Festival
            </span>
            <span
              className="text-muted"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: "13px"
              }}
            >
              {`24-09-2024`}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.8em",
              margin: 0,
              color: "gray",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            10 AM to 3 PM
          </p>
        </div>
      </div>
    </li>
  
   
  </ul>
  
  
  );
}
