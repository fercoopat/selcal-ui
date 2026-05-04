import { useQuery } from "@tanstack/react-query";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants/mill-types.queries";
import { MillTypesService } from "@/modules/settings/mill-types/services";

export const useFindOneMillType = (millTypeId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => MillTypesService.findOne(millTypeId),
    queryKey: MILL_TYPES_QUERIES.findOne(millTypeId),
    enabled: !!millTypeId,
  });

  return {
    millType: data,
    error,
    isLoading,
  };
};
