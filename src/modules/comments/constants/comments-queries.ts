export const COMMENTS_QUERIES = {
  findAll: ["comments:find-all"],

  findOne: (commentId: string | undefined) => {
    return [commentId, "comments:find-one"];
  },

  findByIssue: (issueId: string | undefined) => {
    return [issueId, "comments:find-by-issue-id"];
  },
} as const;
