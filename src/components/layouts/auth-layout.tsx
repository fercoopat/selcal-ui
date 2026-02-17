import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-6 md:p-10">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
