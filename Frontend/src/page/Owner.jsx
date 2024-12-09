import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CreateOwner } from '../apiservices/residentservice';
import Loder from '../loder/Loder';

export default function Owner() {
    const location = useLocation()
    const [selectedOption, setSelectedOption] = useState("Male");
    const [isOpen, setIsOpen] = useState(false);

    const [OwnerData, setOwnerData] = useState({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        age: 0,
        gender: "",
        wing: "",
        unit: "",
        relation: ""
    });

    const [photo, setPhoto] = useState(null);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOwnerData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [files, setFiles] = useState({
        aadharFront: null,
        aadharBack: null,
        addressProof: null,
        rentAgreement: null,
        profileImage:null
    });

    // Handle file selection
    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles((prev) => ({
            ...prev,
            [name]: selectedFiles[0], 
        }));
    };



    const handleSelect = (option) => {
        setSelectedOption(option);
        setOwnerData(prevState => ({
            ...prevState,
            gender: option
        }));
        setIsOpen(false);
    };






    const [vaicalCount, setvaicalCount] = useState(1);
    const totalvaical = 5;
    const [memberCount, setMemberCount] = useState(1);
    const totalRows = 5;
    const [vehicleData, setVehicleData] = useState([]);
    const [loding, setloding] = useState(false);
    
   
    const naviget = useNavigate()
    
     const handleSubmit = async (e) => {
        e.preventDefault();
        const data ={
            ...OwnerData,
            ...files,
            memberCounting :formData,
            vehicleCounting:vehicleData
            
        }
        try { 
            setloding(true)
            const risponse =  await  CreateOwner(data)
                
            console.log(risponse);
            setloding(false)
           
        } catch (error) {
            console.log(error)
        }
        
    };
    const handleVaicalTextChange = (e, fieldName, index) => {
        const updatedData = [...vehicleData];
        updatedData[index] = { ...updatedData[index], [fieldName]: e.target.value };
        setVehicleData(updatedData);
    };

    const [formData, setFormData] = useState([]);
    const handleTextChange1 = (e, fieldName, index) => {
        const updatedData = [...formData];
        updatedData[index] = { ...updatedData[index], [fieldName]: e.target.value };
        setFormData(updatedData);
    };
    
    const handleMemberCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMemberCount(count);

     
        if (count > formData.length) {
            const additionalRows = Array(count - formData.length).fill({});
            setFormData([...formData, ...additionalRows]);
        }
    };


    const handleVaicalCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setvaicalCount(count);

       
        if (count > vehicleData.length) {
            const additionalRows = Array(count - vehicleData.length).fill({});
            setVehicleData([...vehicleData, ...additionalRows]);
        }
    }


    return (
        <div className=''>

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
            <form method='post' enctype="multipart/form-data" >
                <div className=" bg-white section-1 ">

                    <div className="row d-flex">
                        <div className="col-12 col-md-1 p-3 profilePage img-profile ">
                            <label className="photo-upload mt-2 ">
                                <img src="/src/assets/addprofile.png " alt="" />
                                <input type="file" accept="image/*" name='profileImage' onChange={handleFileChange} />
                                <div className="photo-preview text-center mt-4 profil-text" style={{ backgroundImage: `url(${photo || ''})` }}>
                                    {!photo && <span className="camera-icon text-center mt-5">Add Photo</span>}
                                </div>
                            </label>
                        </div>
                        <div className="col-12 col-md-10">
                            <div className="row  ">
                                <div className="col-12 col-md-4">
                                    <label html="" className='labal-name'>Full Name <span className='text-danger1'>*</span></label>
                                    <input className='input-style' placeholder='Enter Full Name' type="text" name="fullName" required

                                        onChange={handleChange} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label html="" className='labal-name'>Phone Number<span className='text-danger1'>*</span></label>
                                    <input className='input-style' type="number" placeholder='+91' name="phoneNumber" required
                                        onChange={handleChange} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label html="" className='labal-name'>Email Address</label>
                                    <input className='input-style' placeholder='Enter Email Address' type="email" name="emailAddress" required
                                        onChange={handleChange} />
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-12 col-md-2">
                                    <label htmlFor="" className='labal-name'>
                                        Age <span className='text-danger1'>*</span>
                                    </label>
                                    <input type="number" placeholder='Enter Age' className='input-section-2 ' name="age" required
                                        onChange={handleChange} />
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
                                    <input type="text" className='input-section-2 ' placeholder='Enter Wing' name="wing" required
                                        onChange={handleChange} />
                                </div>
                                <div className="col-12 col-md-3 ">
                                    <label htmlFor="" className='labal-name'>
                                        Unit <span className='text-danger1  '>*</span>
                                    </label>
                                    <input type="number" className='input-section-2 ' placeholder='Enter Unit' name="unit" required
                                        onChange={handleChange} />
                                </div>
                                <div className="col-12 col-md-2">
                                    <label htmlFor="" className='labal-name'>
                                        Relation <span className='text-danger1 '>*</span>
                                    </label>
                                    <input type="text" className='input-section-2 ' placeholder='EnterRelation' name="relation" required
                                        onChange={handleChange} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Upload Aadhar Card (Front Side)</label>
                            <input
                                type="file"
                                name="aadharFront"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div>
                            <label>Upload Aadhar Card (Back Side)
                            <input
                                type="file"
                                name="aadharBack"
                                className='d-none'
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            </label>
                        </div>

                        <div>
                            <label htmlFor='file1'>Address Proof (Vera Bill or Light Bill)</label>
                            <input
                                type="file"
                                name="addressProof"
                                accept="image/*"
                                id='file1'
                                className='d-none'
                                onChange={handleFileChange}
                            />
                        </div>

                        <div>
                            <label htmlFor='file'>Rent Agreement</label>

                            <input
                                type="file"
                                className='d-none'
                                name="rentAgreement"
                                accept="image/*"
                                id='file'
                                onChange={handleFileChange}
                            />
                        </div>

                      
                    </div>

                </div>
                <div className="section-2 mt-3">
            <div className="header d-flex justify-content-between align-items-center">
                <h6 className="MEMBER-TEX">
                    Member Counting: <span className="othe-text">(Other Members)</span>
                </h6>
                <div className="select-member">
                    <label className="me-2 SELECT-MEMBER">Select Member</label>
                    <select
                        value={memberCount}
                        onChange={handleMemberCountChange}
                        className="form-select"
                    >
                        {[...Array(totalRows).keys()].map((num) => (
                            <option key={num} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="member-rows mt-3">
                {[...Array(totalRows).keys()].map((index) => (
                    <div
                        key={index}
                        className={`row gy-3 member-row ${index < memberCount ? "" : "d-none"}`}
                    >
                        <div className="col-md-2 col-12">
                            <label className="text-wrap">
                                Full Name <span className="text-danger1">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control input-text input-style"
                                placeholder="Enter Full Name"
                                onChange={(e) => handleTextChange1(e, "fullName", index)}
                            />
                        </div>
                        <div className="col-md-2 col-12">
                            <label className="text-wrap">
                                Phone No<span className="text-danger1">*</span>
                            </label>
                            <input
                                type="tel"
                                className="form-control input-text input-style"
                                placeholder="+91"
                                onChange={(e) => handleTextChange1(e, "phoneNumber", index)}
                                required
                            />
                        </div>
                        <div className="col-md-2 col-12">
                            <label className="text-wrap">Email</label>
                            <input
                                type="email"
                                className="form-control input-text input-style"
                                placeholder="Enter Email Address"
                                onChange={(e) => handleTextChange1(e, "emailAddress", index)}
                            />
                        </div>
                        <div className="col-md-1 col-12">
                            <label className="text-wrap">
                                Age<span className="text-danger1">*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control input-text mt-1 input-style"
                                placeholder="Age"
                                onChange={(e) => handleTextChange1(e, "age", index)}
                                required
                            />
                        </div>
                        <div className="col-md-2 col-10">
                            <label className="text-wrap">
                                Gender<span className="text-danger1">*</span>
                            </label>
                            <select
                                className="form-select input-text mt-1 input-style"
                                onChange={(e) => handleTextChange1(e, "gender", index)}
                                required
                            >
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-2 col-12">
                            <label className="text-wrap">
                                Relation<span className="text-danger1">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control input-text input-style"
                                placeholder="Enter Relation"
                                onChange={(e) => handleTextChange1(e, "relation", index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
           
        </div>
        <div className="section-2 mt-3">
            <div className="header d-flex justify-content-between align-items-center">
                <h6 className="MEMBER-TEX">Vehicle Counting:</h6>
                <div className="select-member">
                    <label className="me-2 SELECT-MEMBER">Select Vehicle</label>
                    <select
                        value={vaicalCount}
                        onChange={handleVaicalCountChange}
                        className="form-select"
                    >
                        {[...Array(totalvaical).keys()].map((num) => (
                            <option key={num} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="member-rows mt-3">
                {[...Array(totalvaical).keys()].map((index) => (
                    <div
                        key={index}
                        className={`row gy-3 member-row ${index < vaicalCount ? "" : "d-none"}`}
                    >
                        <div className="col-md-3 col-12">
                            <label className="text-wrap">
                                Vehicle Type<span className="text-danger1">*</span>
                            </label>
                            <select
                                className="form-select input-text mt-1 input-style"
                                onChange={(e) => handleVaicalTextChange(e, "vehicleType", index)}
                            >
                                <option value="">Select Vehicle</option>
                                <option value="Two Wheeler">Two Wheeler</option>
                                <option value="Four Wheeler">Four Wheeler</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-12">
                            <label className="text-wrap">Vehicle Name</label>
                            <input
                                type="text"
                                className="form-control input-text input-style"
                                placeholder="Enter Vehicle Name"
                                onChange={(e) => handleVaicalTextChange(e, "vehicleName", index)}
                            />
                        </div>
                        <div className="col-md-3 col-12">
                            <label className="text-wrap">Vehicle Number</label>
                            <input
                                type="text"
                                className="form-control input-text input-style"
                                placeholder="Enter Vehicle Number"
                                onChange={(e) => handleVaicalTextChange(e, "vehicleNumber", index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
           
        </div>
                <div className=" row  section-button d-flex gap-3 mt-3">
                    <div className="col-12 col-md-4  ">
                        <button className='Cancel-btn  '>Cancel</button>
                    </div>
                    <div className="col-12 col-md-4  ">
                        <button className='Create-btn  l-btn text-white' onClick={handleSubmit}>{loding ? <Loder/> :"Create"}</button>
                    </div>

                </div>
            </form>
        </div>



    )
}
