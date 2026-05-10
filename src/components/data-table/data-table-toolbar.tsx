import { memo, useCallback, useMemo, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SEARCH_QUERY_KEY = "search" as const;

type Props = PropsWithChildren<{
  className?: string;
}>;
const DataTableToolbar = ({ children, className }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get(SEARCH_QUERY_KEY) ?? "",
    [searchParams],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchParams.set(SEARCH_QUERY_KEY, e?.target?.value?.trim());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 py-4",
        className,
      )}
    >
      <Input
        placeholder={`${t("common:search")}...`}
        value={search}
        onChange={handleSearch}
      />

      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
export default memo(DataTableToolbar);
