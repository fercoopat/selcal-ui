import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Pass extends CommonFields {
  sequenceOrder: number;
  inputHeight: number;
  outputHeight: number;
  calculatedForce: number | null;
  calculatedPower: number | null;
  calibrationId: string;
}
