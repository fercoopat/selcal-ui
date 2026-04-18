import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PROFILE_TYPES_QUERIES } from "@/modules/settings/profile-types/constants";
import { ProfileTypesService } from "@/modules/settings/profile-types/services";
import type { CreateSettingsEntityPayload } from "@/modules/settings/schemas";

export const useUpdateProfileType = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateSettingsEntityPayload>) =>
      ProfileTypesService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PROFILE_TYPES_QUERIES.all,
      });
      toast.success("Tipo de perfil actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar el tipo de perfil"),
  });
};
