const BASE_PATH = "/auth";

export const AUTH_PATHS = {
  basePath: BASE_PATH,

  signinPath: `${BASE_PATH}/signin`,

  signupPath: `${BASE_PATH}/signup`,
} as const;
