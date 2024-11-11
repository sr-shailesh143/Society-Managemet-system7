import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Owner() {
    const location = useLocation()
    const [selectedOption, setSelectedOption] = useState("Male");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    return (
        <>
            <div className='row'>
                <div className="d-flex ">
                    <div style={{ background: location.pathname === "/owner" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/owner" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p>Owner</p>
                    </div>
                    <div style={{ background: location.pathname === "/tenant" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/tenant" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p>Tenant</p>
                    </div>
                </div>
            </div>
            <div className=" bg-white section-1 ">
                <div className="row d-flex">
                    <div style={{ width: "13%" }} className="col-12 col-md-1 p-3 ">
                        <img src="/src/assets/Avatar.png " alt="" />
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row  ">
                            <div className="col-12 col-md-4">
                                <label html="" className='labal-name'>Full Name <span className='text-danger1'>*</span></label>
                                <input className='input-style' placeholder='Enter Full Name' type="text" />
                            </div>
                            <div className="col-12 col-md-4">
                                <label html="" className='labal-name'>Phone Number<span className='text-danger1'>*</span></label>
                                <input className='input-style' type="text" placeholder='+91' />
                            </div>
                            <div className="col-12 col-md-4">
                                <label html="" className='labal-name'>Email Address</label>
                                <input className='input-style' placeholder='Enter Email Address' type="text" />
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-md-2">
                                <label htmlFor="" className='labal-name'>
                                    Age <span className='text-danger1'>*</span>
                                </label>
                                <input type="text" placeholder='Enter Age' className='input-section-2 ' />
                            </div>
                            <div className="col-12 col-md-3 mt-1">
                                <div style={{border:"none"}} className="custom-dropdown  ">
                                    <label className=" labal-name">Gender<span className="required">*</span></label>
                                    <div
                                        className="dropdown-header input-style"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {selectedOption}
                                      
                                    </div>

                                    {isOpen && (
                                        <div className="dropdown-options input-style">
                                            {["Male", "Female", "Other"].map((option) => (
                                                <div
                                                    key={option}
                                                    className={`dropdown-option  ${selectedOption === option ? "selected" : ""}`}
                                                    onClick={() => handleSelect(option)}
                                                >
                                                    <span className="radio-icon">
                                                        {selectedOption === option ? "🔘" : "⚪"}
                                                    </span>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="col-12 col-md-2">
                                <label htmlFor="" className='labal-name'>
                                    Wing <span className='text-danger1 '>*</span>
                                </label>
                                <input type="text" className='input-section-2 ' placeholder='Enter Wing' />
                            </div>
                            <div className="col-12 col-md-3">
                                <label htmlFor="" className=''>
                                    Relation <span className='text-danger1  '>*</span>
                                </label>
                                <input type="text" className='input-section-2 ' placeholder='Enter Unit'  />
                            </div>
                            <div className="col-12 col-md-2">
                                <label htmlFor="" className=''>
                                    Age <span className='text-danger1 '>*</span>
                                </label>
                                <input type="text" className='input-section-2 ' placeholder='EnterRelation' />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}
