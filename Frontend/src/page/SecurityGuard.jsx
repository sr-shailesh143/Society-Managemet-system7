import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaFemale, FaMale } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../index.css';
import { CreateSecurityGuard, GetallSecurityGuards,  DeleteSecurityGuard, UpdateSecurityGuard } from '../apiservices/securityservice'; // Import the API functions

const SecurityGuard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newGuard, setNewGuard] = useState({
    fullName: '',
    MailOrPhone: '',
    shift: '',
    shiftDate: '',
    shiftTime: '',
    gender: '',
    photo: '',
    aadharCard: '',
  });
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [guards, setGuards] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGuard({ ...newGuard, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateSecurityGuard(newGuard); // Call the CreateSecurityGuard API function
    setGuards([...guards, response.data]); // Add the new guard to the state
    setShowModal(false);
    setNewGuard({ fullName: '', MailOrPhone: '', shift: '', shiftDate: '', shiftTime: '', gender: '',photo:'',aadharCard:'' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await UpdateSecurityGuard(selectedGuard.id, newGuard); // Call the UpdateSecurityGuard API function
    setGuards(guards.map((guard) => (guard === selectedGuard ? response.data : guard)));
    setShowEditModal(false);
    setSelectedGuard(null);
    setNewGuard({ fullName: '', MailOrPhone: '', shift: '', shiftDate: '', shiftTime: '', gender: '',photo:'',aadharCard:'' });
  };

  const handleView = (guard) => {
    setSelectedGuard(guard);
    setShowViewModal(true);
  };

  const handleEdit = (guard) => {
    setSelectedGuard(guard);
    setNewGuard(guard);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    await DeleteSecurityGuard(selectedGuard._id); // Call the DeleteSecurityGuard API function
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await GetallSecurityGuards();
      // Check if response data has a records array
      if (response.data && Array.isArray(response.data.records)) {
        setGuards(response.data.records);
      } else {
        console.error("Expected an array in records but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Fetch all security guards on component mount
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await GetallSecurityGuards();
  //     setGuards(response.data);
  //   };
  //   fetchData();
  // }, []);

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
                  {guard.fullName}
                </td>
                <td className="fw-normal">{guard.MailOrPhone}</td>
                <td className="fw-normal">
<span className={`badge shift-badge shift-width ${guard.shift === 'day' ? 'day-shift' : 'night-shift'}`}>
  {guard.shift === 'day' ? '🌞 Day' : '🌙 Night'}
</span>
</td>

                <td className="fw-normal">{guard.shiftDate}</td>
                <td className="fw-normal">{guard.shiftTime}</td>
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
                <label htmlFor="photo" className="form-label d-flex align-items-center">
                  <label htmlFor="photo" className="image-upload-label d-flex justify-content-center align-items-center">
                    <span>+</span>
                  </label>
                  <a href="#" className="text-decoration-none">Add Photo</a>
                </label>
                <input type="file" id="photo" name="photo" className="form-control d-none" onChange={handleImageChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label required">Full Name</label>
                <input type="text" className="form-control" id="fullName" name="fullName" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label required">Phone Number</label>
                <input type="tel" className="form-control" id="MailOrPhone" name="MailOrPhone" onChange={handleChange} required />
              </div>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label required">Gender</label>
                  <select className="form-control select-style" id="gender" name="gender" onChange={handleChange} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="shift" className="form-label required">Shift</label>
                  <select className="form-control select-style" id="shift" name="shift" onChange={handleChange} required>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label required">Shift Date</label>
                  <input type="date" className="form-control" id="shiftDate" name="shiftDate" onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label required">Shift Time</label>
                  <input type="time" className="form-control" id="shiftTime" name="shiftTime" onChange={handleChange} required />
                </div>
              </div>
              <div className="file-upload" {...getRootProps()}>
                <input {...getInputProps()} id="aadharCard" name="aadharCard"/>
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
      style={{
        display: showViewModal ? 'block' : 'none',
        backgroundColor: showViewModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
      }}
      aria-labelledby="viewModalLabel"
      aria-hidden={!showViewModal}
    >
      <div className="modal-dialog modal-sm" style={{ maxWidth: '400px' }}>
        <div className="modal-content" style={{ borderRadius: '12px' }}>
          <div className="modal-header">
            <h5 className="modal-title" id="viewModalLabel">View Security Guard</h5>
          </div>
          <div className="modal-body" style={{ padding: '10px 20px' }}>
            {selectedGuard && (
              <>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E="
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
                  />
                  <div>
                    <strong>{selectedGuard.name}</strong>
                    <p style={{ fontSize: '12px', margin: '0', color: 'grey' }}>{selectedGuard.date}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between text-center" style={{ marginBottom: '10px' }}>
                  <div>
                    <p><strong>Shift</strong></p>
                    <p>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          borderRadius: '30px',
                          backgroundColor: selectedGuard.shift === 'day' ? 'lightgrey' : '#4F4F4F',
                          color: selectedGuard.shift === 'day' ? '#FFD700' : '#FFF'
                        }}
                      >
                        {selectedGuard.shift === 'day' ? '🌞 Day' : '🌙 Night'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p><strong >Shift Time</strong></p>
                    <p style={{ background: "lightgrey", borderRadius: "30px" }}>{selectedGuard.time}</p>
                  </div>
                  <div>
                    <p><strong>Gender</strong></p>
                    <p>
                      <span
                        className="badge d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: selectedGuard.gender === 'male' ? '#D8F8F8' : '#FFE5EB',
                          color: '#000',
                          width: '113px',
                          textAlign: 'center',
                          padding: '5px',
                          borderRadius: '30px'
                        }}
                      >
                        {selectedGuard.gender === 'male' ? (
                          <>
                            <FaMale style={{ marginRight: '5px' }} />
                            Male
                          </>
                        ) : (
                          <>
                            <FaFemale style={{ marginRight: '5px' }} />
                            Female
                          </>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowViewModal(false)}
              style={{ backgroundColor: 'lightgrey', border: 'none' }}
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