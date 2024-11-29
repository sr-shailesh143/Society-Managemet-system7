import React, { useState } from 'react';
import { Edit, Image, PlusOne } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
export default function RecidencTarent() {
    const naviget = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const handlePayNowClick = (amount) => {
        setSelectedAmount(amount);
        setShowModal(true);
    };
    const item = {
        grandTotal: 100, // Example value
    };

    return (
        <div className='p-detels'>

            <div className="d-flex mt-4 ">
                <div onClick={() => naviget("/PersonalDetail")} style={{ background: location.pathname === "/PersonalDetail" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/PersonalDetail" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                    <p >Owner</p>
                </div>
                <div onClick={() => naviget("/RecidencTarent")} style={{ background: location.pathname === "/RecidencTarent" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff", color: location.pathname === "/RecidencTarent" ? "white" : "black" }} className='f-btn d-flex justify-content-center'>
                    <p >Tenant</p>
                </div>
            </div>
            <div className="owner-ditels  prosnal">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <h5 className='name-text'>Owner Name</h5>
                        <p className=' name-value'>Arlene McCoy</p>
                    </div>
                    <div className="col-12 col-md-2">
                        <h5 className='name-text'>Owner Phone</h5>
                        <p className=' name-value'>+91 9575225165</p>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <h5 className='name-text'>Owner Address</h5>
                        <p className=' name-value'>C-101,Dhara Arcade , Mota Varacha Surat.</p>
                    </div>
                </div>
            </div>
            <div className="prosnal mt-3">
                <div className="row d-flex  flex-wrap gap-1">
                    <div className="col-12 col-md-2 p-3 profilePage img-profile ">
                        <img src="/src/assets/residentProfile.png" alt="" />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="row mt-3 d-flex  flex-wrap ">
                            <div className="col-12 col-md-2">
                                <h5 className='name-text'>Full Name</h5>
                                <p className=' name-value'>Arlene McCoy</p>
                            </div>
                            <div className="col-12 col-md-2">
                                <h5 className='name-text'>Phone Number</h5>
                                <p className=' name-value'>+91 99130 44537</p>
                            </div>
                            <div className="col-12 col-md-3">
                                <h5 className='name-text'>Email Address</h5>
                                <p className=' name-value'>ArleneMcCoy25@gmail.com</p>
                            </div>
                            <div className="col-12 col-md-2  ">
                                <h5 className='name-text'>Gender</h5>
                                <p className=' name-value'>Male</p>
                            </div>
                            <div className="col-12 col-md-3 p-2" style={{ marginLeft: "-40px", width: "286px" }}>
                                <div className="document-ditels d-flex align-items-center p-3"
                                    style={{ border: "2px solid #D3D3D3", borderRadius: "10px", justifyContent: "flex-start", width: "360px", height: "100px" }}>
                                    <div className="img-icon">
                                        <Image style={{ width: "30px", height: "30px" }} />
                                    </div>
                                    <div className="document-name"
                                        style={{ whiteSpace: "normal", }}>
                                        <div className="document-name  ">
                                            <p className='d-text'>
                                                Syncfusion Essential Adharcard Front Side.JPG
                                            </p>
                                            <p className="d-n ">3.5 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2 d-flex  flex-wrap ">
                            <div className="col-12 col-md-2">
                                <h5 className='name-text'>Wing </h5>
                                <p className=' name-value'>A</p>
                            </div>
                            <div className="col-12 col-md-2">
                                <h5 className='name-text'>Age </h5>
                                <p className=' name-value'>187</p>
                            </div>
                            <div className="col-12 col-md-3">
                                <h5 className='name-text'>Unit</h5>
                                <p className=' name-value'>1001</p>
                            </div>
                            <div className="col-12 col-md-2  ">
                                <h5 className='name-text'>Relation</h5>
                                <p className=' name-value'>Mother</p>
                            </div>
                            <div className="col-12 col-md-3 p-2" style={{ marginLeft: "-40px", width: "286px" }}>
                                <div className="document-ditels d-flex align-items-center p-3"
                                    style={{ border: "2px solid #D3D3D3", borderRadius: "10px", justifyContent: "flex-start", width: "360px", height: "100px" }}>
                                    <div className="img-icon">
                                        <ArticleIcon className='fs-2 text-danger' />
                                    </div>
                                    <div className="document-name"
                                        style={{ whiteSpace: "normal", }}>
                                        <div className="document-name  ">
                                            <p className='d-text'>
                                                Adress Proof Front Side.PDF
                                            </p>
                                            <p className="d-n ">3.5 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="member mt-3 h-100">
                <div className="memberlist ">
                    <h6 className='title-member m-3 mx-4'>Member : (04)</h6>
                    <div className="list-member row ms-2">
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', width: "100%", display: 'flex', flexDirection: 'column', }}>
                                <div
                                    className="card-header "
                                    style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }}   >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Arlene McCoy</span>

                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Email</p>
                                        <p>Arlenemccoy@gmail.com</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Phone Number</p>
                                        <p>+91 99130 52221</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Age</p>
                                        <p>22</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Gender</p>
                                        <p>Male</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Relation</p>
                                        <p>Brother</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', minHeight: '220px', maxHeight: '300px', display: 'flex', flexDirection: 'column', }} >
                                <div className="card-header "
                                    style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }}   >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Arlene McCoy</span>

                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Email</p>
                                        <p>Arlenemccoy@gmail.com</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Phone Number</p>
                                        <p>+91 99130 52221</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Age</p>
                                        <p>22</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Gender</p>
                                        <p>Male</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Relation</p>
                                        <p>Brother</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100" style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', minHeight: '220px', maxHeight: '300px', display: 'flex', flexDirection: 'column', }} >
                                <div className="card-header " style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }} >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Arlene McCoy</span>

                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Email</p>
                                        <p>Arlenemccoy@gmail.com</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Phone Number</p>
                                        <p>+91 99130 52221</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Age</p>
                                        <p>22</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Gender</p>
                                        <p>Male</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Relation</p>
                                        <p>Brother</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100" style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', minHeight: '220px', maxHeight: '300px', display: 'flex', flexDirection: 'column', }}  >
                                <div
                                    className="card-header "
                                    style={{ color: 'white', display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: "#5678E9" }}   >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Arlene McCoy</span>
                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Email</p>
                                        <p>Arlenemccoy@gmail.com</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Phone Number</p>
                                        <p>+91 99130 52221</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Age</p>
                                        <p>22</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Gender</p>
                                        <p>Male</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Relation</p>
                                        <p>Brother</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="member mt-3 h-100">
                <div className="memberlist ">
                    <h6 className='title-member m-3 mx-4'>Vehicle : (04)</h6>
                    <div className="list-member row ms-2">
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', width: "100%", display: 'flex', flexDirection: 'column', }} >
                                <div className="card-header " style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }}    >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Two Wheelers  </span>

                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Vehicle Name</p>
                                        <p>Splendor</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Vehicle Number</p>
                                        <p>GJ-5216</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* balence */}
            <div className="belence mt-3">
                <div className="setmaintenance">
                    <h1 className=' h-1' onClick={() => setShowsetmantenenc(true)}>Show Maintenance Details</h1>
                </div>
                <div className="totle-amount row d-flex  ">

                    <div className="col-12 col-md-6">
                        <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className=" amount-card   amount-card-pink"   >
                            <div className="amount-box">

                                <div className="amount-label">Maintenance Amount</div>
                                <div className="amount-value">₹ 0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div title="Total Unit" value="₹ 20,550" iconSrc="src/Assets/button4.png" className="amount-card    amount-card-red"  >
                            <div className="amount-box">
                                <div className="amount-label">Penalty Amount</div>
                                <div className="amount-value-red">₹ 0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pending Maintanance */}
            <div className=" Pending Maintanance  mt-3 h-100 member">
                <div className="memberlist ">
                    <h6 className='title-member fs-4 m-3 mx-4'>Pending Maintanance</h6>
                    <div className="list-member row ms-2 mt-4">
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', width: "100%", display: 'flex', flexDirection: 'column', }}   >
                                <div
                                    className="card-header "
                                    style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }} >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Maintenance  </span>
                                    <button style={{ backgroundColor: "#FFFFFF1A", width: "113px" }} className='text-white'>Pending</button>
                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p>Bill Date</p>
                                        <p>11/01/2024</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Pending Date</p>
                                        <p>11/01/2024</p>
                                    </div>
                                    <div className="border"></div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <p>Maintanance Amount</p>
                                        <p className='text-danger'>1000.00</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Maintenance Penalty Amount</p>
                                        <p className='text-danger'>250.00</p>
                                    </div>
                                    <div className="border "></div>
                                    <div className="d-flex justify-content-between mt-2 ">
                                        <p>Grand Total</p>
                                        <p className='text-success'>₹ 1,250</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <button className="btn text-white w-100 m-2" style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white" }} onClick={() => handlePayNowClick(item.grandTotal)}>
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Due Maintanance */}
            <div className=" Due Maintanance  mt-3 h-100 member">
                <div className="memberlist ">
                    <h6 className='title-member fs-4 m-3 mx-4'>Due Maintanance</h6>
                    <div className="list-member row ms-2 mt-4">
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', width: "100%", display: 'flex', flexDirection: 'column', }}    >
                                <div className="card-header " style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }}    >
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Maintenance  </span>
                                    <button style={{ backgroundColor: "#FFFFFF1A", width: "113px" }} className='text-white'>Pending</button>
                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p> Date</p>
                                        <p>11/01/2024</p>
                                    </div>

                                    <div className="border"></div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <p>Maintanance Amount</p>
                                        <p className='text-danger'>1000.00</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Maintenance Penalty Amount</p>
                                        <p className='text-danger'>250.00</p>
                                    </div>
                                    <div className="border "></div>

                                    <div className="d-flex justify-content-between mt-2 ">
                                        <button className="btn text-white w-100 m-2" style={{ background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white" }} onClick={() => handlePayNowClick(item.grandTotal)}>
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Announcement Details */}
            <div className=" Announcement Details  mt-3 h-100 member">
                <div className="memberlist ">
                    <h6 className='title-member fs-4 m-3 mx-4'>Announcement Details</h6>
                    <div className="list-member row ms-2 mt-4">
                        <div className="col-md-4 col-lg-3 mb-4 d-flex">
                            <div className=" w-100"
                                style={{ borderRadius: '10px 10px', overflow: 'hidden', boxShadow: '0 4px 8px #5678E94D', width: "100%", display: 'flex', flexDirection: 'column', }}  >
                                <div className="card-header " style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: "#5678E9" }}>
                                    <span className="text-truncate" style={{ maxWidth: '200px' }}>Community Initiatives  </span>
                                </div>
                                <div className="card-body flex-column justify-content-between m-1 p-2" style={{ overflow: 'hidden', flexGrow: 1 }}>
                                    <div className="d-flex justify-content-between ">
                                        <p> Announcement Date</p>
                                        <p>11/01/2024</p>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <p>Announcement Time</p>
                                        <p>10:15 AM</p>
                                    </div>
                                    <div className=" ">
                                        <p > Description</p>
                                        <p className='mb-3'>The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <PaymentModal show={showModal} handleClose={() => setShowModal(false)} amount={selectedAmount} />
        </div>
    )
}
