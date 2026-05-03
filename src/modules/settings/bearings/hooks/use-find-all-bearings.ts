import { useQuery } from "@tanstack/react-query";

import { BEARINGS_QUERIES } from "@/modules/settings/bearings/constants/bearings.queries";
import { BearingsService } from "@/modules/settings/bearings/services";

export const useFindAllBearings = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => BearingsService.findAll(),
    queryKey: BEARINGS_QUERIES.findAll,
  });

  return {
    bearings: data,
    error,
    isLoading,
  };
};
