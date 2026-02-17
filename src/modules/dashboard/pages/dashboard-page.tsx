import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { useDashboardStatsReports } from "@/modules/dashboard/hooks/use-dashboard-stats-reports";
import { ISSUE_PRIORITY_COLOR_MAP } from "@/modules/issues/constants/issue-priority";
import { ISSUE_STATUS_COLOR_MAP } from "@/modules/issues/constants/issue-status";

const renderStat = (title: string, value?: number, unit?: string) => (
  <StatCard title={title} value={value} unit={unit} />
);

const DashboardPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useDashboardStatsReports();

  const renderBadge = useCallback(
    (
      items: Array<{ key: string; count: number }>,
      translateKey: string,
      colorMap?: Record<string, BadgeProps["variant"]>,
    ) =>
      items.map((item) => (
        <Badge
          key={item.key}
          variant={
            item.count > 0 ? (colorMap?.[item.key] ?? "default") : "secondary"
          }
          className="flex items-center gap-2"
        >
          <span className="capitalize">{t(`${translateKey}.${item.key}`)}</span>
          <span className="font-bold">{item.count}</span>
        </Badge>
      )),
    [t],
  );

  const projectChartData = useMemo(() => {
    const grouped: Record<string, Record<string, number>> = {};

    data?.issuesByProject?.forEach(({ projectName, status, count }) => {
      if (!grouped[projectName]) grouped[projectName] = {};
      grouped[projectName][status] = count;
    });

    return Object.entries(grouped).map(([projectName, statusCounts]) => ({
      name: projectName,
      ...statusCounts,
    }));
  }, [data?.issuesByProject]);

  const projectChartConfig = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(ISSUE_STATUS_COLOR_MAP).map(([status, variant]) => [
          status,
          {
            label: t(`issues:status.${status}`),
            color: `var(--${variant})`,
          },
        ]),
      ),
    [t],
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">{t("reports:title")}</h1>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {renderStat(t("reports:issues.totalIssues"), data?.totalIssues)}
        {renderStat(t("reports:issues.openIssues"), data?.openIssues)}
        {renderStat(t("reports:issues.closedIssues"), data?.closedIssues)}
        {renderStat(t("reports:projects.title"), data?.totalProjects)}
        {renderStat(
          t("reports:avgResolutionTime.title"),
          data?.avgResolutionTime,
          "h",
        )}
        {renderStat(t("reports:closureRate.title"), data?.closureRate, "%")}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {/* ISSUES BY STATUS */}
        <Card>
          <CardHeader>
            <CardTitle>{t("reports:issuesByStatus.title")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24" />
                ))
              : renderBadge(
                  data?.issuesByStatus.map((i) => ({
                    key: i.status,
                    count: i.count,
                  })) ?? [],
                  "issues:status",
                  ISSUE_STATUS_COLOR_MAP,
                )}
          </CardContent>
        </Card>

        {/* ISSUES BY PRIORITY */}
        <Card>
          <CardHeader>
            <CardTitle>{t("reports:issuesByPriority.title")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24" />
                ))
              : renderBadge(
                  data?.issuesByPriority.map((i) => ({
                    key: i.priority,
                    count: i.count,
                  })) ?? [],
                  "issues:priority",
                  ISSUE_PRIORITY_COLOR_MAP,
                )}
          </CardContent>
        </Card>
      </div>

      {/* ISSUES BY PROJECT - BarChart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("reports:issuesByProject.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ChartContainer
              config={projectChartConfig}
              className="min-h-62.5 w-full 2xl:max-h-72"
            >
              <BarChart data={projectChartData} stackOffset="expand">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" />}
                />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                {Object.keys(ISSUE_STATUS_COLOR_MAP).map((status) => (
                  <Bar
                    key={status}
                    dataKey={status}
                    stackId="a"
                    fill={
                      projectChartConfig[status]?.color ||
                      "var(--color-primary)"
                    }
                    radius={4}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default DashboardPage;
