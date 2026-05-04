import { useQuery } from "@tanstack/react-query";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants/mill-types.queries";
import { MillTypesService } from "@/modules/settings/mill-types/services";

export const useFindAllMillTypes = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => MillTypesService.findAll(),
    queryKey: MILL_TYPES_QUERIES.findAll,
  });

  return {
    millTypes: data,
    error,
    isLoading,
  };
};
