import type { CommonFields } from "@/shared/interfaces/common.interface";
import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";

export interface Engine extends CommonFields {
  name: string;
  power: number;
  speed: number;
  transmission: number;
  revMax: number;
  revMin: number;
  stand: Stand | null;
}