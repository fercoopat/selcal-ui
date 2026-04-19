import { useQuery } from "@tanstack/react-query";

import { PASS_GEOMETRY_TYPES_QUERIES } from "@/modules/settings/pass-geometry-types/constants";
import { PassGeometryTypesService } from "@/modules/settings/pass-geometry-types/services";

export const useFindOnePassGeometryType = (id: string) =>
  useQuery({
    queryKey: PASS_GEOMETRY_TYPES_QUERIES.findOne(id),
    queryFn: () => PassGeometryTypesService.findOne(id),
    enabled: !!id,
  });
