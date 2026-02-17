import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Project extends CommonFields {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  author: User;
  members: User[];
}
