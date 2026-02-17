import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import { IssuesService } from "@/modules/issues/services";

type Params = {
  issue: Issue | undefined;
  onSuccess?: () => void;
};

export const useRemoveIssue = ({ issue, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: () => IssuesService.remove(issue?.id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ISSUES_QUERIES.findAll });

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
