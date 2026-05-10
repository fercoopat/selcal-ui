import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENGINES_QUERIES } from "@/modules/settings/engines/constants/engines.queries";
import { EnginesService } from "@/modules/settings/engines/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateEngine = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (engineId: string | undefined) => {
      return EnginesService.delete(engineId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ENGINES_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("engines:successDelete"));
    },
  });

  return { error, isLoading: isPending, deleteEngine: mutate };
};