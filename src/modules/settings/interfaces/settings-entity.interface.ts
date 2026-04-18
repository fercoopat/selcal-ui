import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface SettingsEntity extends CommonFields {
  code: string;
  name: string;
  description?: string;
  sortOrder: number;
}
