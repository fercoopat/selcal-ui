import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { BEARINGS_QUERIES } from "@/modules/settings/bearings/constants/bearings.queries";
import { BearingsService } from "@/modules/settings/bearings/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateBearing = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (bearingId: string | undefined) => {
      return BearingsService.delete(bearingId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BEARINGS_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("bearings:successDelete"));
    },
  });

  return { error, isLoading: isPending, deleteBearing: mutate };
};
