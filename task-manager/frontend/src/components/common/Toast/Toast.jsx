import "./Toast.css";

const Toast = ({
  show,
  message,
  type = "success",
  onClose,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        <span>{message}</span>

        <button
          className="toast-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;