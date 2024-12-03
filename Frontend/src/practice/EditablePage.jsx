import React, { useState } from "react";
import Modal from "react-modal";

// Set up modal styles
Modal.setAppElement("#root");

const ImagePopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Local image (or replace with a URL if using online storage)
//   const imagePath = process.env.PUBLIC_URL + "/your-uploaded-image.png"; // Adjust path if needed

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={openModal} style={{ cursor: "pointer", padding: "10px", fontSize: "16px" }}>
        <img 
          src="https://img.icons8.com/ios-glyphs/30/000000/visible.png" 
          alt="View Icon" 
        />
        View Image
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: "80%",
            maxHeight: "80%",
            margin: "auto",
            textAlign: "center",
          },
        }}
      >
        <img 
          src={"/src/assets/img.png"} 
          alt="Uploaded Image" 
          style={{ width: "100%", height: "auto" }} 
        />
        <button onClick={closeModal} style={{ marginTop: "20px", padding: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ImagePopup;
