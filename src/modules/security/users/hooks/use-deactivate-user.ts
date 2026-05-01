import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { USERS_QUERIES } from "@/modules/security/users/constants/users.queries";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { UsersService } from "@/modules/security/users/services";

type Params = {
  user: User | undefined;
  onSuccess?: () => void;
};

export const useDeleteUser = ({ user, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: () => UsersService.delete(user?.id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USERS_QUERIES.findAll });
      if (user?.id) {
        await queryClient.invalidateQueries({
          queryKey: USERS_QUERIES.findOne(user.id),
        });
      }

      toast.success(t("users:successDelete"));

      onSuccess?.();
    },
  });

  return {
    error,
    isLoading: isPending,
    delete: mutate,
    reset,
  };
};