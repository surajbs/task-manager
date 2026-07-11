import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

import useAuth from "../../../context/useAuth";

import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login, authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      api: "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    }

    setErrors((prev) => ({
      ...prev,
      ...validationErrors,
    }));

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData);

 if (result.success) {
  navigate("/dashboard", {
  replace: true,
});

return;
}

    setErrors((prev) => ({
      ...prev,
      api: result.message,
    }));
  };

  return (
    <>
      <div className="login-header">
        <h2>Welcome Back 👋</h2>

        <p>Sign in to continue managing your tasks.</p>
      </div>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoFocus
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showToggle
        />

        {errors.api && (
          <p className="login-api-error">
            {errors.api}
          </p>
        )}

        <div className="login-options">
          <button
            type="button"
            className="forgot-password-btn"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={authLoading}
        >
          Login
        </Button>
      </form>

      <div className="login-footer">
        <span>Don't have an account?</span>

        <Link to="/signup">
          Create Account
        </Link>
      </div>
    </>
  );
};

export default LoginForm;