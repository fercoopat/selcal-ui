import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASS_GEOMETRY_TYPES_QUERIES } from "@/modules/settings/pass-geometry-types/constants";
import { PassGeometryTypesService } from "@/modules/settings/pass-geometry-types/services";
import type { CreateSettingsEntityPayload } from "@/modules/settings/shared/schemas";

export const useUpdatePassGeometryType = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateSettingsEntityPayload>) =>
      PassGeometryTypesService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PASS_GEOMETRY_TYPES_QUERIES.all,
      });
      toast.success("Tipo de geometría de pase actualizado exitosamente");
    },
    onError: () =>
      toast.error("Error al actualizar el tipo de geometría de pase"),
  });
};
