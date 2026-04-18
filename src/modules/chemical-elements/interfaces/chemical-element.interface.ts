import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface ChemicalElement extends CommonFields {
  symbol: string;
  name: string;
  tableNumber: number;
}
