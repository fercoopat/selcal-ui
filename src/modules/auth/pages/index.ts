import { lazy } from "react";

export const SigninPage = lazy(
  () => import("@/modules/auth/pages/signin-page"),
);

export const SignupPage = lazy(
  () => import("@/modules/auth/pages/signup-page"),
);
