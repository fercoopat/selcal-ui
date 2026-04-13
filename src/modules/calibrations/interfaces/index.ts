/**
 * Steel profile types supported by SELCAL-Web
 */
export type ProfileType = "round" | "square" | "hexagonal";

/**
 * Steel grade/material classification
 */
export type SteelGrade = string; // e.g., "AISI 1020", "AISI 1045", etc.

/**
 * Represents a steel profile with its geometric properties
 */
export interface SteelProfile {
  type: ProfileType;
  /** Cross-sectional area in mm² */
  area: number;
  /** Temperature in °C */
  temperature: number;
}

/**
 * Round profile specific properties
 */
export interface RoundProfile extends SteelProfile {
  type: "round";
  /** Diameter in mm */
  diameter: number;
}

/**
 * Square profile specific properties
 */
export interface SquareProfile extends SteelProfile {
  type: "square";
  /** Side length in mm */
  side: number;
}

/**
 * Hexagonal profile specific properties
 */
export interface HexagonalProfile extends SteelProfile {
  type: "hexagonal";
  /** Distance between opposite flats in mm */
  flatDistance: number;
}

/**
 * Union type for all profile variants
 */
export type Profile = RoundProfile | SquareProfile | HexagonalProfile;

/**
 * Initial billet input data for calibration
 */
export interface Billet {
  /** Initial height in mm */
  height: number;
  /** Initial width in mm */
  width: number;
  /** Initial temperature in °C */
  temperature: number;
  /** Steel grade */
  material: SteelGrade;
  /** Initial cross-sectional area in mm² */
  area: number;
}

/**
 * Target profile specification for the final pass
 */
export interface TargetProfile {
  type: ProfileType;
  /** Final dimensions based on profile type */
  dimensions: {
    diameter?: number; // for round
    side?: number; // for square
    flatDistance?: number; // for hexagonal
  };
  /** Target temperature in °C */
  temperature: number;
}

/**
 * Calculation parameters for the calibration wizard
 */
export interface CalibrationInput {
  billet: Billet;
  target: TargetProfile;
  /** Maximum elongation coefficient per pass (default: 1.3) */
  maxElongation?: number;
  /** Number of passes (calculated if not provided) */
  passes?: number;
}

/**
 * Results for a single rolling pass
 */
export interface PassResult {
  /** Pass number (1-indexed) */
  passNumber: number;
  /** Height after pass in mm */
  height: number;
  /** Width after pass in mm */
  width: number;
  /** Cross-sectional area in mm² */
  area: number;
  /** Elongation coefficient */
  elongation: number;
  /** Area reduction percentage */
  areaReduction: number;
  /** Rolling force in kN */
  rollingForce: number;
  /** Torque in kN·m */
  torque: number;
  /** Power requirement in kW */
  power: number;
  /** Temperature after pass in °C */
  temperature: number;
  /** Mean pressure in MPa */
  meanPressure: number;
}

/**
 * Complete calibration sequence result
 */
export interface CalibrationResult {
  input: CalibrationInput;
  /** Array of pass results */
  passes: PassResult[];
  /** Total number of passes */
  totalPasses: number;
  /** Total power requirement in kW */
  totalPower: number;
  /** Final profile area in mm² */
  finalArea: number;
  /** Total elongation coefficient */
  totalElongation: number;
}

/**
 * What-if simulation comparison
 */
export interface SimulationComparison {
  baseline: CalibrationResult;
  modified: CalibrationResult;
  /** Differences summary */
  delta: {
    powerDifference: number;
    passesDifference: number;
    forceDifference: number;
  };
}
