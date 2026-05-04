import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MATERIALS_QUERIES } from "@/modules/settings/materials/constants/materials.queries";
import { MaterialsService } from "@/modules/settings/materials/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateMaterial = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (materialId: string | undefined) => {
      return MaterialsService.delete(materialId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MATERIALS_QUERIES.LIST,
      });

      onSuccess?.();
      toast.success(t("materials:successDelete"));
    },
  });

  return {
    error,
    isLoading: isPending,
    deleteMaterial: mutate,
  };
};
