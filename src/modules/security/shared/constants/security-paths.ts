import { ROLES_PATHS } from "@/modules/security/roles/constants/roles-paths";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";

const BASE_PATH = "/security";

export const SECURITY_PATHS = {
  basePath: BASE_PATH,

  rolesPath: ROLES_PATHS.basePath,

  usersPath: USERS_PATHS.basePath,
} as const;
