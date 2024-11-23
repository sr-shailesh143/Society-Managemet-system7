import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdArrowCircleDown } from "react-icons/md";
const generateInvoices = () => {
    return [
        {
            id: generateRandomInvoiceId(), ownerName: "Terry Rhiel Madsen", billDate: "10/02/2024", paymentDate: "10/02/2024", phoneNumber: "6549873521", email: "MaryDHurst@jourrapide.com", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
            maintenanceAmount: 1500.00,
            penalty: 350.00,
        },
        {
            id: generateRandomInvoiceId(), ownerName: "Liza Dudhat", billDate: "10/02/2024", paymentDate: "10/02/2024", phoneNumber: "6549873521", email: "lizadudhat@gmail.com", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
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
        doc.text(`Bill Date: ${selectedInvoice.billDate}`, 20, 60);
        doc.text(`Payment Date: ${selectedInvoice.paymentDate}`, 20, 70);
        doc.text(`Phone Number: ${selectedInvoice.phoneNumber}`, 20, 80);
        doc.text(`Email: ${selectedInvoice.email}`, 20, 90);
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
        <div className="container-fluid bg-white p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Maintenance Invoices</h1>
                <select className="form-select w-auto">
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead className="table-primary" style={{ textAlign: "center" }}>
                        <tr>
                            <th style={{ borderRadius: '15px 0px 0px 0px' }}>Invoice ID</th>
                            <th>Owner Name</th>
                            <th>Bill Date</th>
                            <th>Payment Date</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Maintenance Amount</th>
                            <th> Pending Amount </th>
                            <th style={{ borderRadius: '  0px    15px 0px 0px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.id}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.ownerName}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.billDate}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.paymentDate}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.phoneNumber}</td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>{invoice.email}</td>
                                <td className="text-success" style={{ textAlign: "center", boxShadow: "none" }}>
                                    ₹{invoice.maintenanceAmount}
                                </td>
                                <td className="text-danger" style={{ textAlign: "center", boxShadow: "none" }}>
                                    ₹{invoice.penalty}
                                </td>
                                <td style={{ textAlign: "center", boxShadow: "none" }}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleViewClick(invoice)}
                                    > <FiEye />
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
