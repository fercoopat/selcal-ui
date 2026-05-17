import type { CommonFields } from "@/shared/interfaces/common.interface";
import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";
import type { PROFILE_TYPE } from "@/modules/operations/calibrations/constants/profile-type.enum";

export interface Calibration extends CommonFields {
  description: string;
  steelCarbon: number;
  steelManganese: number;
  steelChromium: number;
  initialTemp: number;
  initialHeight: number;
  initialWidth: number;
  totalPasses: number;
  finishingPasses: number;
  profileType: PROFILE_TYPE;
  finalDimension: number;
  rollingMill: RollingMill;
}
