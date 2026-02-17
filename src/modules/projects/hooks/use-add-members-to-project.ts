import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { PROJECTS_QUERIES } from "@/modules/projects/constants/projects-queries";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import {
  addProjectMembersSchema,
  type AddProjectMembersPayload,
} from "@/modules/projects/schemas/add-project-members.schema";
import { ProjectsService } from "@/modules/projects/services";

const defaultValues: AddProjectMembersPayload = {
  userIds: [],
};

type Params = {
  project: Project | undefined;
  onSuccess?: () => void;
};

export const useAddMembersToProject = ({ project, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(addProjectMembersSchema),
    defaultValues,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (payload: AddProjectMembersPayload) => {
      return ProjectsService.addMembers(project?.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERIES.findOne(project?.id),
      });

      toast.success(t("projects:successUpdate"));

      onSuccess?.();

      resetForm();
    },
  });

  const onSubmit = useCallback(
    (payload: AddProjectMembersPayload) => {
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
