import { useQuery } from "@tanstack/react-query";

import { PASS_GEOMETRY_TYPES_QUERIES } from "@/modules/settings/pass-geometry-types/constants";
import { PassGeometryTypesService } from "@/modules/settings/pass-geometry-types/services";

export const useFindAllPassGeometryTypes = () =>
  useQuery({
    queryKey: PASS_GEOMETRY_TYPES_QUERIES.findAll,
    queryFn: () => PassGeometryTypesService.findAll(),
    select: (data) => [...data].sort((a, b) => a.sortOrder - b.sortOrder),
  });
