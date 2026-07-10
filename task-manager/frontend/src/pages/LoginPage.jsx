import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import LoginForm from "../features/auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;