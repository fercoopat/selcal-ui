import type { Role } from "@/modules/security/roles/interfaces/role.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface User extends CommonFields {
  email: string;
  firstName: string;
  lastName: string;
  lastLogin?: string;
  role: Role;
  avatar?: string;
}
