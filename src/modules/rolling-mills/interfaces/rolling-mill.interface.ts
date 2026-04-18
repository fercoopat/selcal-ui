import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface RollingMill extends CommonFields {
  code: string;
  name: string;
  millTypeId: string;
}
