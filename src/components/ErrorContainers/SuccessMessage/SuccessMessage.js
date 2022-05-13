import "./SuccessMessage.css";
import React from "react";
import Expire from "../Expire/Expire";

const SuccessMessage = ({ message }) => {
  return (
    <Expire delay={4000}>
      <div
        className="alert alert-success success-message"
        role="alert"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </Expire>
  );
};

export default SuccessMessage;
