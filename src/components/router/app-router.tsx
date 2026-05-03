import { useRoutes } from "react-router";

import { mainRoutes } from "@/components/router/main-routes";
import { AccessControl } from "@/modules/auth/components/access-control";
import { authRoutes } from "@/modules/auth/routes";
import { usePreserveRoute } from "@/hooks/use-preserve-route";

const AppRouter = () => {
  usePreserveRoute();

  return useRoutes([
    {
      element: <AccessControl />,
      children: [...authRoutes, ...mainRoutes],
    },
  ]);
};
export default AppRouter;
