import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ROLES_QUERIES } from "@/modules/security/roles/constants/roles.queries";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";
import { RolesService } from "@/modules/security/roles/services";

type Params = {
  role: Role | undefined;
  onSuccess?: () => void;
};

export const useDeactivateRole = ({ role, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: () => RolesService.deactivate(role?.id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROLES_QUERIES.findAll });
      if (role?.id) {
        await queryClient.invalidateQueries({
          queryKey: ROLES_QUERIES.findOne(role.id),
        });
      }

      toast.success(t("roles:successDeactivate"));

      onSuccess?.();
    },
  });

  return {
    error,
    isLoading: isPending,
    deactivate: mutate,
    reset,
  };
};
