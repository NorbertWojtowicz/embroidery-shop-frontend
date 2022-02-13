import './ErrorMessage.css';

const ErrorMessage = ({message}) => {
    return (
        <div className="alert alert-danger error-message" role="alert">
            {message}
        </div>
    )
}

export default ErrorMessage;