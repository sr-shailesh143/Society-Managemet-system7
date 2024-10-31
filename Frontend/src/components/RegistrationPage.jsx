import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import img from '../assets/img.png';

function RegistrationPage() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [societies, setSocieties] = useState([]);
  const [societyName, setSocietyName] = useState('');
  const [societyAddress, setSocietyAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const onSubmit = (data) => {
    if (!isAgreed) {
      alert('You must agree to the terms and conditions to register.');
      return;
    }
    console.log(data);
    navigate('/deshbord');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setValue('society', '');
  };

  const handleCreateSociety = () => {
    const newSociety = {
      name: societyName,
      address: societyAddress,
      country,
      state,
      city,
      zipCode,
    };
    setSocieties([...societies, newSociety]);
    console.log("New Society Created:", newSociety);


    setSocietyName('');
    setSocietyAddress('');
    setCountry('');
    setState('');
    setCity('');
    setZipCode('');

    handleCloseModal();
  };

  return (
    <div className="registration-container">

      <div className="left-section">
        <div className="content text-center" style={{ marginTop: "60px" }}>
          <h1 className="logo-text text-start" style={{ color: '#F48020', paddingLeft: "50px" }}>Dash<span style={{ color: 'black' }}>Stack</span></h1>
          <div className="image-container">
            <img src={img} alt="Logo" className="img-fluid" style={{ width: "668px", height: "622px" }} /> {/* Use the imported image */}
          </div>
        </div>
      </div>


      <div className="form-section">
        <div className="form-wrapper">
          <h2 style={{ color: "black" }} className='text-start m-3'>Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Enter First Name"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Enter Last Name"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter Email Address"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="Enter Phone Number"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Country</label>
                <input
                  type="text"
                  className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                  placeholder="Enter Country"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('country', { required: 'Country is required' })}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {errors.country && <p className="text-danger">{errors.country.message}</p>}
              </div>

              <div className="col-md-4 mb-3">
                <label>State</label>
                <input
                  type="text"
                  className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                  placeholder="Enter State"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('state', { required: 'State is required' })}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                {errors.state && <p className="text-danger">{errors.state.message}</p>}
              </div>

              <div className="col-md-4 mb-3">
                <label>City</label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="Enter City"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('city', { required: 'City is required' })}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <p className="text-danger">{errors.city.message}</p>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="selectSociety" className="form-label">Select Society</label>
              <select
                className={`form-select ${errors.society ? 'is-invalid' : ''}`}
                id="selectSociety"
                {...register('society', { required: 'Please select a society' })}
                onChange={(e) => {
                  if (e.target.value === 'create') {
                    setShowModal(true);
                  }
                }}
              >
                <option value="">Choose a society...</option>
                {societies.map((society, index) => (
                  <option key={index} value={society.name}>
                    {society.name}
                  </option>
                ))}
                <option value="">Arice western</option>
                <option value="">Escon</option>
                <option value="">Keishna Tounship</option>

                <option value="create" className="gradient-option" style={{ color: "white", fontSize: "20px", backgroundColor: "#FE512E" }}>Create a new society</option>
              </select>
              {errors.society && <p className="text-danger">{errors.society.message}</p>}
            </div>

            <div className=" mb-3">
              <label>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter Password"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('password', { required: 'Password is required' })}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>

            <div className=" mb-3">
              <label>Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm Password"
                  style={{ borderRadius: "15px", border: "1px solid #D3D3D3" }}
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => value === watch('password') || "Passwords do not match",
                  })}
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
              {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
            </div>


            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the terms and <span className='text-danger'> privacy policeis</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn"
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #F09619, #FE512E)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer"
              }}
            
            >
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>Already have an account?<span className='text-danger'>Login</span> </Link>
          </div>
        </div>
      </div>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Society Name</label>
            <input
              type="text"
              className="form-control"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Society Address</label>
            <input
              type="text"
              className="form-control"
              value={societyAddress}
              onChange={(e) => setSocietyAddress(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>ZIP Code</label>
            <input
              type="text"
              className="form-control"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateSociety}>
            Create Society
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegistrationPage;
