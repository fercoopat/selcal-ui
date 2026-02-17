export const ENV_KEYS = {
  BACKEND_URL: "VITE_BACKEND_URL",
  API_PREFIX: "VITE_API_PREFIX",
} as const;

export type EnvKey = (typeof ENV_KEYS)[keyof typeof ENV_KEYS];

export const getEnv = <TEnv = string>(
  key: EnvKey,
  defaultValue?: TEnv,
): TEnv => {
  const value = import.meta.env[key];

  if (!value) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Env with key: ${key} don't have a value!`);
  }

  return value as TEnv;
};
