import { useQuery } from "@tanstack/react-query";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants";
import { MillTypesService } from "@/modules/settings/mill-types/services";

export const useFindOneMillType = (id: string) =>
  useQuery({
    queryKey: MILL_TYPES_QUERIES.findOne(id),
    queryFn: () => MillTypesService.findOne(id),
    enabled: !!id,
  });
