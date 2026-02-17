import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { PROJECTS_QUERIES } from "@/modules/projects/constants/projects-queries";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import {
  createProjectSchema,
  type CreateProjectPayload,
} from "@/modules/projects/schemas/create-project.schema";
import { ProjectsService } from "@/modules/projects/services";

const initValues: CreateProjectPayload = {
  name: "",
  description: "",
  endDate: null,
  startDate: null,
};

type Params = {
  project?: Project;
  onSuccess?: () => void;
};

export const useCreateProjectForm = ({ project, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const defaultValues = useMemo<CreateProjectPayload>(
    () => ({
      ...initValues,
      ...project,
    }),
    [project],
  );

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (payload: CreateProjectPayload) => {
      if (project?.id) return ProjectsService.update(project.id, payload);

      return ProjectsService.create(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERIES.findAll,
      });
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERIES.findOne(project?.id),
      });

      toast.success(
        t(!project?.id ? "projects:successCreate" : "projects:successUpdate"),
      );

      onSuccess?.();

      resetForm();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateProjectPayload) => {
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
