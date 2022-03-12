import "./SuccessMessage.css";
import React from "react";

const SuccessMessage = ({ message }) => {
  return (
    <div
      className="alert alert-success success-message"
      role="alert"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );
};

export default SuccessMessage;
