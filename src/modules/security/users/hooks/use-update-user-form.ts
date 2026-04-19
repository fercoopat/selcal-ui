import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { z, ZodObject } from "zod";

import { PROFILE_KEY } from "@/modules/auth/constants/auth.queries";
import { USERS_QUERIES } from "@/modules/security/users/constants/users.queries";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { createUserSchema } from "@/modules/security/users/schemas/user-create.schema";
import { UsersService } from "@/modules/security/users/services";

type Params<T> = {
  user: User | undefined;
  schema: ZodObject;
  defaultValues?: T;
  onSuccess?: () => void;
};

export const useUpdateUserForm = <T>({
  user,
  defaultValues,
  schema = createUserSchema.partial(),
  onSuccess,
}: Params<T>) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const values = useMemo<z.infer<typeof schema>>(
    () => ({
      ...user,
      ...defaultValues,
    }),
    [defaultValues, user],
  );

  const { reset: resetForm, ...form } = useForm({
    resolver: zodResolver(schema),
    defaultValues: values,
    values,
  });

  const {
    error,
    isPending,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (payload: z.infer<typeof schema>) =>
      UsersService.update(user?.id, payload),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
      await queryClient.invalidateQueries({
        queryKey: [USERS_QUERIES.findAll],
      });
      await queryClient.invalidateQueries({
        queryKey: [USERS_QUERIES.findOne(data?.id)],
      });

      toast.success(t("users:successUpdate"));

      resetForm();

      onSuccess?.();
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof schema>) => {
      mutate(values);
    },
    [mutate],
  );

  const reset = useCallback(() => {
    resetForm(defaultValues as z.infer<typeof schema>);
    resetMutation();
  }, [defaultValues, resetForm, resetMutation]);

  return {
    ...form,
    error,
    isLoading: isPending,
    onSubmit,
    reset,
  };
};
