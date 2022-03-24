import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-border text-primary loading-spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
