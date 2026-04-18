import { useQuery } from "@tanstack/react-query";

import { ROLLING_MILLS_QUERIES } from "@/modules/rolling-mills/constants";
import { RollingMillsService } from "@/modules/rolling-mills/services";

export const useFindOneRollingMill = (id: string) =>
  useQuery({
    queryKey: ROLLING_MILLS_QUERIES.findOne(id),
    queryFn: () => RollingMillsService.findOne(id),
    enabled: !!id,
  });
