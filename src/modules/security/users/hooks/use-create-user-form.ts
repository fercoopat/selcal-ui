import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { USERS_QUERIES } from "@/modules/security/users/constants/users-queries";
import {
  createUserSchema,
  type CreateUserPayload,
} from "@/modules/security/users/schemas/create-user.schema";
import { UsersService } from "@/modules/security/users/services";

const defaultValues: CreateUserPayload = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  roleId: "",
};

type Params = {
  onSuccess?: () => void;
};

export const useCreateUserForm = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateUserPayload) => {
      return UsersService.create(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USERS_QUERIES.findAll });

      toast.success(t("users:successCreate"));

      onSuccess?.();

      form.reset();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateUserPayload) => {
      mutate(payload);
    },
    [mutate],
  );

  return {
    error,
    isLoading: isPending,
    onSubmit,
    ...form,
  };
};
