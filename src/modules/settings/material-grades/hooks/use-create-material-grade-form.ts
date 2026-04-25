import {
  createMaterialGradeSchema,
  type CreateMaterialGradePayload,
} from "@/modules/settings/material-grades/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MATERIAL_GRADES_QUERIES } from "@/modules/settings/material-grades/constants";
import { MaterialGradesService } from "@/modules/settings/material-grades/services";

const defaultValues: CreateMaterialGradePayload = {
  baseResistance: 0,
  gradeCode: "",
  properties: {},
  compositions: [],
};

type Params = {
  onSuccess?: () => void;
};

export const useCreateMaterialGradeForm = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(createMaterialGradeSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateMaterialGradePayload) => {
      return MaterialGradesService.create(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: MATERIAL_GRADES_QUERIES.findAll,
      });

      onSuccess?.();

      toast.success(t("materialGrades:successCreate"));
      form.reset();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateMaterialGradePayload) => {
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
