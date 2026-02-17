import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { IssueStatus } from "@/modules/issues/constants/issue-status";
import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import { IssuesService } from "@/modules/issues/services";

type Params = {
  issue: Issue | undefined;
  onSuccess?: () => void;
};

export const useUpdateIssueStatus = ({ issue, onSuccess }: Params) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (status: IssueStatus) =>
      IssuesService.updateStatus(issue?.id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ISSUES_QUERIES.findAll });
      await queryClient.invalidateQueries({
        queryKey: ISSUES_QUERIES.findOne(issue?.id),
      });
      await queryClient.invalidateQueries({
        queryKey: ISSUES_QUERIES.findByProject(issue?.project.id),
      });

      toast.success(t("issues:successUpdate"));

      onSuccess?.();
    },
  });

  return {
    error,
    isLoading: isPending,
    updateStatus: mutate,
  };
};
