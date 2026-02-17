import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Role extends CommonFields {
  name: string;
  description: string;
  permissions: string[];
}
