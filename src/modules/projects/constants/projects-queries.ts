export const PROJECTS_QUERIES = {
  findAll: ["projects:find-all"],

  findOne: (projectId: string | undefined) => {
    return [projectId, "projects:find-one"];
  },
} as const;
