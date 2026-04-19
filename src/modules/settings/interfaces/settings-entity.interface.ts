import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface SettingsEntity extends CommonFields {
  name: string;
  sortOrder: number;
}
