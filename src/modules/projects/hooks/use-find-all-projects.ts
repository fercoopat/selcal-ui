import { useQuery } from "@tanstack/react-query";

import { PROJECTS_QUERIES } from "@/modules/projects/constants/projects-queries";
import { ProjectsService } from "@/modules/projects/services";

export const useFindAllProjects = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => ProjectsService.findAll(),
    queryKey: PROJECTS_QUERIES.findAll,
  });

  return {
    projects: data,
    error,
    isLoading,
  };
};
