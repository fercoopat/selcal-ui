import { useQuery } from "@tanstack/react-query";

import { CALIBRATIONS_QUERIES } from "@/modules/operations/calibrations/constants/calibrations.queries";
import { CalibrationsService } from "@/modules/operations/calibrations/services";

export const useFindOneCalibration = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => CalibrationsService.findOne(id),
    queryKey: CALIBRATIONS_QUERIES.findOne(id),
    enabled: !!id,
  });

  return { calibration: data, error, isLoading };
};
