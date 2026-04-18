import { useQuery } from "@tanstack/react-query";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants";
import { MillTypesService } from "@/modules/settings/mill-types/services";

export const useFindAllMillTypes = () =>
  useQuery({
    queryKey: MILL_TYPES_QUERIES.findAll,
    queryFn: () => MillTypesService.findAll(),
    select: (data) => [...data].sort((a, b) => a.sortOrder - b.sortOrder),
  });
