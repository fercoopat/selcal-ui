import { LoginForm } from "@/modules/auth/components/login-form";
import { useLoginForm } from "@/modules/auth/hooks/use-login-form";

const SigninPage = () => {
  const form = useLoginForm();

  return (
    <div className="w-full max-w-sm">
      <LoginForm {...form} />
    </div>
  );
};
export default SigninPage;
