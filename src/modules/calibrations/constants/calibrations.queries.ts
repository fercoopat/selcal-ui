export const CALIBRATIONS_QUERIES = {
  all: ["calibrations"] as const,
  findAll: ["calibrations", "list"] as const,
  findOne: (id: string) => ["calibrations", "details", id] as const,
  calculate: ["calibrations", "calculate"] as const,
} as const;
