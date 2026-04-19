import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { AuthLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { AUTH_PATHS } from "@/modules/auth/constants/auth.paths";
import { SigninPage, SignupPage } from "@/modules/auth/pages";

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_PATHS.BASE,
    element: (
      <Suspense fallback={<PageLoader size="screen" />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: AUTH_PATHS.SIGNIN,
        Component: SigninPage,
      },
      {
        path: AUTH_PATHS.SIGNUP,
        Component: SignupPage,
      },
    ],
  },
];
