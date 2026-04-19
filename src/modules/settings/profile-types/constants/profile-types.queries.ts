export const PROFILE_TYPES_QUERIES = {
  all: ["profile-types"] as const,
  findAll: ["profile-types", "list"] as const,
  findOne: (id: string) => ["profile-types", "details", id] as const,
} as const;
