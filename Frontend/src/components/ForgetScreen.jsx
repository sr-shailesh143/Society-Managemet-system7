import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import useForm from "/src/hooks/useForm";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GetOtp } from '../apiservices/Authentication';


export default function ForgetScreen() {
    const navigate = useNavigate();

    const { errors } = useForm(
        {EmailOrPhone : ""},
    )

    const [EmailOrPhone, setEmailOrPhone] = useState("");

    const handleSendOtp = async () => {
      try {
        const response = await GetOtp({ EmailOrPhone });
        localStorage.setItem("EmailOrPhone", EmailOrPhone);
        toast.success(response.data.message);
        navigate("/otp");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setEmailOrPhone("");
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
                                name="EmailOrPhone"
                                type="text"
                                value={EmailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className='form-control radious p-3 mt-2'
                                placeholder="Enter your email"
                               
                            />
                            {errors.EmailOrPhone && <p style={{ color: "red" }}>{errors.EmailOrPhone}</p>}
                        </div>

                        <div className="col-12 mt-3 mb-3">
                            <button
                                onClick={handleSendOtp}
                                className='btn text-white radious l-btn w-100 p-3'
                                disabled={!EmailOrPhone || errors.EmailOrPhone}
                            >
                                Get OTP
                            </button>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <Link to={'/'} className='text-decoration-none'>
                                <span className='text-danger' style={{ cursor: "pointer" }}>Back to Login</span>
                            </Link>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
}
