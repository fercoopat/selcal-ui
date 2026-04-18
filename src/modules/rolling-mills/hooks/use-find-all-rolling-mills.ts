import { useQuery } from "@tanstack/react-query";

import { ROLLING_MILLS_QUERIES } from "@/modules/rolling-mills/constants";
import { RollingMillsService } from "@/modules/rolling-mills/services";

export const useFindAllRollingMills = () =>
  useQuery({
    queryKey: ROLLING_MILLS_QUERIES.findAll,
    queryFn: () => RollingMillsService.findAll(),
  });
