export const USERS_QUERIES = {
  findAll: ["users:find-all"],

  findNonAdmins: ["users:find-non-admins"],

  findOne: (userId: string | undefined) => {
    return [userId, "users:find-one"];
  },
} as const;
