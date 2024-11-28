import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // For showing success/error messages
import { CreateSecurityGuard, GetallSecurityGuards, UpdateSecurityGuard, DeleteSecurityGuard } from '../apiservices/securityservice'; // Import API functions
import { FaEdit, FaMale, FaFemale } from 'react-icons/fa';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDropzone } from 'react-dropzone';
import { IoMdEye } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';

const SecurityGuard = () => {
  const [guards, setGuards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'view'
  const [currentGuard, setCurrentGuard] = useState(null);
  const [newGuard, setNewGuard] = useState({
    fullName: '',
    MailOrPhone: '',
    shift: '',
    shiftDate: '',
    shiftTime: '',
    gender: '',
    photo: null,
    aadharCard: null,
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);

  // Check if the form is filled before submitting
  const checkFormFilled = (guard) => {
    return (
      guard.fullName.trim() !== "" &&
      guard.MailOrPhone.trim() !== "" &&
      guard.gender !== "" &&
      guard.shift !== "" &&
      guard.shiftDate !== "" &&
      guard.shiftTime !== "" &&
      guard.aadharCard !== null
    );
  };

  // Fetch all guards from the server
  const fetchGuards = async () => {
    try {
      const response = await GetallSecurityGuards();
      setGuards(response.data.records);
    } catch (error) {
      toast.error("Error fetching guards: " + error.message);
    }
  };

  // Handle add guard button click
  const handleAddGuard = () => {
    setModalMode("add");
    setNewGuard({
      fullName: '',
      MailOrPhone: '',
      shift: '',
      shiftDate: '',
      shiftTime: '',
      gender: '',
      photo: null,
      aadharCard: null,
    });
    setIsModalOpen(true);
  };

  // Handle edit guard button click
  const handleEditGuard = (guard) => {
    setModalMode("edit");
    setCurrentGuard(guard);
    setNewGuard({ ...guard });
    setIsModalOpen(true);
  };

  // Handle view guard button click
  const handleViewGuard = (guard) => {
    setModalMode("view");
    setCurrentGuard(guard);
    setIsModalOpen(true);
  };

  // Handle delete guard button click
  const handleDeleteGuard = async () => {
    try {
      await DeleteSecurityGuard(currentGuard._id);
      setGuards(guards.filter((guard) => guard._id !== currentGuard._id));
      toast.success("Guard deleted successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error deleting guard: " + error.message);
    }
  };

  // Handle saving guard (both add and edit)
  const handleSave = async () => {
    if (!isFormFilled) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      if (modalMode === "add") {
        const response = await CreateSecurityGuard(newGuard);
        setGuards([...guards, response.data]);
        toast.success("Guard added successfully");
      } else if (modalMode === "edit") {
        const response = await UpdateSecurityGuard(currentGuard._id, newGuard);
        setGuards(
          guards.map((guard) =>
            guard._id === currentGuard._id ? response.data : guard
          )
        );
        toast.success("Guard updated successfully");
      }

      // Reset the form and close the modal
      setIsModalOpen(false);
      setPhotoPreview(null);
      setAadharPreview(null);
      setNewGuard({
        fullName: '',
        MailOrPhone: '',
        shift: '',
        shiftDate: '',
        shiftTime: '',
        gender: '',
        photo: null,
        aadharCard: null,
      });
    } catch (error) {
      toast.error("Error saving guard: " + error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/gif',
    maxSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  // Handle file upload for photo and aadhar card
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "photo") {
          setPhotoPreview(reader.result);
          setNewGuard({ ...newGuard, photo: file });
        } else if (type === "aadharCard") {
          setAadharPreview(reader.result);
          setNewGuard({ ...newGuard, aadharCard: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form field change
  const handleFieldChange = (field, value) => {
    const updatedGuard = { ...newGuard, [field]: value };
    setNewGuard(updatedGuard);
    setIsFormFilled(checkFormFilled(updatedGuard));
  };

  useEffect(() => {
    fetchGuards();
  }, []);

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
                  <button className="btn btn-sm edit-btn" onClick={() => handleEditGuard(guard)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm view-btn" onClick={() => handleViewGuard(guard)}>
                    <IoMdEye />
                  </button>
                  <button className="btn btn-sm delete-btn" onClick={() => {
                    setSelectedGuard(guard);
                    handleDeleteGuard(true);
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
          <form onSubmit={handleSave}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="photo" className="form-label d-flex align-items-center">
                  <label htmlFor="photo" className="image-upload-label d-flex justify-content-center align-items-center">
                    <span>+</span>
                  </label>
                  <a href="#" className="text-decoration-none">Add Photo</a>
                </label>
                <input type="file" id="photo" name="photo" className="form-control d-none"  onChange={(e) => handleFileUpload(e, "photo")} />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label required">Full Name</label>
                <input type="text" className="form-control" id="fullName" name="fullName" value={newGuard.fullName}
                      onChange={(e) =>
                        handleFieldChange("fullName", e.target.value)
                      } required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label required">Phone Number</label>
                <input type="tel" className="form-control" id="MailOrPhone" name="MailOrPhone"value={newGuard.MailOrPhone}
                      onChange={(e) =>
                        handleFieldChange("MailOrPhone", e.target.value)
                      } required />
              </div>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label required">Gender</label>
                  <select className="form-control select-style" id="gender" name="gender" value={newGuard.gender}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      } required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="shift" className="form-label required">Shift</label>
                  <select className="form-control select-style" id="shift" name="shift" value={newGuard.shift}
                      onChange={(e) =>
                        handleFieldChange("shift", e.target.value)
                      } required>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label required">Shift Date</label>
                  <input type="date" className="form-control" id="shiftDate" name="shiftDate" defaultValue={
                            currentGuard?.shiftDate
                              ? new Date(currentGuard.shiftDate)
                                .toISOString()
                                .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleFieldChange("shiftDate", e.target.value)
                          } required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label required">Shift Time</label>
                  <input type="time" className="form-control" id="shiftTime" name="shiftTime" value={newGuard.shiftTime}
                          onChange={(e) =>
                            handleFieldChange("shiftTime", e.target.value)
                          } required />
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
              <button type="button" className="btn cancel-btn p-3 mx-1"style={{width:"45%"}} onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn cancel-btn p-3 create-btn"style={{width:"45%"}} >Create</button>

             
            </div>
          </form>
        </div>
      </div>
    </div>

    

  </div>
  );
};

export default SecurityGuard;
