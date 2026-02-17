import { useQuery } from "@tanstack/react-query";

import { COMMENTS_QUERIES } from "@/modules/comments/constants/comments-queries";
import { CommentsService } from "@/modules/comments/services";

export const useFindCommentsByIssue = (issueId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => CommentsService.findAll(issueId),
    queryKey: COMMENTS_QUERIES.findByIssue(issueId),
    enabled: !!issueId,
  });

  return {
    comments: data,
    error,
    isLoading,
  };
};
