const InfoMessage = ({ message }) => {
  return (
    <div
      className="alert alert-info"
      role="alert"
      style={{ width: "80%", margin: "0 auto 2em auto" }}
    >
      {message}
    </div>
  );
};

export default InfoMessage;
