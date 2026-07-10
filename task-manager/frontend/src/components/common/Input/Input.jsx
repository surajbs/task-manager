import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./Input.css";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  showToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const inputType =
    isPasswordField && showPassword
      ? "text"
      : type;

  return (
    <div className="input-group">
      {label && (
        <label>
          {label}
        </label>
      )}

      <div className="input-wrapper">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "input-error" : ""}
          {...props}
        />

        {isPasswordField && showToggle && (
          <button
            type="button"
            className="password-toggle"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <small>{error}</small>
      )}
    </div>
  );
};

export default Input;