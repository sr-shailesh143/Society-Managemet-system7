import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { createComplaint, getAllComplaints, deleteComplaint, } from "../apiservices/complaintservice"


export default function ServiceComplain() {
    const location = useLocation();
    const [complaints, setComplaints] = useState([

    ]);

    const [id, setid] = useState("")
    const [compleltData, setcompleltData] = useState({
        complainerName: "",
        complaintName: "",
        description: "",
        wing: "",
        unit: "",

    })
    const handlecancleEdit = () => setShowModal(false);
    const [status2, setStatus2] = useState("");
    const [prourity, setprourity] = useState("");
    const handleStatusChange2 = (event) => setStatus2(event.target.value);
    const proorety = (event) => setprourity(event.target.value);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleClose = () => setShowDeleteModal(false)
    const naviget = useNavigate();

    const handleInputChange = async () => {
        const data = {
            complainerName: compleltData.complainerName,
            complaintName: compleltData.complaintName,
            description: compleltData.description,
            wing: compleltData.wing,
            unit: compleltData.unit,
            priority: prourity,
            status: status2,
        }
        await createComplaint(data)
        getalldata()
        setShowModal(false)
    };

    const getalldata = async () => {
        try {
            const respons = await getAllComplaints()
            setComplaints(respons.data.records)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getalldata()
    }, [])


    const handleOpenDeleteModal = (index) => {
        setid(index);
        setShowDeleteModal(true);
    };

    const handleDeleteComplaint = async (id) => {
        try {
            await deleteComplaint(id)
            setShowDeleteModal(false);
            getalldata()
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className='container-fluid'>
          
            <div className='row'>
                <div className="d-flex ">
                    <div onClick={() => naviget("/ServiceComplain")}
                        style={{ background: location.pathname === "/ServiceComplain" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/ServiceComplain" ? "white" : "black" }}
                        className='b-btn d-flex justify-content-center'>
                        <p>Complaint Submission</p>
                    </div>
                    <div onClick={() => naviget("/RequestSubmission")}
                        style={{ background: location.pathname === "/RequestSubmission" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#fff", color: location.pathname === "/RequestSubmission" ? "white" : "black" }}
                        className='b-btn d-flex justify-content-center'>
                        <p>Request Submission</p>
                    </div>
                </div>
            </div>


            <div className="complaints-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="font-weight-bold" style={{ fontWeight: "bold" }}>Complaint</h4>
                    <button className="btn btn-danger custom-create-btn " onClick={() => setShowModal(true)}>
                        Create Complaint
                    </button>
                </div>

                <div className="row">
                    {complaints.map((complaint, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-header custom-card-header">
                                    <h5 className="card-title mb-0">{complaint.complaintName}</h5>
                                    <div className="dropdown">
                                        <button className="btn btn-sm text-white p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FaEllipsisV size={16} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button className="dropdown-item text-dark" onClick={() => handleOpenDeleteModal(complaint._id)}>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <p className="card-text mb-2 d-flex justify-content-between">
                                        <strong style={{ color: "#4F4F4F" }}>Complaint Date:</strong>
                                        <p className='mode-date'>
                                            {new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit',
                                            })}
                                        </p>
                                    </p>
                                    <p className="card-text mb-2 d-flex justify-content-between">
                                        <strong style={{ color: "#4F4F4F" }}>Status:</strong>
                                        <span
                                            style={{
                                                color:
                                                    complaint.status === "Pending"
                                                        ? "#6A4E02"
                                                        : complaint.status === "Solve"
                                                            ? "#1B5E20"
                                                            : "#202224",
                                                fontWeight: "bold",
                                                background:
                                                    complaint.status === "Pending"
                                                        ? "#FFEB3B"
                                                        : complaint.status === "Solved"
                                                            ? "rgba(76, 175, 80, 0.1)"
                                                            : "#5678E91A",
                                                width: "60px",

                                                textAlign: "center",
                                                borderRadius: "30px",

                                            }}
                                        >
                                            {complaint.status}
                                        </span>


                                    </p>
                                    <p className="card-text">
                                        <strong style={{ color: "#4F4F4F" }}>Description:</strong>
                                        <p style={{ color: "#202224", fontWeight: "bold" }}>{complaint.description}</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Create Complaint Modal */}
            <Modal className='complet-model' show={showModal} >
                <div className="model">
                    <Modal.Header>
                        <Modal.Title>Edit Complaint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="complete-name">
                            <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                            <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                                ...compleltData, complainerName: e.target.value
                            })} />
                        </div>
                        <div className="complete-name mt-3">
                            <label html="" className='labal-name'> Complainer Name <span className='text-danger1'>*</span></label>
                            <input className='input-style' placeholder='Enter Name' type="text" onChange={(e) => setcompleltData({
                                ...compleltData, complaintName: e.target.value
                            })} />
                        </div>
                        <div className="complete-name mt-3">
                            <Form.Label>Description <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                onChange={(e) => setcompleltData({
                                    ...compleltData, description: e.target.value
                                })}
                                placeholder='Enter Description'
                            />
                        </div>
                        <div className="complete-name mt-2 row d-flex">
                            <div className="complent-UnitNumber col-12 col-md-6">
                                <label html="" className='labal-name'> Wing <span className='text-danger1'>*</span></label>
                                <input className='input-style' placeholder='Enter Wing' type="text" onChange={(e) => setcompleltData({
                                    ...compleltData, wing: e.target.value
                                })} />
                            </div>
                            <div className="complelt-unit col-12 col-md-6">
                                <label html="" className='labal-name'> Unit <span className='text-danger1'>*</span></label>
                                <input className='input-style' placeholder='Enter Unit' type="number" onChange={(e) => setcompleltData({
                                    ...compleltData, unit: e.target.value
                                })} />
                            </div>
                        </div>
                        <div className="complete-name mt-2 ">
                            <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                            <div className="row gap-3  justify-content-center  ">
                                <div onClick={() => setprourity("High")} className={`  col-md-3  d-flex  align-items-center gap-2 ${prourity === "High" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: prourity === "High" ? "   #FE512E #F09619 " : "#D3D3D3", color: prourity === "High" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input type="radio" className=' radio polls-radio   ' checked={prourity === "High"} onChange={proorety} value="High" />
                                    <p className='mt-3'>High</p>
                                </div>
                                <div onClick={() => setprourity("Medium")} className={`  col-md-4  d-flex  align-items-center gap-2  ${prourity === "Medium" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: prourity === "Medium" ? "   #FE512E #F09619 " : "#D3D3D3", color: prourity === "Medium" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input type="radio" className=' radio polls-radio  ' checked={prourity === "Medium"} onChange={proorety} value={"Medium"} />
                                    <p className='mt-3'>Medium</p>
                                </div>
                                <div onClick={() => setprourity("Low")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${prourity === "Low" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: prourity === "Low" ? "#FE512E #F09619 " : "#D3D3D3", color: prourity === "Low" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input type="radio" className=' radio polls-radio  ' checked={prourity === "Low"} onChange={proorety} value={"Low"} />
                                    <p className='mt-3'>Low</p>
                                </div>
                            </div>
                        </div>
                        <div className="complete-name mt-2 ">
                            <label html="" className='labal-name'> Priority <span className='text-danger1'>*</span></label>
                            <div className="row gap-3  justify-content-center  ">
                                <div onClick={() => setStatus2("Open")} className={`  col-md-3  d-flex  align-items-center gap-2 ${status2 === "Open" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Open" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "Open" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input type="radio" className=' radio polls-radio  ' checked={status2 === "Open"} onChange={handleStatusChange2} value="Open" />
                                    <p className='mt-3'>Open</p>
                                </div>
                                <div onClick={() => setStatus2("Pending")} className={`  col-md-4  d-flex  align-items-center gap-2  ${status2 === "Pending" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Pending" ? "   #FE512E #F09619 " : "#D3D3D3", color: status2 === "Pending" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input type="radio" className='  radio polls-radio ' checked={status2 === "Pending"} onChange={handleStatusChange2} value={"Pending"} />
                                    <p className='mt-3 '>Pending</p>
                                </div>
                                <div onClick={() => setStatus2("Solve")} className={` col-12 col-md-3  d-flex  align-items-center gap-2  ${status2 === "Solve" ? "selected" : ""} `} style={{ border: "1px solid #D3D3D3", borderColor: status2 === "Solve" ? "#FE512E #F09619 " : "#D3D3D3", color: status2 === "Solve" ? "black" : "#D3D3D3", borderRadius: "10px" }}>
                                    <input style={{ width: "50px", height: "20px" }} type="radio" className='radio polls-radio' checked={status2 === "Solve"} onChange={handleStatusChange2} value={"Solve"} />
                                    <p className='mt-3'>Solve</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mt-3">
                            <Button
                                className=" cancel-btn radious  "
                                style={{ border: "1px solid #D3D3D3", }}
                                variant=""
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="save-btn radious l-btn "
                                style={{
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer"
                                }}

                                onClick={handleInputChange}
                            >
                                Save
                            </Button>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Delete Complain?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='mode-date'>Are you sure you want to delate this Complain?</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-3 mt-3">
                        <Button
                            className="save-btn radious   "
                            style={{

                                color: "#202224",
                                border: "1px solid #D3D3D3",
                                cursor: "pointer"
                            }}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="save-btn radious  text-white "
                            style={{
                                backgroundColor: "#E74C3C",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={() => handleDeleteComplaint(id)}
                        >
                            Conform
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
