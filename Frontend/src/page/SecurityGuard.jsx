import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaFemale, FaMale } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
const SecurityGuard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newGuard, setNewGuard] = useState({
    name: '',
    phone: '',
    shift: '',
    date: '',
    time: '',
    gender: ''
  });
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [guards, setGuards] = useState([
    { name: 'John Doe', phone: '123-456-7890', shift: 'day', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'day', date: '2024-11-01', time: '08:00', gender: 'female' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'day', date: '2024-11-01', time: '08:00', gender: 'female' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'day', date: '2024-11-01', time: '08:00', gender: 'female' },

    
    
  ]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGuard({ ...newGuard, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGuards([...guards, newGuard]);
    setShowModal(false);
    setNewGuard({ name: '', phone: '', shift: '', date: '', time: '', gender: '' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setGuards(guards.map((guard) => (guard === selectedGuard ? newGuard : guard)));
    setShowEditModal(false);
    setSelectedGuard(null);
    setNewGuard({ name: '', phone: '', shift: '', date: '', time: '', gender: '' });
  };

  // Handle View Modal
  const handleView = (guard) => {
    setSelectedGuard(guard);
    setShowViewModal(true);
  };

  // Handle Edit Modal
  const handleEdit = (guard) => {
    setSelectedGuard(guard);
    setNewGuard(guard);
    setShowEditModal(true);
  };

  // Handle Delete
  const handleDelete = () => {
    setGuards(guards.filter(guard => guard !== selectedGuard));
    setShowDeleteModal(false);
    setSelectedGuard(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      console.log(file.name);

    }
  };
  return (
    <div className="container-fluid p-3" style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <div className="container bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h2 className="fw-normal">Security Guard Details</h2>
          <button
            className="btn btn-warning text-white"
            style={{
              background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
              border: "none",
              color: "white"
            }}
            onClick={() => setShowModal(true)}
          >
            Add Security
          </button>
        </div>
        <div className="table-responsive bg-white" style={{ marginTop: "20px" }}>
          <table className="table table-striped" style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
            <thead className="table-light text-center">
              <tr>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Security Guard Name</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Select Shift</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Shift Date</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Shift Time</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Gender</th>
                <th className="fw-normal" style={{ backgroundColor: "#E5ECFD" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {guards.map((guard, index) => (
                <tr key={index} className="text-center">
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    <img
                      src="https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E="
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '30px', marginRight: '10px' }}
                    />
                    {guard.name}
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    {guard.phone}
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    <span
                      className="badge"
                      style={{
                        borderRadius: "30px",
                        backgroundColor: guard.shift === 'day' ? 'lightgrey' : '#4F4F4F',
                        color: guard.shift === 'day' ? '#FFD700' : '#FFF',
                      }}
                    >
                      {guard.shift === 'day' ? '🌞 Day' : '🌙 Night'}
                    </span>
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    {guard.date}
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    {guard.time}
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    {guard.gender === 'male' ? (
                      <span
                        className="badge d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: '#B2EBF2',
                          color: '#000',
                          width: "113px",
                          textAlign: "center",
                          padding: '5px',
                          borderRadius: "30px"
                        }}
                      >
                        <FaMale style={{ marginRight: '5px' }} />
                        Male
                      </span>
                    ) : (
                      <span
                        className="badge d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: '#F8BBD0',
                          color: '#000',
                          width: "113px",
                          textAlign: "center",
                          padding: '5px',
                          borderRadius: "30px"
                        }}
                      >
                        <FaFemale style={{ marginRight: '5px' }} />
                        Female
                      </span>
                    )}
                  </td>
                  <td className="fw-normal" style={{ boxShadow: 'none' }}>
                    <button
                      className="btn btn-sm mx-1"
                      style={{ backgroundColor: "lightgrey", color: "green" }}
                      onClick={() => handleEdit(guard)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm mx-1"
                      style={{ backgroundColor: "lightgrey", color: "blue" }}
                      onClick={() => handleView(guard)}
                    >
                      <IoMdEye />
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "lightgrey", color: "red" }}
                      onClick={() => {
                        setSelectedGuard(guard);
                        setShowDeleteModal(true);
                      }}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Modal for adding new Security Guard */}
      <div
        className={`modal ${showModal ? 'd-block' : ''}`}
        tabIndex="-1"
        style={{
          display: showModal ? 'block' : 'none',
          backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
        }}
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Security Guard</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label d-flex align-items-center">
                    <label
                      htmlFor="image"
                      className="btn btn-outline-secondary d-flex justify-content-center align-items-center ms-2 m-2"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        backgroundColor: 'lightgrey',
                        border: "none",

                      }}
                    >
                      <span style={{ fontSize: '24px', color: 'white' }}>+</span>
                    </label>

                    <a href="#" style={{ textDecoration: "none" }}> Add Photo</a>

                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control-file d-none"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>




                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="shift" className="form-label">Shift</label>
                    <select
                      className="form-control"
                      id="shift"
                      name="shift"
                      onChange={handleChange}
                      required
                    >
                      <option value="day">Day</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label">Shift Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      name="time"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Shift Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  style={{
                    width: "175px",
                    backgroundColor: "lightgrey", border: "none"
                  }}
                >
                  cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{
                  width: "175px",
                  background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                  border: "none",
                  color: "white"
                }}
                >Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showEditModal ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: showEditModal ? 'block' : 'none', backgroundColor: showEditModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
        aria-labelledby="editModalLabel"
        aria-hidden={!showEditModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Guard Details</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newGuard.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={newGuard.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
  <div className="col-md-6 mb-3">
    <label className="form-label">Shift</label>
    <select
      className="form-select"
      name="shift"
      value={newGuard.shift}
      onChange={handleChange}
    >
      <option value="day">Day</option>
      <option value="night">Night</option>
    </select>
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Gender</label>
    <select
      className="form-select"
      name="gender"
      value={newGuard.gender}
      onChange={handleChange}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
</div>

<div className="row">
  <div className="col-md-6 mb-3">
    <label className="form-label">Date</label>
    <input
      type="date"
      className="form-control"
      name="date"
      value={newGuard.date}
      onChange={handleChange}
    />
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Time</label>
    <input
      type="time"
      className="form-control"
      name="time"
      value={newGuard.time}
      onChange={handleChange}
    />
  </div>
</div>

               
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}style={{backgroundColor:"lightgrey",border:"none",width:"175px"}}>
                  Cancel
                </button>
                <button type="submit" className="btn"
                 style={{
                  background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                  border: "none",
                  color: "white",
                  width:"175px"
                }}
                >
                   Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {selectedGuard && (
        <div
          className={`modal fade ${showDeleteModal ? 'show' : ''}`}
          tabIndex="-1"
          style={{ display: showDeleteModal ? 'block' : 'none', backgroundColor: showDeleteModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
          aria-labelledby="deleteModalLabel"
          aria-hidden={!showDeleteModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Guard</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {selectedGuard.name}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for viewing Security Guard details */}
      <div
        className={`modal fade ${showViewModal ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: showViewModal ? 'block' : 'none', backgroundColor: showViewModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
        aria-labelledby="viewModalLabel"
        aria-hidden={!showViewModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">View Security Guard</h5>
            </div>
            <div className="modal-body">

              {selectedGuard && (
                <>
                  <p><strong>Name:</strong> {selectedGuard.name}</p>
                  <p><strong>Phone:</strong> {selectedGuard.phone}</p>
                  <p><strong>Shift:</strong> {selectedGuard.shift}</p>
                  <p><strong>Shift Date:</strong> {selectedGuard.date}</p>
                  <p><strong>Shift Time:</strong> {selectedGuard.time}</p>
                  <p><strong>Gender:</strong> {selectedGuard.gender}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowViewModal(false)}
                style={{backgroundColor:"lightgrey",border:"none"}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityGuard;
