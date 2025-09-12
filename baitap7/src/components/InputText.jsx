import React from "react";

const InputText = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-text"
    />
  );
};

export default InputText;
