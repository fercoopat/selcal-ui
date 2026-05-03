import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MATERIALS_QUERIES } from "@/modules/settings/materials/constants/materials.queries";
import {
  updateMaterialSchema,
  type UpdateMaterialPayload,
} from "@/modules/settings/materials/schemas/material-update.schema";
import { MaterialsService } from "@/modules/settings/materials/services";

const defaultValues: UpdateMaterialPayload = {
  name: "",
  description: "",
};

type Params = {
  materialId?: string;
  onSuccess?: () => void;
};

export const useUpdateMaterialForm = ({
  materialId,
  onSuccess,
}: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateMaterialSchema),
    defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: UpdateMaterialPayload) => {
      return MaterialsService.update(materialId, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MATERIALS_QUERIES.findAll,
      });
      await queryClient.invalidateQueries({
        queryKey: MATERIALS_QUERIES.findOne(materialId ?? ""),
      });

      onSuccess?.();
      toast.success(t("materials:successUpdate"));
    },
  });

  const onSubmit = useCallback(
    (payload: UpdateMaterialPayload) => {
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
