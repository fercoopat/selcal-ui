import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ROLLING_MILLS_QUERIES } from "@/modules/rolling-mills/constants";
import { RollingMillsService } from "@/modules/rolling-mills/services";

export const useDeleteRollingMill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RollingMillsService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ROLLING_MILLS_QUERIES.all,
      });
      toast.success("Laminador eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el laminador"),
  });
};
