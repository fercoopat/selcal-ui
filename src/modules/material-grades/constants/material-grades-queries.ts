export const MATERIAL_GRADES_QUERIES = {
  all: ["material-grades"] as const,
  findAll: ["material-grades", "list"] as const,
  findOne: (id: string) => ["material-grades", "details", id] as const,
} as const;
