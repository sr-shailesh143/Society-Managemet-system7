import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Owner() {
    const location = useLocation()
    const [selectedOption, setSelectedOption] = useState("Male");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const [photo, setPhoto] = useState(null);
    ;

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg, image/gif',
        maxSize: 10 * 1024 * 1024, 
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        },
    });

    const [vaicalCount, setvaicalCount] = useState(2); 
    const totalvaical = 5; 
    const [memberCount, setMemberCount] = useState(2);
    const totalRows = 5; 

    const handleMemberCountChange = (event) => {
        setMemberCount(Number(event.target.value));
    };
    const handlevaicalCountchange = (event) => {
        setvaicalCount(Number(event.target.value));
    };
    const naviget = useNavigate()
    return (
        <div div className=''>

            <div className='row'>
                <div className="d-flex  ">
                    <div onClick={() => naviget("/owner")} style={{ background: location.pathname === "/owner" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/owner" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p >Owner</p>
                    </div>
                    <div onClick={() => naviget("/Tenant")} style={{ background: location.pathname === "/Tenant" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/Tenant" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                        <p >Tenant</p>
                    </div>
                </div>
            </div>
            <div className=" bg-white section-1 ">
                <div className="row d-flex">
                    <div className="col-12 col-md-1 p-3 profilePage img-profile ">
                        <label className="photo-upload mt-2 ">
                            <img src="/src/assets/addprofile.png " alt="" />
                            <input type="file" accept="image/*" />
                            <div className="photo-preview text-center mt-4 profil-text" style={{ backgroundImage: `url(${photo || ''})` }}>
                                {!photo && <span className="camera-icon text-center mt-5">Add Photo</span>}
                            </div>
                        </label>
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
                            <div className="col-12 col-md-3 ">
                                <div style={{ border: "none" }} className="custom-dropdown      ">
                                    <label style={{ fontWeight: "550", fontSize: "14px", font: "Poppins", lineHeight: "21px", height: "21px" }} className="">Gender<span className="required">*</span></label>
                                    <div
                                        className="dropdown-header input-style input-section-2 "
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {selectedOption}

                                    </div>

                                    {isOpen && (
                                        <div className="dropdown-options input-style  ">
                                            <option>Select Gender</option>
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
                            <div className="col-12 col-md-3 ">
                                <label htmlFor="" className='labal-name'>
                                    Relation <span className='text-danger1  '>*</span>
                                </label>
                                <input type="text" className='input-section-2 ' placeholder='Enter Unit' />
                            </div>
                            <div className="col-12 col-md-2">
                                <label htmlFor="" className='labal-name'>
                                    Age <span className='text-danger1 '>*</span>
                                </label>
                                <input type="text" className='input-section-2 ' placeholder='EnterRelation' />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 col-md-3 mt-4">
                        <div className="text-img">

                            <span className='t-img'>Upload Aadhar Card (Front Side)</span>
                        </div>
                        <div className="file-upload" {...getRootProps()}>

                            <input {...getInputProps()} />
                            <div className="upload-area">
                                <center>

                                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                </center>
                                <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                                <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 mt-4">
                        <div className="text-img">

                            <span className='t-img'>Upload Aadhar Card (Back Side)</span>
                        </div>
                        <div className="file-upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="upload-area">
                                <center>

                                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                </center>
                                <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                                <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 mt-4">
                        <div className="text-img">

                            <span className='t-img'>Address Proof (Vera Bill OR Light Bill)</span>
                        </div>
                        <div className="file-upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="upload-area">
                                <center>

                                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                </center>
                                <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                                <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 mt-4">
                        <div className="text-img">

                            <span className='t-img'>Rent Agreement</span>
                        </div>
                        <div className="file-upload  " {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="upload-area">
                                <center>

                                    <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                </center>
                                <p> <span className='img-text'>Upload a file </span> or drag and drop</p>
                                <small>PNG, JPG, GIF up to 10MB</small>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="section-2 mt-3">
                <div className=" mt-3">
                    <div className="header d-flex justify-content-between align-items-center">
                        <h6 className='MEMBER-TEX'>Member Counting: <span className='othe-text'>(Other Members)</span></h6>
                        <div className="select-member">
                            <label className="me-2 SELECT-MEMBER">Select Member</label>
                            <select value={memberCount} onChange={handleMemberCountChange} className="form-select ">
                                {[...Array(totalRows).keys()].map((num) => (
                                    <option key={num} value={num + 1}> <span className='ms-3'>    {num + 1}</span></option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="member-rows mt-3">
                        {[...Array(totalRows).keys()].map((index) => (
                            <div
                                key={index}
                                className={`row gy-3 member-row ${index < memberCount ? '' : 'd-none'}`}
                            >
                                <div className="col-md-2 col-12">
                                    <label className='text-wrap '>Full Name <span className='text-danger1 '>*</span></label>
                                    <input type="text" className="form-control  input-text input-style" placeholder="Enter Full Name" required />
                                </div>
                                <div className="col-md-2 col-12">
                                    <label className='text-wrap'>Phone No<span className='text-danger1 '>*</span></label>
                                    <input type="tel" className="form-control  input-text input-style" placeholder="+91" required />
                                </div>
                                <div className="col-md-2 col-12">
                                    <label className='text-wrap'>Email</label>
                                    <input type="email" className="form-control  input-text input-style" placeholder="Enter Email Address" />
                                </div>
                                <div className="col-md-1 col-12">
                                    <label className='text-wrap'>Age<span className='text-danger1  '>*</span></label>
                                    <input type="number" className="form-control  input-text mt-1 input-style " placeholder=" Age" required />
                                </div>
                                <div className="col-md-2 col-10">
                                    <label className='text-wrap'>Gender<span className='text-danger1 '>*</span></label>
                                    <select className="form-select  input-text mt-1 input-style" required>
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="col-md-2 col-12">
                                    <label className='text-wrap'>Relation<span className='text-danger1 '>*</span></label>
                                    <input type="text" className="form-control  input-text input-style" placeholder="Enter Relation" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="section-2 mt-3">
                <div className=" mt-3">
                    <div className="header d-flex justify-content-between align-items-center">
                        <h6 className='MEMBER-TEX'>Vehicle Counting :  </h6>
                        <div className="select-member">
                            <label className="me-2 SELECT-MEMBER">Select Vehicle</label>
                            <select value={vaicalCount} onChange={handlevaicalCountchange} className="form-select ">
                                {[...Array(totalvaical).keys()].map((num) => (
                                    <option key={num} value={num + 1}>{num + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="member-rows mt-3">
                        {[...Array(totalvaical).keys()].map((index) => (
                            <div key={index} className={`row gy-3  member-row ${index < vaicalCount ? '' : 'd-none'}`} >
                                <div className="col-md-3 col-12">
                                    <label className='text-wrap'>Vehicle Type<span className='text-danger1 '>*</span></label>
                                    <select className="form-select  input-text mt-1 input-style" required>
                                        <option>Select Vehicle</option>
                                        <option>Two Wheelers</option>
                                        <option>Four Wheeler</option>
                                    </select>
                                </div>
                                <div className="col-md-4 col-12">
                                    <label className='text-wrap'>Vehicle Name</label>
                                    <input type="text" className="form-control  input-text input-style" placeholder="Enter Relation" />
                                </div>
                                <div className="col-md-3 col-12">
                                    <label className='text-wrap'>Vehicle Number</label>
                                    <input type="text" className="form-control  input-text input-style" placeholder="Enter Relation" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" row  section-button d-flex gap-3 mt-3">
                <div className="col-12 col-md-4  ">
                    <button className='Cancel-btn  '>Cancel</button>
                </div>
                <div className="col-12 col-md-4  ">
                    <button disabled className='Create-btn '>Create</button>
                </div>
            </div>
        </div>

    )
}
