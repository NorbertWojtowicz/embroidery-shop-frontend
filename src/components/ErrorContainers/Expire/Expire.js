import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Expire = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, props.delay);
    return () => clearTimeout(timer);
  }, [props.delay]);

  return visible ? (
    <div>{props.children}</div>
  ) : (
    ReactDOM.unmountComponentAtNode(document.querySelector("#message-wr"))
  );
};

export default Expire;
