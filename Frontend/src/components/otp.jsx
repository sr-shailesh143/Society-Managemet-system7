import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff8c42;
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
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [validOTP, setValidOTP] = useState("123456"); // Expected OTP for validation
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const naviget = useNavigate()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP !== validOTP) {
      setError("Invalid OTP. Please try again.");
    } else {
      setError("");
      naviget("/resetpassword")
      // alert("OTP Verified Successfully!");
    
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

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(59);
  };

  return (
    <div className='container-fluid'>
        <div className="col-12   d-sm-block d-md-none mt-5  text-center">
          <img className='w-50 mt-5 h-50 img-fluid ' src="src/assets/Logo.png" alt="Logo" />
        </div>
      <div className="row container-img">

        <div className="col-12 col-md-6 d-none d-md-block bg-color">
          <div className="logo mt-5">
            <img className='w-25 h-25  ms-4' src="src/assets/Logo.png" alt="Logo" />
          </div>
          <div className="mailImg text-center">
            <img className="img-fluid" style={{ width: "100%", maxWidth: "507px", height: "auto" }} src="src/assets/forget-img.png" alt="Forget" />
          </div>
        </div>

        <div className="col-12 col-md-6 mb-5 d-flex justify-content-center align-items-center">
          
          <div className="from1 row mb-5 p-5">
            <img className='d-sm-block d-md-none' src="src/assets/forget-img.png" alt="" />
            <h2>Enter OTP</h2>
            <p>Please enter the 6-digit code sent to your phone number.</p>
            <form>

            <OTPInput>
              {otp.map((data, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  className='radious'
                  onChange={(e) => handleChange(e.target, index)}
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
                  onClick={resendOTP}
                >
                  Resend OTP
                </span>
              </div>
            </div>

            </form>
            <button className='mt-4 text-light l-btn radious p-3' onClick={handleSubmit}>Verify</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
