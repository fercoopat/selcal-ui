import { Suspense, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { PageLoader } from "@/components/loaders";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TabComponent = React.LazyExoticComponent<React.ComponentType>;

export type DetailsTab = {
  title: string;
  component: TabComponent;
  className?: string;
};

type Params<T extends string> = {
  tabs: Record<T, DetailsTab>;
  defaultTab: T;
  className?: string;
  paramKey?: string;
};

export const useDetailsTabs = <T extends string>({
  tabs,
  defaultTab,
  className,
  paramKey = "tab",
}: Params<T>) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo<T>(
    () => (searchParams.get(paramKey) as T) || defaultTab,
    [searchParams, paramKey, defaultTab],
  );

  const tabEntries = useMemo(
    () => Object.entries(tabs) as [T, DetailsTab][],
    [tabs],
  );

  const handleTabChange = useCallback(
    (value: string) => {
      searchParams.set(paramKey, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, paramKey],
  );

  const TabsComponent = useCallback(() => {
    return (
      <div className={cn("w-full", className)}>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            {tabEntries.map(([value, { title }]) => (
              <TabsTrigger key={value} value={value}>
                {t(title)}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabEntries.map(([value, { component: TabComponent, className }]) => (
            <TabsContent key={value} value={value}>
              <Card className={cn("w-full", className)}>
                <Suspense fallback={<PageLoader size="content" />}>
                  <TabComponent />
                </Suspense>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }, [activeTab, className, handleTabChange, t, tabEntries]);

  return {
    activeTab,
    TabsComponent,
    setActiveTab: handleTabChange,
  };
};
