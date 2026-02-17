export const ROLES_QUERIES = {
  findAll: ["roles:find-all"],

  findOne: (roleId: string | undefined) => {
    return [roleId, "roles:find-one"];
  },
} as const;
