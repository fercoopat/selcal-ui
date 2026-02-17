import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ROLES_QUERIES } from "@/modules/security/roles/constants/roles-queries";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";
import {
  createRoleSchema,
  type CreateRolePayload,
} from "@/modules/security/roles/schemas/create-role.schema";
import { RolesService } from "@/modules/security/roles/services";

const initValues: CreateRolePayload = {
  name: "",
  permissions: [],
  description: "",
};

type Params = {
  role?: Role;
  onSuccess?: () => void;
};

export const useCreateRoleForm = ({ role, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const defaultValues = useMemo<CreateRolePayload>(
    () => ({
      ...initValues,
      ...role,
    }),
    [role],
  );

  const form = useForm({
    resolver: zodResolver(createRoleSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateRolePayload) => {
      if (!role?.id) return RolesService.create(payload);

      return RolesService.update(role.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROLES_QUERIES.findAll });
      await queryClient.invalidateQueries({
        queryKey: ROLES_QUERIES.findOne(role?.id),
      });

      toast.success(
        t(!role?.id ? "roles:successCreate" : "roles:successUpdate"),
      );

      onSuccess?.();

      form.reset();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateRolePayload) => {
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
