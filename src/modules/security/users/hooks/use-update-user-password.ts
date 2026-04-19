import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { PROFILE_KEY } from "@/modules/auth/constants/auth.queries";
import { USERS_QUERIES } from "@/modules/security/users/constants/users.queries";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import {
  updateUserPasswordSchema,
  type UpdateUserPasswordPayload,
} from "@/modules/security/users/schemas/user-update-password.schema";
import { UsersService } from "@/modules/security/users/services";

const defaultValues: UpdateUserPasswordPayload = {
  confirmPassword: "",
  currentPassword: "",
  newPassword: "",
};

type Params = {
  user: User | undefined;
  onSuccess?: () => void;
};

export const useUpdateUserPassword = ({ user, onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (payload: UpdateUserPasswordPayload) =>
      UsersService.updatePassword(user?.id, payload),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
      await queryClient.invalidateQueries({
        queryKey: [USERS_QUERIES.findAll],
      });
      await queryClient.invalidateQueries({
        queryKey: [USERS_QUERIES.findOne(data?.id)],
      });

      toast.success(t("users:successPasswordUpdate"));

      resetForm();

      onSuccess?.();
    },
  });

  const onSubmit = useCallback(
    (values: UpdateUserPasswordPayload) => {
      mutate(values);
    },
    [mutate],
  );

  const reset = useCallback(() => {
    resetForm(defaultValues);
    resetMutation();
  }, [resetForm, resetMutation]);

  return {
    ...form,
    error,
    isLoading: isPending,
    onSubmit,
    reset,
  };
};
