import { Navigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import LoginForm from "../features/auth/Login";
import Loader from "../components/common/Loader/Loader";

import useAuth from "../context/useAuth";

const LoginPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;