import type { ProfileType } from "@/modules/operations/calibrations/constants/profile-type.enum";
import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

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
  profileType: ProfileType;
  finalDimension: number;
  rollingMill: RollingMill;
}
