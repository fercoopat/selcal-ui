import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PROFILE_TYPES_QUERIES } from "@/modules/settings/profile-types/constants";
import { ProfileTypesService } from "@/modules/settings/profile-types/services";

export const useDeleteProfileType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProfileTypesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PROFILE_TYPES_QUERIES.all,
      });
      toast.success("Tipo de perfil eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el tipo de perfil"),
  });
};
