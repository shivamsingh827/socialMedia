
import React from 'react';
import QRCode from 'react-qr-code';

const SharePopUp = ({ userData, onClose }) => {
  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000, // Adjust z-index as needed
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const qrCodeStyle = {
    margin: '20px 0',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={popupStyle} className="share-popup">
      <h2>Your Profile QR Code</h2>
      <QRCode value={`http://localhost:5000/profile/${userData.username}`} style={qrCodeStyle} />
      <button onClick={onClose} style={buttonStyle}>
        Close
      </button>
    </div>
  );
};

export default SharePopUp;
