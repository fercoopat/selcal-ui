import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

type Props = {
  path: string | undefined;
};
const AppBreadcrumbItem = ({ path }: Props) => {
  const { t } = useTranslation("breadcrumbs");

  if (!path) return null;

  return (
    <>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink asChild>
          <Link to={path}>{t(path)}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
};
export default memo(AppBreadcrumbItem);
