import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaFemale, FaMale } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../index.css'

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
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'day', date: '2024-11-01', time: '08:00', gender: 'female' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },
    { name: 'Jane Doe', phone: '123-456-7890', shift: 'night', date: '2024-11-01', time: '08:00', gender: 'male' },

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
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });
  return (
    <div className="container-fluid " style={{ minHeight: '100vh', width: '100%' }}>
      <div className="container-fluid bg-white p-4 rounded shadow">
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
          <table className="table table-striped custom-table">
            <thead className="table-light text-center">
              <tr>
                <th className="fw-normal header-cell" style={{ backgroundColor: "#E5ECFD", borderRadius: "15px 0px 0px 0px" }}>Security Guard Name</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD" }}>Phone Number</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD" }}>Select Shift</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD" }}>Shift Date</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD" }}>Shift Time</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD" }}>Gender</th>
                <th className="fw-normal header-cell"style={{ backgroundColor: "#E5ECFD", borderRadius: "0px 15px 0px 0px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {guards.map((guard, index) => (
                <tr key={index} className="text-center">
                  <td className="fw-normal guard-info">
                    <img
                      src="https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E="
                      alt="Profile"
                      className="profile-image"
                    />
                    {guard.name}
                  </td>
                  <td className="fw-normal">{guard.phone}</td>
                  <td className="fw-normal">
  <span className={`badge shift-badge shift-width ${guard.shift === 'day' ? 'day-shift' : 'night-shift'}`}>
    {guard.shift === 'day' ? '🌞 Day' : '🌙 Night'}
  </span>
</td>

                  <td className="fw-normal">{guard.date}</td>
                  <td className="fw-normal">{guard.time}</td>
                  <td className="fw-normal text-center">
  {guard.gender === 'male' ? (
    <span className="badge gender-badge male-badge">
      <FaMale className="icon-margin" /> Male
    </span>
  ) : (
    <span className="badge gender-badge female-badge">
      <FaFemale className="icon-margin" /> Female
    </span>
  )}
</td>

                  <td className="fw-normal">
                    <button className="btn btn-sm edit-btn" onClick={() => handleEdit(guard)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm view-btn" onClick={() => handleView(guard)}>
                      <IoMdEye />
                    </button>
                    <button className="btn btn-sm delete-btn" onClick={() => {
                      setSelectedGuard(guard);
                      setShowDeleteModal(true);
                    }}>
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
      <div className={`modal ${showModal ? 'd-block' : 'hidden'}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Security Guard</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label d-flex align-items-center">
                    <label htmlFor="image" className="image-upload-label d-flex justify-content-center align-items-center">
                      <span>+</span>
                    </label>
                    <a href="#" className="text-decoration-none">Add Photo</a>
                  </label>
                  <input type="file" id="image" name="image" className="form-control d-none" onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label required">Full Name</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label required">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" name="phone" onChange={handleChange} required />
                </div>
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label required">Gender</label>
                    <select className="form-control select-style" id="gender" name="gender" onChange={handleChange} required>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="shift" className="form-label required">Shift</label>
                    <select className="form-control select-style" id="shift" name="shift" onChange={handleChange} required>
                      <option value="day">Day</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label required">Shift Date</label>
                    <input type="date" className="form-control" id="date" name="date" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label required">Shift Time</label>
                    <input type="time" className="form-control" id="time" name="time" onChange={handleChange} required />
                  </div>
                </div>
                <div className="file-upload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="upload-area">
                    <center>
                      <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                    </center>
                    <p><span className='img-text'>Upload a file </span> or drag and drop</p>
                    <small>PNG, JPG, GIF up to 10MB</small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn create-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* edit modal */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden={!showEditModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Guard Details</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label d-flex align-items-center">
                    <label htmlFor="image" className="image-upload-btn">
                      <span>+</span>
                    </label>
                    <a href="#" style={{ textDecoration: "none" }}> Add Photo</a>
                  </label>
                  <div className="d-flex align-items-center">
                    <input type="file" id="image" name="image" className="form-control-file d-none" onChange={handleImageChange} />
                  </div>
                </div>
                {/* Additional Fields */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {selectedGuard && (
        <div
          className={`modal fade ${showDeleteModal ? 'show' : ''}`}
          tabIndex="-1"
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
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal for viewing Security Guard details */}
      <div
        className={`modal fade ${showEditModal ? 'show' : ''}`}
        tabIndex="-1"
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
                  <label htmlFor="image" className="form-label d-flex align-items-center">
                    <label
                      htmlFor="image"
                      className="btn btn-outline-secondary d-flex justify-content-center align-items-center ms-2 m-2"
                    >
                      <span>+</span>
                    </label>
                    <a href="#"> Add Photo</a>
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
                <div className="mb-3">
                  <label className="form-label">Full Name<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newGuard.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number<span className="text-danger">*</span></label>
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
                    <label className="form-label">Gender<span className="text-danger">*</span></label>
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Shift<span className="text-danger">*</span></label>
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
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label"> Shift Date<span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={newGuard.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label"> Shift Time<span className="text-danger">*</span></label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={newGuard.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="container mt-4">
                  <label htmlFor="fileInput" className="file-upload-label">Upload Aadhar Card<span className="text-danger">*</span></label>
                  <div className="file-upload-container mt-2">
                    <label htmlFor="fileInput" className="file-upload-display">
                      <img src="https://via.placeholder.com/24" alt="file icon" />
                      <span className="file-name">Aadharcard Front Side.JPG</span>
                      <span className="file-size">3.5 MB</span>
                      <span className="file-icon">
                        <i className="bi bi-eye"></i>
                      </span>
                    </label>
                    <input type="file" id="fileInput" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>



    </div>
  );
};

export default SecurityGuard;
