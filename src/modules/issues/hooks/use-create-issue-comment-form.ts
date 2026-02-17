import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { COMMENTS_QUERIES } from "@/modules/comments/constants/comments-queries";
import type { Comment } from "@/modules/comments/interfaces/comment.interface";
import {
  createCommentSchema,
  type CreateCommentPayload,
} from "@/modules/comments/schemas/create-comment.schema";
import { CommentsService } from "@/modules/comments/services";
import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";

type Params = {
  issue: Issue | undefined;
  comment?: Comment;
  onSuccess?: () => void;
};

export const useCreateIssueCommentForm = ({
  issue,
  comment,
  onSuccess,
}: Params) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const defaultValues = useMemo<CreateCommentPayload>(
    () => ({
      content: comment?.content ?? "",
      files: [],
    }),
    [comment?.content],
  );

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(createCommentSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (payload: CreateCommentPayload) => {
      if (comment?.id) {
        return CommentsService.update(issue?.id, comment.id, {
          content: payload.content,
        });
      }

      return CommentsService.create(issue?.id, {
        content: payload.content,
        files: payload.files || [],
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: COMMENTS_QUERIES.findByIssue(issue?.id),
      });

      if (comment?.id) {
        await queryClient.invalidateQueries({
          queryKey: COMMENTS_QUERIES.findOne(comment.id),
        });
      }

      if (issue?.id) {
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERIES.findOne(issue.id),
        });
      }

      toast.success(
        comment?.id ? t("comments:successUpdate") : t("comments:successCreate"),
      );

      onSuccess?.();

      resetForm();
    },

    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : comment?.id
            ? "Error al actualizar el comentario"
            : "Error al crear el comentario";

      toast.error(message);
    },
  });

  const onSubmit = useCallback(
    (payload: CreateCommentPayload) => {
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
