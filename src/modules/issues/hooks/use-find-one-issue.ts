import { useQuery } from "@tanstack/react-query";

import { ISSUES_QUERIES } from "@/modules/issues/constants/issues-queries";
import { IssuesService } from "@/modules/issues/services";

export const useFindOneIssue = (issueId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => IssuesService.findOne(issueId ?? ""),
    queryKey: ISSUES_QUERIES.findOne(issueId ?? ""),
    enabled: !!issueId,
  });

  return {
    issue: data,
    error,
    isLoading,
  };
};
