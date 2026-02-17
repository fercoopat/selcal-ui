import { useQuery } from "@tanstack/react-query";

import { PROJECTS_QUERIES } from "@/modules/projects/constants/projects-queries";
import { ProjectsService } from "@/modules/projects/services";

export const useFindOneProject = (projectId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => ProjectsService.findOne(projectId ?? ""),
    queryKey: PROJECTS_QUERIES.findOne(projectId ?? ""),
    enabled: !!projectId,
  });

  return {
    project: data,
    error,
    isLoading,
  };
};
