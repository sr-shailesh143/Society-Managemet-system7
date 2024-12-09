import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetOtp, Otpverification } from '../apiservices/Authentication';
import toast from 'react-hot-toast';
import logo from "../assets/Logo.png"
import side_Logout from "../assets/forget-img.png"

const Button = styled.button`
  width: 100%;
  padding: 10px;
    background: linear-gradient(90deg, #FE512E 0%, #F09619 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff8c42;
  }

  &:disabled {
    background-color: black;
    cursor: not-allowed;
  }
`;

const OTPInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  input {
    width: 45px;
    height: 45px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
  }
`;

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
   
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtp = async () => {
    try {
      const OTP = otp.join("");  // Join OTP as a string
      const EmailOrPhone = localStorage.getItem("EmailOrPhone");
  
      if (!OTP || !EmailOrPhone) {
        throw new Error("Missing OTP or Email/Phone");
      }
  
      const otpDetail = { otp: OTP, EmailOrPhone: EmailOrPhone };
  
      const response = await Otpverification(otpDetail);
      toast.success(response.data.message);
      navigate("/resetpassword");
    } catch (error) {
  
      // error handling and message
      if (error.response) {
        toast.error(error.response?.data?.message || "Error verifying OTP");
      } else {
        toast.error("Unknown error occurred.");
      }
    }
  };
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOtp = async () => {
    try {
      const EmailOrPhone = localStorage.getItem("EmailOrPhone");
      const response = await GetOtp({ EmailOrPhone });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    }
  };

  // Check if all OTP fields are filled
  const isButtonDisabled = otp.some(value => value === "");

  return (
    <div className='container-fluid'>
      <div className="col-12 d-sm-block d-md-none  text-center">
        <img className='w-50 mt-5 h-50 img-fluid' src={logo} alt="Logo" />
      </div>
      <div className="row container-img">
        <div className="col-12 col-md-6 d-none d-md-block bg-color">
          <div className="logo mt-4 ms-3 ">
            <img className='w-25 h-25 ms-4' src={logo} alt="Logo" />
          </div>
          <div className="mailImg  text-center">
            <img className="img-fluid mt-5" style={{ width: "100%", maxWidth: "507px", height: "auto" }} src={side_Logout} alt="Forget" />
          </div>
        </div>

        <div className="col-12  mt-5 col-md-6 mb-5 d-flex justify-content-center align-items-center">
          <div className="from1 row mt-5  row mb-5 p-5">
            <img className='d-sm-block d-md-none' src={side_Logout} alt="" />
            <h2>Enter OTP</h2>
            <p>Please enter the 6-digit code sent to your phone number.</p>
            <form className=''>
              <OTPInput>
                {otp.map((Number, index) => (
                  <input
                   key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    maxLength="1"
                    value={Number}
                    className='radious'
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </OTPInput>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="col-12 d-flex justify-content-between">
                <div className="time">
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      <span><i className="fa-regular fa-clock"></i> </span>
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds} sec
                    </p>
                  ) : (
                    <p>Didn't receive code?</p>
                  )}
                </div>
                <div className="resend">
                  <span
                    disabled={seconds > 0 || minutes > 0}
                    style={{
                      color: seconds > 0 ? "gray" : "red",
                      cursor: "pointer"
                    }}
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </span>
                </div>
              </div>
            </form>
            <Button
              disabled={isButtonDisabled}
              className='mt-4 text-light  radious p-3'
              onClick={handleOtp}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
