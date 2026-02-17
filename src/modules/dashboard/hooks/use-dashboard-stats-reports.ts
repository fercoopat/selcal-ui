import { useQuery } from "@tanstack/react-query";

import { REPORTS_QUERIES } from "@/modules/dashboard/constants/reports.queries";
import { ReportsService } from "@/modules/dashboard/services";

export const useDashboardStatsReports = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => ReportsService.getDashboardStats(),
    queryKey: REPORTS_QUERIES.dashboardStats,
  });

  return {
    data,
    error,
    isLoading,
  };
};
