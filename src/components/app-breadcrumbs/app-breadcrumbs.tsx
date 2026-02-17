import { Fragment, useMemo } from "react";
import { useLocation } from "react-router";

import AppBreadcrumbItem from "@/components/app-breadcrumbs/app-breadcrumb-item";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AppBreadcrumbs = () => {
  const { pathname } = useLocation();

  const pathsArray = useMemo(
    () => pathname?.split("/")?.filter(Boolean),
    [pathname],
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathsArray?.map((path, index) => {
          return (
            <Fragment key={index}>
              <AppBreadcrumbItem key={index} path={path} />

              {index !== pathsArray?.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default AppBreadcrumbs;
