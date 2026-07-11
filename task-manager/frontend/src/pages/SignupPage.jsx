import { Navigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import SignupForm from "../features/auth/Signup";
import Loader from "../components/common/Loader/Loader";

import useAuth from "../context/useAuth";

const SignupPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;