import type { CommonFields } from "@/shared/interfaces/common.interface";
import type { MillType } from "@/modules/settings/mill-types/interfaces/mill-type.interface";

export interface RollingMill extends CommonFields {
  name: string;
  distOvenStand: number;
  millType: MillType;
}
