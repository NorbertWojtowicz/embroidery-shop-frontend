import ReactDOM from "react-dom";
import SuccessMessage from "../ErrorContainers/SuccessMessage/SuccessMessage";
import React from "react";
import FormError from "../ErrorContainers/FormError/FormError";

class MessageUtil {
  static renderSuccessMessage(message) {
    ReactDOM.render(
      <SuccessMessage message={message} />,
      document.querySelector("#message-wr")
    );
  }

  static renderFormError(message) {
    ReactDOM.render(
      <FormError message={message} />,
      document.querySelector("#message-wr")
    );
  }
}

export default MessageUtil;
