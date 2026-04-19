import { ROLES_PATHS } from "@/modules/security/roles/constants/roles-paths";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";

const BASE_PATH = "/security";

export const SECURITY_PATHS = {
  BASE_PATH: BASE_PATH,

  rolesPath: ROLES_PATHS.LIST,

  usersPath: USERS_PATHS.BASE_PATH,
} as const;
