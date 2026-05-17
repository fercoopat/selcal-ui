export const CALIBRATIONS_QUERIES = {
  findAll: ["CALIBRATIONS", "list"] as const,
  findOne: (id: string | undefined) => ["CALIBRATIONS", "detail", id] as const,
} as const;
