import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { CALIBRATIONS_QUERIES } from "@/modules/operations/calibrations/constants/calibrations.queries";
import { CalibrationsService } from "@/modules/operations/calibrations/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateCalibration = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (id: string | undefined) => CalibrationsService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CALIBRATIONS_QUERIES.findAll,
      });
      onSuccess?.();
      toast.success(t("calibrations:successDelete"));
    },
  });

  return { error, isLoading: isPending, deleteCalibration: mutate };
};
