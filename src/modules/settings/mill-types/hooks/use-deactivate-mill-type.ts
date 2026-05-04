import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants/mill-types.queries";
import { MillTypesService } from "@/modules/settings/mill-types/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateMillType = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (millTypeId: string | undefined) => {
      return MillTypesService.delete(millTypeId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MILL_TYPES_QUERIES.findAll,
      });

      onSuccess?.();
      toast.success(t("millTypes:successDelete"));
    },
  });

  return {
    error,
    isLoading: isPending,
    deleteMillType: mutate,
  };
};
