import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ISSUE_PRIORITY } from "@/modules/issues/constants/issue-priority";
import { ISSUE_STATUS } from "@/modules/issues/constants/issue-status";
import { ISSUE_TYPE } from "@/modules/issues/constants/issue-type";
import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import {
  createIssueSchema,
  type CreateIssuePayload,
} from "@/modules/issues/schemas/create-issue.schema";
import { IssuesService } from "@/modules/issues/services";
import { zodResolver } from "@hookform/resolvers/zod";

const initValues: CreateIssuePayload = {
  assignedToId: "",
  estimatedHours: 0,
  actualHours: 0,
  priority: ISSUE_PRIORITY.MEDIUM,
  projectId: "",
  status: ISSUE_STATUS.TODO,
  title: "",
  type: ISSUE_TYPE.TASK,
  description: "",
  dueDate: null,
  doneDate: null,
  startDate: new Date(),
};

type Params = {
  projectId: string;
  issue?: Issue | undefined;
  onSuccess?: () => void;
};

export const useCreateIssueForm = ({ projectId, issue, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const defaultValues = useMemo<CreateIssuePayload>(
    () => ({
      ...initValues,
      ...issue,
      projectId,
      assignedToId: issue?.assignedTo?.id ?? initValues?.assignedToId,
      dueDate: issue?.dueDate ? new Date(issue?.dueDate) : initValues?.dueDate,
      doneDate: issue?.doneDate
        ? new Date(issue?.doneDate)
        : initValues?.doneDate,
      startDate: issue?.startDate
        ? new Date(issue?.startDate)
        : initValues?.startDate,
    }),
    [issue, projectId],
  );

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(createIssueSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (payload: CreateIssuePayload) => {
      if (issue?.id) return IssuesService.update(issue.id, payload);

      return IssuesService.create(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ISSUES_QUERIES.findByProject(projectId),
      });
      await queryClient.invalidateQueries({
        queryKey: ISSUES_QUERIES.findOne(issue?.id),
      });

      toast.success(
        t(issue?.id ? "issues:successUpdate" : "issues:successCreate"),
      );

      onSuccess?.();

      resetForm();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateIssuePayload) => {
      mutate(payload);
    },
    [mutate],
  );

  const reset = useCallback(() => {
    resetForm();
    resetMutation();
  }, [resetForm, resetMutation]);

  return {
    ...form,
    error,
    isLoading: isPending,
    onSubmit,
    reset,
  };
};
