import { useQuery } from "@tanstack/react-query";

import { COMMENTS_QUERIES } from "@/modules/comments/constants/comments-queries";
import { CommentsService } from "@/modules/comments/services";

export const useFindOneComment = (commentId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => CommentsService.findOne(commentId ?? ""),
    queryKey: COMMENTS_QUERIES.findOne(commentId ?? ""),
    enabled: !!commentId,
  });

  return {
    comment: data,
    error,
    isLoading,
  };
};
