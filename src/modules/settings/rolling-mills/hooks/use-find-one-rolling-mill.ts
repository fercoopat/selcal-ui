import { useQuery } from "@tanstack/react-query";

import { ROLLING_MILLS_QUERIES } from "@/modules/settings/rolling-mills/constants/rolling-mills.queries";
import { RollingMillsService } from "@/modules/settings/rolling-mills/services";

export const useFindOneRollingMill = (rollingMillId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RollingMillsService.findOne(rollingMillId),
    queryKey: ROLLING_MILLS_QUERIES.findOne(rollingMillId),
    enabled: !!rollingMillId,
  });

  return {
    rollingMill: data,
    error,
    isLoading,
  };
};
