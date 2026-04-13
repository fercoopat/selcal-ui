import { useQuery } from "@tanstack/react-query";

import { COMMENTS_QUERIES } from "@/modules/comments/constants/comments-queries";
import { CommentsService } from "@/modules/comments/services";

export const useFindOneComment = (issueId: string | undefined, commentId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => CommentsService.findOne(issueId, commentId ?? ""),
    queryKey: COMMENTS_QUERIES.findOne(commentId ?? ""),
    enabled: !!issueId && !!commentId,
  });

  return {
    comment: data,
    error,
    isLoading,
  };
};
