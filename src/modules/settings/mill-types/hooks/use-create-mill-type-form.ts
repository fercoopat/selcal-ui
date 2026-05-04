import type { MillType } from "@/modules/settings/mill-types/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants/mill-types.queries";
import {
  createMillTypeSchema,
  type CreateMillTypePayload,
} from "@/modules/settings/mill-types/schemas/mill-type-create.schema";
import { MillTypesService } from "@/modules/settings/mill-types/services";

type Params = {
  millType?: MillType;
  onSuccess?: () => void;
};

export const useCreateMillTypeForm = ({ millType, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const isEdit = !!millType?.id;

  const defaultValues = useMemo<CreateMillTypePayload>(
    () => ({
      name: millType?.name || "",
      tempInitial: millType?.tempInitial || 1.0,
      tempVariation: millType?.tempVariation || 1.0,
    }),
    [millType?.name, millType?.tempInitial, millType?.tempVariation],
  );

  const form = useForm({
    resolver: zodResolver(createMillTypeSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateMillTypePayload) => {
      if (!isEdit) {
        return MillTypesService.create(payload);
      }
      return MillTypesService.update(millType.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MILL_TYPES_QUERIES.findAll,
      });

      onSuccess?.();
      form.reset();
      toast.success(
        t(!isEdit ? "millTypes:successCreate" : "millTypes:successUpdate"),
      );
    },
  });

  const onSubmit = useCallback(
    (payload: CreateMillTypePayload) => {
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
