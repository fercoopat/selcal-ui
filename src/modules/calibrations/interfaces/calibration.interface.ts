import type { CommonFields } from "@/shared/interfaces/common.interface";

export type CalibrationStatus = "DRAFT" | "APPROVED";

export interface Calibration extends CommonFields {
  name: string;
  targetDimension: number;
  status: CalibrationStatus;
  authorId: string;
  materialGradeId: string;
  rollingMillId: string;
}

/** Steel profile types supported by SELCAL-Web */
export type ProfileType = "round" | "square" | "hexagonal";

/** Steel grade/material classification */
export type SteelGrade = string;

export interface SteelProfile {
  type: ProfileType;
  area: number;
  temperature: number;
}

export interface RoundProfile extends SteelProfile {
  type: "round";
  diameter: number;
}

export interface SquareProfile extends SteelProfile {
  type: "square";
  side: number;
}

export interface HexagonalProfile extends SteelProfile {
  type: "hexagonal";
  flatDistance: number;
}

export type Profile = RoundProfile | SquareProfile | HexagonalProfile;

export interface Billet {
  height: number;
  width: number;
  temperature: number;
  material: SteelGrade;
  area: number;
}

export interface TargetProfile {
  type: ProfileType;
  dimensions: {
    diameter?: number;
    side?: number;
    flatDistance?: number;
  };
  temperature: number;
}

export interface CalibrationInput {
  billet: Billet;
  target: TargetProfile;
  maxElongation?: number;
  passes?: number;
}

export interface PassResult {
  passNumber: number;
  height: number;
  width: number;
  area: number;
  elongation: number;
  areaReduction: number;
  rollingForce: number;
  torque: number;
  power: number;
  temperature: number;
  meanPressure: number;
}

export interface CalibrationResult {
  input: CalibrationInput;
  passes: PassResult[];
  totalPasses: number;
  totalPower: number;
  finalArea: number;
  totalElongation: number;
}

export interface SimulationComparison {
  baseline: CalibrationResult;
  modified: CalibrationResult;
  delta: {
    powerDifference: number;
    passesDifference: number;
    forceDifference: number;
  };
}
