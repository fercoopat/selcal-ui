import { useQuery } from "@tanstack/react-query";

import { CALIBRATIONS_QUERIES } from "@/modules/operations/calibrations/constants/calibrations.queries";
import { CalibrationsService } from "@/modules/operations/calibrations/services";

export const useFindAllCalibrations = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => CalibrationsService.findAll(),
    queryKey: CALIBRATIONS_QUERIES.findAll,
  });

  return { calibrations: data, error, isLoading };
};
