import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

import useAuth from "../../../context/useAuth";

import "./SignupForm.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const { signup, authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm your password.";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "Passwords do not match.";
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

    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
   navigate("/login", {
  replace: true,
});
    }

    setErrors((prev) => ({
      ...prev,
      api: result.message,
    }));
  };

  return (
    <>
      <div className="signup-header">
        <h2>Create Account</h2>

        <p>Create your TaskFlow account.</p>
      </div>

      <form
        className="signup-form"
        onSubmit={handleSubmit}
      >
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showToggle
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          showToggle
        />

        {errors.api && (
          <p className="signup-api-error">
            {errors.api}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          loading={authLoading}
        >
          Create Account
        </Button>
      </form>

      <div className="signup-footer">
        <span>Already have an account?</span>

        <Link to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default SignupForm;