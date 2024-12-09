import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { createProfile, getProfiles, updateProfile } from "../apiservices/profileservice";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    selectSociety: "",
    country: "",
    state: "",
    city: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [profiles, setProfiles] = useState([]);

 
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getProfiles();
        setProfiles(response.data);
      
        if (response.data && response.data.length > 0) {
          const profile = response.data[0]; 
          setFormData(profile);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const fields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Phone Number", name: "phoneNumber", type: "tel" },
    { label: "Email Address", name: "emailAddress", type: "email" },
    { label: "Select Society", name: "selectSociety", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "City", name: "city", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false);
   
    const profile = profiles[0];  
    setFormData(profile);
    setSelectedImage(null); 
  };

  const handleSave = async () => {
    setIsEditing(false);
  
   
    const formDataToSubmit = new FormData();
  
   
    for (let key in formData) {
      if (key !== "image") {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
   
    if (formData.image && formData.image instanceof File) {
      formDataToSubmit.append("image", formData.image); 
    }
  
    try {
     
      if (formData._id) {
        await updateProfile(formData._id, formDataToSubmit);  
      } else {
        await createProfile(formDataToSubmit);  
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      
      setSelectedImage(URL.createObjectURL(file)); 
      setFormData({ ...formData, image: file });   
    } else {
   
      setFormData({ ...formData, image: null });
    }
  };
  
  

  return (
    <div className="container-fluid" style={{ position: "relative" }}>
      <div className="bg-profile">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0 fw-bold">{isEditing ? "Edit Profile" : "Profile"}</h1>
          {!isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
              style={{
                background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                border: "none",
                color: "white",
              }}
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
        <div className="card shadow p-4">
          <div className="row align-items-center">
            <div
              className="col-12 col-md-4 text-center mb-3 mb-md-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "10px",
                padding: "20px",
                position: "relative",
                top: "-25px",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={selectedImage || formData.image || "src/assets/Avatar.png"}  // Show the selected image or existing image
                  alt="Profile"
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    border: "4px solid white",
                    width: "150px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                  }}
                />
                {isEditing && (
                  <label
                    htmlFor="imageUpload"
                    style={{
                      position: "absolute",
                      textAlign: "center",
                      justifyContent: "center",
                      right: "-5px",
                      top: "90px",
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "5px",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    <FaEdit size={18} style={{ color: "black" }} />
                  </label>
                )}
              </div>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
              <h4 className="text-dark mt-3">{`${formData.firstName} ${formData.lastName}`}</h4>
            </div>

            <div className="col-12 col-md-8" style={{ zIndex: 2 }}>
              {!isEditing ? (
                <div>
                  <div className="row">
                    {fields.map((field) => (
                      <div className="col-12 col-md-6 mb-3" key={field.name}>
                        <label className="form-label">
                          {field.label} <span className="text-danger">*</span>
                        </label>
                        <p className="form-control-plaintext border p-2 rounded">
                          {formData[field.name]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form>
                  <div className="row">
                    {fields.map((field) => (
                      <div className="col-12 col-md-6 mb-3" key={field.name}>
                        <label className="form-label">
                          {field.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          className="form-control"
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          style={{
                            border: "2px solid grey",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-end mt-4">
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={handleSave}
                      style={{
                        background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)",
                        border: "none",
                        color: "white",
                      }}
                    >
                      Update Profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
