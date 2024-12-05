import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdArrowCircleDown } from "react-icons/md";
const generateInvoices = () => {
    return [
        {
            id: generateRandomInvoiceId(), DueDate: "20/02/2024", paymentDate: "10/02/2024", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
            maintenanceAmount: 1500.00,
            penalty: 350.00,
        },
        {
            id: generateRandomInvoiceId(), DueDate: "20/02/2024", paymentDate: "10/02/2024", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
            maintenanceAmount: 1000.00,
            penalty: .00,
        }
    ];
};
const generateRandomInvoiceId = () => {
    const randomDigits = Math.floor(Math.random() * 900000) + 100000;
    return `${randomDigits}`;
};
const InvoicePage = () => {
    const invoices = generateInvoices();
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleViewClick = (invoice) => {
        setSelectedInvoice(invoice);
    };
    const handleCloseModal = () => {
        setSelectedInvoice(null);
    };
    const handleDownloadInvoice = () => {
        if (!selectedInvoice) return;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Maintenance Invoice", 20, 20);
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${selectedInvoice.id}`, 20, 40);
        doc.text(`Owner Name: ${selectedInvoice.ownerName}`, 20, 50);
     
        doc.text(`Payment Date: ${selectedInvoice.paymentDate}`, 20, 70);

     
        doc.text(`Address: ${selectedInvoice.address}`, 20, 100);
        doc.text(`Maintenance Amount: ₹${selectedInvoice.maintenanceAmount}`, 20, 110);
        doc.text(`Penalty: ₹${selectedInvoice.penalty}`, 20, 120);
        doc.text(
            `Grand Total: ₹${selectedInvoice.maintenanceAmount + selectedInvoice.penalty}`,
            20,
            130
        );
        doc.setFontSize(10);
        doc.text("Thank you for your payment!", 20, 150);
        doc.save(`Invoice_${selectedInvoice.id}.pdf`);
    };
    return (
        <div className="container-fluid bg-white p-4"style={{borderRadius:"10px"}}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Maintenance Invoices</h1>
                <select className="form-select w-auto">
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select>
            </div>
            <div className="table-responsive "style={{height:"700px",overflowY:"hidden"}}>
                <table className="table table-striped align-middle">
                    <thead className="table-primary" style={{ textAlign: "center" }}>
                        <tr>
                            <th style={{ borderRadius: '15px 0px 0px 0px' }}>Invoice ID</th>
                            <th>Due Date</th>
                        
                            <th>Payment Date</th>
                          
                            <th>Maintenance Amount</th>
                            <th> Pending Amount </th>
                            <th style={{ borderRadius: '  0px    15px 0px 0px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.id}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.DueDate}</td>
                      
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.paymentDate}</td>
                               
                                <td className="text-success" style={{ textAlign: "center", boxShadow: "none" }}>
                                    ₹{invoice.maintenanceAmount}
                                </td>
                                <td className="text-danger" style={{ textAlign: "center", boxShadow: "none" }}>
                                    ₹{invoice.penalty}
                                </td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>
                                    <button
                                        className="btn  btn-sm "style={{background:"#F6F8FB"}}
                                    >
                                      <svg className='cursor' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#5678E9" />
                              <path d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z" fill="#5678E9" />
                            </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedInvoice && (
                <div className="custom-modal-overlay " closeButton>
                    <div className="custom-modal " closeButton >
                        <h3
                            className="text-start   Maintenance-Invoice p-3"
                            style={{ marginBottom: "20px", color: "#333", display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                            Maintenance Invoice
                            <button onClick={handleCloseModal} style={{ background: "none", border: "none", fontSize: "1.5rem", color: "#ff6347", cursor: "pointer", }} >
                                &times;
                            </button>
                        </h3>
                        <hr />
                        <div
                            className="modal-content"
                            style={{ padding: "10px", borderRadius: "8px" }} >
                            <div
                                className="shadow"
                                style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#F6F8FB", height: "300px", marginBottom: "15px", }}>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }} >
                                    <p>
                                        <strong style={{ color: "#A7A7A7" }}>Invoice ID:</strong> <span style={{ color: "#202224" }}>{selectedInvoice.id}</span>
                                    </p>
                                    <p>
                                        <strong style={{ color: "#A7A7A7" }}>Owner Name:</strong> <span style={{ color: "#202224" }}>{selectedInvoice.ownerName}</span>
                                    </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>
                                        <strong style={{ color: "#A7A7A7" }}>Bill Date:</strong> {selectedInvoice.billDate}
                                    </p>
                                    <p>
                                        <strong style={{ color: "#A7A7A7" }}>Payment Date:</strong> {selectedInvoice.paymentDate}
                                    </p>
                                </div>
                                <p style={{ marginBottom: "10px" }}>
                                    <strong style={{ color: "#A7A7A7" }}>Phone Number:</strong> {selectedInvoice.phoneNumber}
                                </p>
                                <p style={{ marginBottom: "10px" }}>
                                    <strong style={{ color: "#A7A7A7" }}>Email:</strong> {selectedInvoice.email}
                                </p>
                                <p style={{ marginBottom: "10px" }}>
                                    <strong style={{ color: "#A7A7A7" }}>Address:</strong> {selectedInvoice.address}
                                </p>
                            </div>
                            <div
                                className="p-2 shadow"
                                style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#F6F8FB", marginBottom: "15px", }}  >
                                <p
                                    style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", }}  >
                                    <strong style={{ color: "#A7A7A7" }}>Maintenance Amount:</strong>
                                    <span className="text-success">₹{selectedInvoice.maintenanceAmount}.00</span>
                                </p>
                                <p style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", }} >
                                    <strong style={{ color: "#A7A7A7" }}>Penalty:</strong>
                                    <span className="text-danger">₹{selectedInvoice.penalty}.00</span>
                                </p>
                                <hr style={{ border: "1px solid #d1d1d1", margin: "10px 0" }} />
                                <p style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", }} >
                                    <strong style={{ color: "#A7A7A7" }}>Grand Total:</strong>
                                    <span>₹{selectedInvoice.maintenanceAmount + selectedInvoice.penalty}.00</span>
                                </p>
                            </div>
                            <div className=" shadow"
                                style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#F6F8FB", marginBottom: "15px", }}   ><p >
                                    <strong style={{ color: "#A7A7A7" }}>Note</strong>
                                    <p>Note
                                        A visual representation of your spending categories visual   . </p>
                                </p>
                            </div>
                        </div>
                        <button
                            className="btn btn-warning m-2    Download-Invoice "
                            onClick={handleDownloadInvoice}
                            style={{
                                width: "95%", padding: "10px", background: "linear-gradient(90deg, rgb(254, 81, 46) 0%, rgb(240, 150, 25) 100%)", border: "none", color: "white",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }} >
                            <MdArrowCircleDown style={{ color: "white", fontSize: "20px", textAlign: "center", justifyContent: "center", alignItems: "center" }} />
                            Download Invoice
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicePage;
