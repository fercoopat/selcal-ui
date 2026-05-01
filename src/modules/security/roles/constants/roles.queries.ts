export const ROLES_QUERIES = {
  all: ["ROLES"] as const,
  list: ["ROLES", "list"] as const,
  detail: (id: string) => ["ROLES", "detail", id] as const,
  findAll: ["ROLES", "list"] as const,
  findOne: (id: string) => ["ROLES", "detail", id] as const,
} as const;
