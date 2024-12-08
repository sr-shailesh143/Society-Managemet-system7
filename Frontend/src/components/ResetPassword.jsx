import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetpass } from '../apiservices/Authentication';
import toast from 'react-hot-toast';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [newPassword, setnewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleToggleNewPasswordVisibility = () => {
      setShowNewPassword((show) => !show);
    };
    
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((show) => !show);
    };

    const [errors] = useState({
        newPassword: "",
        confirmPassword: ""
    });
  
    const setNewPassword = async () => {
      const email = localStorage.getItem("EmailOrPhone");
      try {
        const response = await resetpass({ newPassword, confirmPassword, email });
        toast.success(response.data.message);
        localStorage.clear("EmailOrPhone");
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setnewPassword("");
        setconfirmPassword("");
      }
    };

    return (
        <div className='container-fluid'>
            <div className="col-12 d-block d-md-none mt-5 text-center">
                <img className='w-50 h-50 img-fluid mb-5' src="src/assets/Logo.png" alt="Logo" />
            </div>
            <div className="row container-img">
                {/* Logo for small screens */}

                {/* Left section for larger screens */}
                <div className="col-12 col-md-6 d-none d-md-block bg-color">
                    <div className="logo mt-3 ">
                        <img className='w-25 h-25 mt-4 ms-4' src="src/assets/Logo.png" alt="Logo" />
                    </div>
                    <div className="mailImg  text-center">
                        <img className="img-fluid mt-5" style={{ width: "100%", maxWidth: "507px", height: "auto" }} src="src/assets/forget-img.png" alt="Forget" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="col-12  col-md-6 mt-5 d-flex justify-content-center align-items-center">
                    <from className="from1 row mt-5 mb-5 p-3">
                        {/* Image for smaller screens */}
                        <div className="col-12 d-sm-block  d-md-none mb-4 text-center">
                            <img style={{ height: "332.99px", width: "355.11px" }} className='img-fluid' src="src/assets/forget-img.png" alt="Forget" />
                        </div>

                        {/* Form Title */}
                        <h3 className='mt-4 mb-4'>Reset Password</h3>

                        {/* New Password Input Field */}
                        <div className="col-12 mt-3 mb-3 form-c">
                            <label style={{ fontWeight: "500" }} htmlFor="newPassword">
                                New Password <span className='text-danger'>*</span>
                            </label>
                            <input
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                                className='form-control radious p-3 mt-2'
                                placeholder="Enter your new password"
                            />
                            <span
                                className="input-group-text show-password"
                                onClick={handleToggleNewPasswordVisibility}
                                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                            >
                                <i className={`fas ${showNewPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                            <br />
                            {errors.showNewPassword && <small className="text-danger ">{errors.showNewPassword}</small>}
                        </div>

                        {/* Confirm Password Input Field */}
                        <div className="col-12 mt-3 mb-3 form-c">
                            <label style={{ fontWeight: "500" }} htmlFor="confirmPassword">
                                Confirm Password <span className='text-danger'>*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                 value={confirmPassword}
                                className='form-control radious p-3 mt-2'
                                placeholder="Confirm your password"
                                onChange={(e) => setconfirmPassword(e.target.value)}
                            />
                             <span
                                className="input-group-text show-password"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                            <br />
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </div>

                        {/* Submit Button */}
                        <div className="col-12  mt-3">
                            <button disabled={!newPassword || !confirmPassword} onClick={setNewPassword} className='btn text-white l-btn w-100 p-3'>
                                Reset Password
                            </button>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
}
