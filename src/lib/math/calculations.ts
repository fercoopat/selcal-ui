import {
  divide,
  multiply,
  pow,
  sqrt,
  pi,
  round,
} from "mathjs";

/**
 * Precision for rounding results (4 decimal places)
 */
const PRECISION = 4;

/**
 * Round a number to the configured precision
 */
export function roundResult(value: number): number {
  return Number(round(value, PRECISION));
}

/**
 * Calculate cross-sectional area for a round profile
 * @param diameter - Diameter in mm
 * @returns Area in mm²
 */
export function calculateRoundArea(diameter: number): number {
  const area = multiply(divide(pi, 4), pow(diameter, 2)) as number;
  return roundResult(area);
}

/**
 * Calculate cross-sectional area for a square profile
 * @param side - Side length in mm
 * @returns Area in mm²
 */
export function calculateSquareArea(side: number): number {
  return roundResult(multiply(side, side) as number);
}

/**
 * Calculate cross-sectional area for a hexagonal profile
 * @param flatDistance - Distance between opposite flats in mm
 * @returns Area in mm²
 */
export function calculateHexagonalArea(flatDistance: number): number {
  const area = multiply(divide(sqrt(3), 2), pow(flatDistance, 2)) as number;
  return roundResult(area);
}

/**
 * Calculate area based on profile type and dimensions
 */
export function calculateProfileArea(
  type: "round" | "square" | "hexagonal",
  dimensions: { diameter?: number; side?: number; flatDistance?: number },
): number {
  switch (type) {
    case "round":
      return calculateRoundArea(dimensions.diameter!);
    case "square":
      return calculateSquareArea(dimensions.side!);
    case "hexagonal":
      return calculateHexagonalArea(dimensions.flatDistance!);
  }
}

/**
 * Calculate elongation coefficient
 */
export function calculateElongation(
  initialArea: number,
  finalArea: number,
): number {
  if (finalArea === 0) throw new Error("Final area cannot be zero");
  return roundResult(divide(initialArea, finalArea) as number);
}

/**
 * Calculate area reduction percentage
 */
export function calculateAreaReduction(
  initialArea: number,
  finalArea: number,
): number {
  if (initialArea === 0) throw new Error("Initial area cannot be zero");
  const reduction = multiply(
    divide(initialArea - finalArea, initialArea),
    100,
  ) as number;
  return roundResult(reduction);
}

/**
 * Calculate mean height for a profile
 */
export function calculateMeanHeight(area: number): number {
  return roundResult(sqrt(area) as number);
}

/**
 * Calculate mean width for a profile
 */
export function calculateMeanWidth(area: number): number {
  return roundResult(sqrt(area) as number);
}

/**
 * Calculate rolling force (simplified model)
 */
export function calculateRollingForce(
  area: number,
  yieldStrength: number,
  frictionCoefficient: number = 0.3,
): number {
  const force = multiply(
    multiply(yieldStrength, area),
    frictionCoefficient,
  ) as number;
  return roundResult(divide(force, 1000) as number);
}

/**
 * Calculate torque
 */
export function calculateTorque(
  rollingForce: number,
  rollDiameter: number,
): number {
  const radius = divide(rollDiameter, 2) as number;
  const torque = multiply(rollingForce, radius) as number;
  return roundResult(divide(torque, 1000) as number);
}

/**
 * Calculate power requirement
 */
export function calculatePower(
  torque: number,
  rpm: number,
  efficiency: number = 0.85,
): number {
  const angularVelocity = multiply(multiply(2, pi), divide(rpm, 60)) as number;
  const power = divide(multiply(torque, angularVelocity), efficiency) as number;
  return roundResult(power);
}

/**
 * Calculate temperature-dependent yield strength
 */
export function calculateTemperatureDependentYieldStrength(
  baseYieldStrength: number,
  temperature: number,
  referenceTemp: number = 20,
  reductionFactor: number = 0.0005,
): number {
  const tempDifference = temperature - referenceTemp;
  const reduction = multiply(
    multiply(baseYieldStrength, tempDifference),
    reductionFactor,
  ) as number;
  const adjustedStrength = baseYieldStrength - (reduction as number);
  const minValue = baseYieldStrength * 0.1;
  return roundResult(Math.max(adjustedStrength, minValue));
}

/**
 * Calculate number of passes needed
 */
export function calculateNumberOfPasses(
  initialArea: number,
  finalArea: number,
  maxElongation: number = 1.3,
): number {
  const totalElongation = divide(initialArea, finalArea) as number;
  const passes = Math.ceil(
    Math.log(totalElongation as number) / Math.log(maxElongation),
  );
  return Math.max(1, passes);
}

/**
 * Calculate area per pass (geometric progression)
 */
export function calculateAreaPerPass(
  initialArea: number,
  finalArea: number,
  passNumber: number,
  totalPasses: number,
): number {
  const ratio = pow(divide(finalArea, initialArea), divide(1, totalPasses)) as number;
  const area = multiply(initialArea, pow(ratio, passNumber)) as number;
  return roundResult(area);
}

/**
 * Calculate mean pressure using Sims formula (simplified)
 */
export function calculateMeanPressure(
  yieldStrength: number,
  contactLength: number,
  meanHeight: number,
): number {
  const Q = multiply(
    1.0,
    multiply(0.8, divide(contactLength, meanHeight)),
  ) as number;
  const pressure = multiply(yieldStrength, Math.max(Q as number, 1)) as number;
  return roundResult(pressure);
}

/**
 * Validate physical constraints for rolling
 */
export function validateRollingConstraints(
  elongation: number,
  maxElongation: number,
  force: number,
  maxForce: number,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (elongation > maxElongation) {
    errors.push(`Elongation ${elongation} exceeds maximum ${maxElongation}`);
  }

  if (force > maxForce) {
    errors.push(`Rolling force ${force}kN exceeds maximum ${maxForce}kN`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
