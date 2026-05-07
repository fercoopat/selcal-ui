import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ROLLING_MILLS_QUERIES } from "@/modules/settings/rolling-mills/constants/rolling-mills.queries";
import { RollingMillsService } from "@/modules/settings/rolling-mills/services";

export const useDeactivateRollingMill = (
  {
    onSuccess,
  }: {
    onSuccess?: (rollingMill: RollingMill) => void;
  } = {},
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (rollingMillId: string | undefined) => {
      return RollingMillsService.delete(rollingMillId);
    },
    onSuccess: async (rollingMill) => {
      await queryClient.invalidateQueries({
        queryKey: ROLLING_MILLS_QUERIES.all,
      });
      toast.success("rollingMills:toast.deleted");
      onSuccess?.(rollingMill);
    },
  });

  return {
    deactivateRollingMill: mutation.mutate,
    isPending: mutation.isPending,
  };
};
