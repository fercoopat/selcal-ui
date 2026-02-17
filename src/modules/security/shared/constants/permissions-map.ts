import { ISSUES_PERMISSIONS_VALUES } from "@/modules/issues/constants/issues.permissions";
import { PROJECTS_PERMISSIONS_VALUES } from "@/modules/projects/constants/projects-permissions";
import { USERS_PERMISSIONS } from "@/modules/security/users/constants/users-permissions";

export const PERMISSIONS_MAP = {
  // roles: ROLES_PERMISSIONS_VALUES,
  users: [USERS_PERMISSIONS.READ],
  issues: ISSUES_PERMISSIONS_VALUES,
  projects: PROJECTS_PERMISSIONS_VALUES,
};
