import type { Material } from "@/modules/settings/materials/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MATERIALS_QUERIES } from "@/modules/settings/materials/constants/materials.queries";
import {
  createMaterialSchema,
  type CreateMaterialPayload,
} from "@/modules/settings/materials/schemas/material-create.schema";
import { MaterialsService } from "@/modules/settings/materials/services";

type Params = {
  material?: Material;
  onSuccess?: () => void;
};

export const useCreateMaterialForm = ({ material, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const isEdit = !!material?.id;

  const defaultValues = useMemo<CreateMaterialPayload>(
    () => ({
      coefficient: material?.coefficient || 1.0,
      name: material?.name || "",
      description: material?.description || "",
    }),
    [material?.coefficient, material?.description, material?.name],
  );

  const form = useForm({
    resolver: zodResolver(createMaterialSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateMaterialPayload) => {
      if (!isEdit) {
        return MaterialsService.create(payload);
      }
      return MaterialsService.update(material.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MATERIALS_QUERIES.LIST,
      });

      onSuccess?.();
      form.reset();
      toast.success(
        t(!isEdit ? "materials:successCreate" : "materials:successUpdate"),
      );
    },
  });

  const onSubmit = useCallback(
    (payload: CreateMaterialPayload) => {
      mutate(payload);
    },
    [mutate],
  );

  return {
    ...form,
    error,
    isLoading: isPending,
    onSubmit,
  };
};
