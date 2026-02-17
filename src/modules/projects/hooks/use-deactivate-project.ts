import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { PROJECTS_QUERIES } from "@/modules/projects/constants/projects-queries";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import { ProjectsService } from "@/modules/projects/services";

type Params = {
  project: Project | undefined;
  onSuccess?: () => void;
};

export const useDeactivateProject = ({ project, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: () => ProjectsService.deactivate(project?.id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERIES.findAll,
      });
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERIES.findOne(project?.id),
      });

      toast.success(t("projects:successDeactivate"));

      onSuccess?.();
    },
  });

  return {
    error,
    isLoading: isPending,
    deactivate: mutate,
    reset,
  };
};
