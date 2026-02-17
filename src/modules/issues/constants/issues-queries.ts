export const ISSUES_QUERIES = {
  findAll: ["issues:find-all"],

  findOne: (issueId: string | undefined) => {
    return [issueId, "issues:find-one"];
  },

  findByProject: (projectId: string | undefined) => {
    return [projectId, "issues:find-by-project-id"];
  },
} as const;
