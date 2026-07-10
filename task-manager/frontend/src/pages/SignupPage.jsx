import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import SignupForm from "../features/auth/Signup";

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;