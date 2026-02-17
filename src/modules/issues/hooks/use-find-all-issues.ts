import { useQuery } from "@tanstack/react-query";

import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import { IssuesService } from "@/modules/issues/services";

export const useFindAllIssues = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => IssuesService.findAll(),
    queryKey: ISSUES_QUERIES.findAll,
  });

  return {
    issues: data,
    error,
    isLoading,
  };
};
