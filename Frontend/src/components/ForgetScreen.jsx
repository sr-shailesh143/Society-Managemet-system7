import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import useForm from "/src/hooks/useForm";


export default function ForgetScreen() {
    const navigate = useNavigate();

    // Define validation function for email
    const validate = (name, value) => {
        if (name === "Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? "" : "Please enter a valid email address.";
        }
        return "";
    };

    // Initialize useForm with initial values and validation function
    const { values, errors, handleChange } = useForm(
        { Email: "" },
        validate
    );

    const handleSendOtp = () => {
        if (!values.Email || errors.Email) {
            alert("Please enter a valid email before proceeding.");
            return;
        }
        try {
            navigate("/otp");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className="col-12 d-sm-block d-md-none mt-5 text-center">
                <img className='w-50 h-50 img-fluid mb-5' src="src/assets/Logo.png" alt="Logo" />
            </div>
            <div className="row container-img">

                <div className="col-12 col-md-6 d-none d-md-block bg-color">
                    <div className="logo">
                        <img className='w-25 h-25 mt-5 ms-4' src="src/assets/Logo.png" alt="Logo" />
                    </div>
                    <div className="mailImg mt-4 text-center">
                        <img  className="img-fluid mt-4" style={{ width: "100%", maxWidth: "507px", height: "auto"  ,position:"sticky"}} src="src/assets/forget-img.png" alt="Forget" />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center">
                    <from className="from1 row mb-5 mt-5 p-3">
                        <div className="col-12 d-sm-block d-md-none mb-4 text-center">
                            <img style={{ height: "332.99px", width: "355.11px" }} className='img-fluid' src="src/assets/forget-img.png" alt="Forget" />
                        </div>

                        <h3 className='mt-5 mb-4'>Forget Password</h3>
                        <p className='text-center'>Enter your email and we'll send you an OTP to reset your password</p>

                        <div className="col-12 mt-3 mb-2 ">
                            <label style={{ fontWeight: "500" }} htmlFor="email">
                                Email <span className='text-danger'>*</span>
                            </label>
                            <input
                                id="email"
                                name="Email"
                                type="text"
                                onChange={handleChange}
                                className='form-control radious p-3 mt-2'
                                placeholder="Enter your email"
                                value={values.Email}
                            />
                            {errors.Email && <p style={{ color: "red" }}>{errors.Email}</p>}
                        </div>

                        <div className="col-12 mt-3 mb-3">
                            <button
                                onClick={handleSendOtp}
                                className='btn text-white radious l-btn w-100 p-3'
                                disabled={!values.Email || errors.Email}
                            >
                                Get OTP
                            </button>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <Link to={'/login'} className='text-decoration-none'>
                                <span className='text-danger' style={{ cursor: "pointer" }}>Back to Login</span>
                            </Link>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
}
