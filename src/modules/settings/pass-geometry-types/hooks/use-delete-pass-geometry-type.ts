import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASS_GEOMETRY_TYPES_QUERIES } from "@/modules/settings/pass-geometry-types/constants";
import { PassGeometryTypesService } from "@/modules/settings/pass-geometry-types/services";

export const useDeletePassGeometryType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PassGeometryTypesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PASS_GEOMETRY_TYPES_QUERIES.all,
      });
      toast.success("Tipo de geometría de pase eliminado exitosamente");
    },
    onError: () =>
      toast.error("Error al eliminar el tipo de geometría de pase"),
  });
};
