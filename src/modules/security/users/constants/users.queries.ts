export const USERS_QUERIES = {
  all: ["USERS"] as const,
  list: ["USERS", "list"] as const,
  detail: (id: string) => ["USERS", "detail", id] as const,
  findAll: ["USERS", "list"] as const,
  findOne: (id: string) => ["USERS", "detail", id] as const,
} as const;
