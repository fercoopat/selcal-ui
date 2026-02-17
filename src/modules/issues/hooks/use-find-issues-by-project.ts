import { useQuery } from "@tanstack/react-query";

import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import { IssuesService } from "@/modules/issues/services";

type Params = {
  projectId: string | undefined;
};

export const useFindIssuesByProject = ({ projectId }: Params) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => IssuesService.findByProject(projectId),
    queryKey: ISSUES_QUERIES.findByProject(projectId),
    enabled: !!projectId,
  });

  return {
    issues: data,
    error,
    isLoading,
  };
};
