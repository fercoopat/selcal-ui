import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Material extends CommonFields {
  name: string;
  description?: string;
  coefficient: number;
}
