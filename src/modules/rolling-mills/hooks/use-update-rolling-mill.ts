import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ROLLING_MILLS_QUERIES } from "@/modules/rolling-mills/constants";
import { RollingMillsService } from "@/modules/rolling-mills/services";
import type { CreateRollingMillPayload } from "@/modules/rolling-mills/schemas";

export const useUpdateRollingMill = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateRollingMillPayload>) =>
      RollingMillsService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ROLLING_MILLS_QUERIES.all,
      });
      toast.success("Laminador actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar el laminador"),
  });
};
