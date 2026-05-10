import type { CommonFields } from "@/shared/interfaces/common.interface";
import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";
import type { Material } from "@/modules/settings/materials/interfaces/material.interface";
import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";

export interface Roller extends CommonFields {
  name: string;
  diameter: number;
  diameterNeck: number;
  length: number;
  lengthNeck: number;
  stand: Stand;
  material: Material | null;
  bearing: Bearing | null;
}