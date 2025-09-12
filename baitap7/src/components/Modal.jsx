import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
