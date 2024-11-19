import React, { useState } from 'react';
// import './ProfilePage.css';

const ProfilePage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile Updated!');
  };
  const [photo, setPhoto] = useState(null);

  return (
    <>
        {/* <div className='backgraound-img'>
          dfwedwed
        </div> */}
      {/* <p className='text-black fw-bold '>Edit Profile</p> */}
      <div className="profile-page w-75  ">
        <div className="row profile ">
          <div className="col-12 col-md-3 profile-img">
            <div className="profile-picture-section d-block">
              <center>
                <label className="photo-upload mt-2 ">
                  <img src="/src/assets/addprofile.png " alt="" />
                  <input type="file" accept="image/*" />
                  <div className="photo-preview text-center mt-4 profil-text" style={{ backgroundImage: `url(${photo || ''})` }}>
                    {!photo && <span className="camera-icon text-center mt-5">Add Photo</span>}
                  </div>
                </label>
              </center>

              <p className="profile-name text-center">{profile.firstName} {profile.lastName}</p>
            </div>
          </div>
          <div className="col-12 col-md-8 profile-input ">
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <label>
                  First Name*
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Last Name*
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email Address*
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Country*
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  City*
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </form>
            <button type="submit" className="update-button l-btn">Update Profile</button>
          </div>
        </div>


      </div>
    </>
  );
};

export default ProfilePage;
