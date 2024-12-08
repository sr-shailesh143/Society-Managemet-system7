import React, { useState } from "react";
// import axios from "axios";

const FileUploadForm = () => {
  const [files, setFiles] = useState({
    aadharFront: null,
    aadharBack: null,
    addressProof: null,
    rentAgreement: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles[0], // Save only the first file
    }));
  };
  

  // Submit files to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("aadharFront", files.aadharFront);
    formData.append("aadharBack", files.aadharBack);
    formData.append("addressProof", files.addressProof);
    formData.append("rentAgreement", files.rentAgreement);

    console.log(files)

     };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Upload Aadhar Card (Back Side)</label>
        <input
          type="file"
          name="aadharBack"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Address Proof (Vera Bill or Light Bill)</label>
        <input
          type="file"
          name="addressProof"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Rent Agreement</label>
        <input
          type="file"
          name="rentAgreement"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Upload Files</button>

      <div style={{ margin: "20px" }}>
      <label
        htmlFor="fileUpload"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          height: "150px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {/* Display selected file name */}
        {selectedFile ? (
          <p style={{ color: "#000", margin: "10px 0" }}>
            Selected: {selectedFile.name}
          </p>
        ) : (
          <>
            <img
              src="https://img.icons8.com/material-outlined/48/000000/upload--v1.png"
              alt="Upload Icon"
              style={{ marginBottom: "10px" }}
            />
            <p style={{ margin: 0, fontSize: "14px" }}>
              Upload a file or drag and drop
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
              PNG, JPG, GIF up to 10MB
            </p>
          </>
        )}
      </label>
      {/* Hidden input */}
      <input
        id="fileUpload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        name=""
        accept="image/png, image/jpeg, image/gif"
      />
    </div>
    </form>
  );
};

export default FileUploadForm;
