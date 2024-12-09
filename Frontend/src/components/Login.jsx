import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useForm from "/src/hooks/useForm";
import { login } from '../apiservices/Authentication';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { StoreUser } from '../redux/authslice';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";


export default function Login() {
    const { errors, handleError, clearError } = useForm({
        EmailOrPhone: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        EmailOrPhone: "",
        password: "",
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            
            const defaultCredentials = [
                { email: "resident@society.com", password: "Resident@123", role: "user", redirectUrl: "/ResidentManageMent" },
                { email: "security@society.com", password: "Security@123", role: "security", redirectUrl: "/VisitorTracking" },
            ];
    
     
            const matchedDefault = defaultCredentials.find(
                (cred) => cred.email === user.EmailOrPhone && cred.password === user.password
            );
    
            if (matchedDefault) {
             
                user.password = matchedDefault.password;  
    
             
                const response = await login(user);
    
                toast.success(response.data.message);
                dispatch(StoreUser(response.data.user));
                navigate(matchedDefault.redirectUrl); 
            } else {
            
                const response = await login(user);
    
                toast.success(response.data.message);
                dispatch(StoreUser(response.data.user));
                navigate("/deshbord"); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setUser({
                EmailOrPhone: "",
                password: "",
            });
        }
    };

    return (
        <div className='container-fluid container-img ' >
            <div className="col-12 d-sm-block d-md-none   text-center">
                <img className='w-70 h-50 img-fluid mt-5 ' src="src/assets/Logo.png" alt="Logo" />
            </div>
            <div className="row d-flex gap-5">
                <div className="col-12 col-md-6 d-none d-md-flex bg-color justify-content-center align-items-center">
                    <div>
                        <img style={{ width: "230px", marginLeft: "-100px", marginTop: "-80px" }} className='' src="src/assets/Logo.png" alt="Logo" />
                        <div className="mailImg mt-5 text-center">
                            <img style={{ width: "507px", height: "491px", position: "sticky" }} src="src/assets/sideIMG.png" alt="Logo" className="img-fluid mt-3" />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-5   d-flex  align-items-center"style={{width:"630px",}}>
                    <form className="form-container from container radious border p-4" onSubmit={handleLogin} noValidate>
                        <div className="row">
                            <div className="col-12 d-sm-block d-md-none mt-5 text-center">
                                <img className='w-75 h-75 img-fluid mb-5' src="src/assets/sideIMG.png" alt="Logo" />
                            </div>

                            <div className="col-12 mt-3">
                                <h2 className='mt-3'>Login</h2>
                                <label htmlFor="email" style={{ fontWeight: "500" }}>
                                    Email or Phone <span className='text-danger'>*</span>
                                </label>
                                <input
                                    id="email"
                                    name="EmailOrPhone"
                                    type="text"
                                    className='form-control  p-3 mt-2 input-redious'
                                    placeholder="Enter your email or phone"
                                    value={user.EmailOrPhone}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>

                            <div className="col-12 mt-3 from-c">
                                <label htmlFor="password" style={{ fontWeight: "500" }}>
                                    Password <span className='text-danger'>*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control  p-3 mt-2 input-redious'
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                <span
                                    className="hide"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                                >
                                   
                                   {showPassword ? <FaEye  className='fs-4' /> :<FaEyeSlash className='fs-4'/>}
                                </span>
                                    <span
                                        className="hide1"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none',zIndex:"999" }}
                                    >
                                        {showPassword ? <FaEye  className='fs-4' /> :<FaEyeSlash className='fs-4'/>}
                                    </span>
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>

                            <div className="col-12 mt-3 d-flex justify-content-between">
                                <div className="form-check  d-flex gap-2  ">
                                    <input
                                        type="checkbox"
                                        className='form-check-input'
                                        id="rememberMe"
                                    />
                                    <label htmlFor="rememberMe" className='form-check-label  ' style={{ color: "gray" }}>
                                        Remember me
                                    </label>
                                </div>
                                <Link to="/forget" className='text-decoration-none text-danger' style={{ cursor: "pointer" }}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="col-12 mt-3">
                                <button disabled={!user.EmailOrPhone || !user.password} type="submit" className='btn text-white l-btn w-100 p-3'>
                                    Sign In
                                </button>
                            </div>

                            <div className="col-12 text-center mt-3">
                                <p style={{ textDecoration: "none" }}>
                                    Don't have an account? <Link to={"/Registration"} className='text-danger text-decoretion' style={{ cursor: "pointer" }}>Register</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
