import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface MillType extends CommonFields {
  name: string;
  tempInitial: number;
  tempVariation: number;
}
