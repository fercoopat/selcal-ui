const BASE_PATH = "/auth";

export const AUTH_PATHS = {
  BASE_PATH: BASE_PATH,

  signinPath: `${BASE_PATH}/signin`,

  signupPath: `${BASE_PATH}/signup`,
} as const;
