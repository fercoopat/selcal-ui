import { useQuery } from "@tanstack/react-query";

import { BEARINGS_QUERIES } from "@/modules/settings/bearings/constants/bearings.queries";
import { BearingsService } from "@/modules/settings/bearings/services";

export const useFindOneBearing = (bearingId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => BearingsService.findOne(bearingId),
    queryKey: BEARINGS_QUERIES.findOne(bearingId),
    enabled: !!bearingId,
  });

  return {
    bearing: data,
    error,
    isLoading,
  };
};
