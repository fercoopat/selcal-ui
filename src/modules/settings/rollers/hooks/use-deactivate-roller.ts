import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ROLLERS_QUERIES } from "@/modules/settings/rollers/constants/rollers.queries";
import { RollersService } from "@/modules/settings/rollers/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateRoller = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (rollerId: string | undefined) => {
      return RollersService.delete(rollerId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROLLERS_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("rollers:successDelete"));
    },
  });

  return { error, isLoading: isPending, deleteRoller: mutate };
};