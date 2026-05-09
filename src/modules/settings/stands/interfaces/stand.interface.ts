import type { CommonFields } from "@/shared/interfaces/common.interface";
import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";

export interface Stand extends CommonFields {
  position: number;
  isHorizontal: boolean;
  distanceToNextStand: number;
  rollingMill: RollingMill;
}
