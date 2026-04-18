import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface MaterialGrade extends CommonFields {
  gradeCode: string;
  baseResistance: number;
  properties: Record<string, number>;
}
