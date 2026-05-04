export const MATERIALS_QUERIES = {
  ALL: ["MATERIALS"] as const,
  LIST: ["MATERIALS", "list"] as const,
  DETAILS: (id: string | undefined) => ["MATERIALS", "detail", id] as const,
  FIND_ONE: (id: string | undefined) => ["MATERIALS", "detail", id] as const,
} as const;
