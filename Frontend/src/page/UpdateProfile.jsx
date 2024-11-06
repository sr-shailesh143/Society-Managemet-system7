import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const naviget = useNavigate()
  const [profile, setProfile] = useState({
    firstName: 'Arlene',
    lastName: 'McCoy',
    phoneNumber: '+91 99130 44537',
    email: 'you@example.com',
    society: 'Shantigram residency',
    country: 'India',
    state: 'Gujarat',
    city: 'Baroda',
  });



 

  return (
    <>
    <div className="d-flex justify-content-between">

      <h2>Edit Profile</h2>
      
      
      <button onClick={()=>naviget("/profileupdate")} className='l-btn p-2 text-white btn mx-1'><span className='mx-2 mb-1'><FaEdit/></span> Edit Profile</button>
      
    </div>
    <div className="profile-page mt-2">
      <div className="row profile ">
        <div className="col-12 col-md-3 profile-img">
        <div className="profile-picture-section d-block">
            <center>
            <img
          src="/src/assets/Profile.png"
          alt="Profile"
          className=""
        />
            </center>
       
        <p className="profile-name text-center">{profile.firstName} {profile.lastName}</p>
      </div>
        </div>
        <div className="col-12 col-md-8 profile-input ">
        <form  className="profile-form">
        <div className="form-row">
          <label>
            First Name*
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              required
            />
          </label>
          <label>
            Last Name*
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Phone Number*
            <input
              type="tel"
              name="phoneNumber"
              value={profile.phoneNumber}
              required
            />
          </label>
          <label>
            Email Address*
            <input
              type="email"
              name="email"
              value={profile.email}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Select Society*
            <input
              type="text"
              name="society"
              value={profile.society}
              required
            />
          </label>
          <label>
            Country*
            <input
              type="text"
              name="country"
              value={profile.country}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            State*
            <input
              type="text"
              name="state"
              value={profile.state}
              required
            />
          </label>
          <label>
            City*
            <input
              type="text"
              name="city"
              value={profile.city}
              required
            />
          </label>
        </div>
      </form>   
        </div>
      </div>

      
    </div>
    </>
  );
};

export default UpdateProfile;
