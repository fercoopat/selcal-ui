const BASE_PATH = "/auth";

export const AUTH_PATHS = {
  BASE: BASE_PATH,

  SIGNIN: `${BASE_PATH}/signin`,

  SIGNUP: `${BASE_PATH}/signup`,
} as const;
