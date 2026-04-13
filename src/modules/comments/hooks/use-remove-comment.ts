import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { COMMENTS_QUERIES } from "@/modules/comments/constants/comments-queries";
import { CommentsService } from "@/modules/comments/services";

type Params = {
  issueId: string | undefined;
  onSuccess?: () => void;
};

export const useRemoveComment = ({ issueId, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (commentId: string | undefined) =>
      CommentsService.remove(issueId, commentId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: COMMENTS_QUERIES.findByIssue(issueId),
      });

      onSuccess?.();
    },
  });

  const remove = useMemo(() => mutate, [mutate]);

  return {
    error,
    isLoading: isPending,
    remove,
  };
};
