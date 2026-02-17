import { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

type Props = {
  path: string;
  notFoundRedirectTo: string;
};
const ModuleLayout = ({ path, notFoundRedirectTo }: Props) => {
  const { pathname } = useLocation();

  if (pathname === path) return <Navigate to={notFoundRedirectTo} />;

  return <Outlet />;
};
export default memo(ModuleLayout);
