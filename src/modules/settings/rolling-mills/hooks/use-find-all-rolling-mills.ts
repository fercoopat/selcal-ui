import { useQuery } from "@tanstack/react-query";

import { ROLLING_MILLS_QUERIES } from "@/modules/settings/rolling-mills/constants/rolling-mills.queries";
import { RollingMillsService } from "@/modules/settings/rolling-mills/services";

export const useFindAllRollingMills = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RollingMillsService.findAll(),
    queryKey: ROLLING_MILLS_QUERIES.findAll,
  });

  return {
    rollingMills: data,
    error,
    isLoading,
  };
};
