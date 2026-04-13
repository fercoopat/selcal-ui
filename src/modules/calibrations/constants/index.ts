/**
 * Query keys for TanStack Query calibration cache management
 */
export const CALIBRATIONS_QUERIES = {
  all: ["calibrations"] as const,
  findAll: ["calibrations", "list"] as const,
  findOne: (id: string) => ["calibrations", "details", id] as const,
  calculate: ["calibrations", "calculate"] as const,
  simulate: ["calibrations", "simulate"] as const,
  profiles: ["calibrations", "profiles"] as const,
  materials: ["calibrations", "materials"] as const,
} as const;

/**
 * API paths for calibration endpoints
 */
export const CALIBRATIONS_PATHS = {
  base: "/calibrations" as const,
  calculate: "/calibrations/calculate" as const,
  simulate: "/calibrations/simulate" as const,
  profiles: "/calibrations/profiles" as const,
  materials: "/calibrations/materials" as const,
} as const;
