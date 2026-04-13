import type { ProfileType, SteelGrade } from "@/modules/calibrations/interfaces";

/**
 * Available steel grades with their properties
 */
export const STEEL_GRADES: Record<
  SteelGrade,
  {
    name: string;
    yieldStrength: number; // MPa at room temperature
    density: number; // g/cm³
    description: string;
  }
> = {
  "AISI 1020": {
    name: "AISI 1020",
    yieldStrength: 350,
    density: 7.87,
    description: "Low carbon steel, good ductility",
  },
  "AISI 1045": {
    name: "AISI 1045",
    yieldStrength: 530,
    density: 7.85,
    description: "Medium carbon steel, higher strength",
  },
  "AISI 1018": {
    name: "AISI 1018",
    yieldStrength: 370,
    density: 7.87,
    description: "Low carbon steel, excellent weldability",
  },
  "AISI 4140": {
    name: "AISI 4140",
    yieldStrength: 655,
    density: 7.85,
    description: "Chromium-molybdenum alloy steel",
  },
  "AISI 1008": {
    name: "AISI 1008",
    yieldStrength: 285,
    density: 7.87,
    description: "Low carbon steel for cold forming",
  },
} as const;

/**
 * Standard round profile sizes (mm)
 */
export const ROUND_PROFILES: { diameter: number; label: string }[] = [
  { diameter: 6, label: "Ø6 mm" },
  { diameter: 8, label: "Ø8 mm" },
  { diameter: 10, label: "Ø10 mm" },
  { diameter: 12, label: "Ø12 mm" },
  { diameter: 14, label: "Ø14 mm" },
  { diameter: 16, label: "Ø16 mm" },
  { diameter: 18, label: "Ø18 mm" },
  { diameter: 20, label: "Ø20 mm" },
  { diameter: 22, label: "Ø22 mm" },
  { diameter: 25, label: "Ø25 mm" },
  { diameter: 28, label: "Ø28 mm" },
  { diameter: 30, label: "Ø30 mm" },
  { diameter: 32, label: "Ø32 mm" },
  { diameter: 35, label: "Ø35 mm" },
  { diameter: 38, label: "Ø38 mm" },
  { diameter: 40, label: "Ø40 mm" },
  { diameter: 45, label: "Ø45 mm" },
  { diameter: 50, label: "Ø50 mm" },
  { diameter: 55, label: "Ø55 mm" },
  { diameter: 60, label: "Ø60 mm" },
  { diameter: 65, label: "Ø65 mm" },
  { diameter: 70, label: "Ø70 mm" },
  { diameter: 75, label: "Ø75 mm" },
  { diameter: 80, label: "Ø80 mm" },
  { diameter: 85, label: "Ø85 mm" },
  { diameter: 90, label: "Ø90 mm" },
  { diameter: 95, label: "Ø95 mm" },
  { diameter: 100, label: "Ø100 mm" },
];

/**
 * Standard square profile sizes (mm)
 */
export const SQUARE_PROFILES: { side: number; label: string }[] = [
  { side: 6, label: "6×6 mm" },
  { side: 8, label: "8×8 mm" },
  { side: 10, label: "10×10 mm" },
  { side: 12, label: "12×12 mm" },
  { side: 14, label: "14×14 mm" },
  { side: 16, label: "16×16 mm" },
  { side: 18, label: "18×18 mm" },
  { side: 20, label: "20×20 mm" },
  { side: 22, label: "22×22 mm" },
  { side: 25, label: "25×25 mm" },
  { side: 28, label: "28×28 mm" },
  { side: 30, label: "30×30 mm" },
  { side: 32, label: "32×32 mm" },
  { side: 35, label: "35×35 mm" },
  { side: 38, label: "38×38 mm" },
  { side: 40, label: "40×40 mm" },
  { side: 45, label: "45×45 mm" },
  { side: 50, label: "50×50 mm" },
  { side: 55, label: "55×55 mm" },
  { side: 60, label: "60×60 mm" },
  { side: 65, label: "65×65 mm" },
  { side: 70, label: "70×70 mm" },
  { side: 75, label: "75×75 mm" },
  { side: 80, label: "80×80 mm" },
  { side: 85, label: "85×85 mm" },
  { side: 90, label: "90×90 mm" },
  { side: 95, label: "95×95 mm" },
  { side: 100, label: "100×100 mm" },
];

/**
 * Standard hexagonal profile sizes (mm) - distance between flats
 */
export const HEXAGONAL_PROFILES: { flatDistance: number; label: string }[] = [
  { flatDistance: 6, label: "H6 mm" },
  { flatDistance: 8, label: "H8 mm" },
  { flatDistance: 10, label: "H10 mm" },
  { flatDistance: 12, label: "H12 mm" },
  { flatDistance: 14, label: "H14 mm" },
  { flatDistance: 16, label: "H16 mm" },
  { flatDistance: 18, label: "H18 mm" },
  { flatDistance: 20, label: "H20 mm" },
  { flatDistance: 22, label: "H22 mm" },
  { flatDistance: 24, label: "H24 mm" },
  { flatDistance: 25, label: "H25 mm" },
  { flatDistance: 27, label: "H27 mm" },
  { flatDistance: 30, label: "H30 mm" },
  { flatDistance: 32, label: "H32 mm" },
  { flatDistance: 35, label: "H35 mm" },
  { flatDistance: 38, label: "H38 mm" },
  { flatDistance: 40, label: "H40 mm" },
  { flatDistance: 45, label: "H45 mm" },
  { flatDistance: 50, label: "H50 mm" },
  { flatDistance: 55, label: "H55 mm" },
  { flatDistance: 60, label: "H60 mm" },
  { flatDistance: 65, label: "H65 mm" },
  { flatDistance: 70, label: "H70 mm" },
  { flatDistance: 75, label: "H75 mm" },
  { flatDistance: 80, label: "H80 mm" },
];

/**
 * Get profiles by type
 */
export function getProfilesByType(type: ProfileType) {
  switch (type) {
    case "round":
      return ROUND_PROFILES;
    case "square":
      return SQUARE_PROFILES;
    case "hexagonal":
      return HEXAGONAL_PROFILES;
  }
}

/**
 * Get available profile types
 */
export const PROFILE_TYPES: { value: ProfileType; label: string }[] = [
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "hexagonal", label: "Hexagonal" },
];

/**
 * Get available steel grades as selectable options
 */
export const STEEL_GRADE_OPTIONS = Object.keys(STEEL_GRADES).map((grade) => ({
  value: grade,
  label: `${grade} - ${STEEL_GRADES[grade as SteelGrade].description}`,
}));
