import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASS_GEOMETRY_TYPES_QUERIES } from "@/modules/settings/pass-geometry-types/constants";
import { PassGeometryTypesService } from "@/modules/settings/pass-geometry-types/services";
import type { CreateSettingsEntityPayload } from "@/modules/settings/schemas";

export const useCreatePassGeometryType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSettingsEntityPayload) =>
      PassGeometryTypesService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PASS_GEOMETRY_TYPES_QUERIES.all,
      });
      toast.success("Tipo de geometría de pase creado exitosamente");
    },
    onError: () => toast.error("Error al crear el tipo de geometría de pase"),
  });
};
