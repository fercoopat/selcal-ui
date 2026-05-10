import type { Roller } from "@/modules/settings/rollers/interfaces/roller.interface";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ROLLERS_QUERIES } from "@/modules/settings/rollers/constants/rollers.queries";
import {
  createRollerSchema,
  type CreateRollerPayload,
} from "@/modules/settings/rollers/schemas/rollers-create.schema";
import { RollersService } from "@/modules/settings/rollers/services";

type Params = {
  roller?: Roller;
  onSuccess?: () => void;
};

export const useCreateRollerForm = ({ roller, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const defaultValues = useMemo<CreateRollerPayload>(
    () => ({
      name: roller?.name || "",
      diameter: roller?.diameter ?? 0,
      diameterNeck: roller?.diameterNeck ?? 0,
      length: roller?.length ?? 0,
      lengthNeck: roller?.lengthNeck ?? 0,
      standId: roller?.stand?.id || "",
      materialId: roller?.material?.id || undefined,
      bearingId: roller?.bearing?.id || undefined,
    }),
    [
      roller?.name,
      roller?.diameter,
      roller?.diameterNeck,
      roller?.length,
      roller?.lengthNeck,
      roller?.stand?.id,
      roller?.material?.id,
      roller?.bearing?.id,
    ],
  );

  const form = useForm({
    resolver: zodResolver(createRollerSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateRollerPayload) => {
      return RollersService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ROLLERS_QUERIES.findAll,
      });
      onSuccess?.();
      form.reset();
      toast.success(t("rollers:successCreate"));
    },
  });

  const onSubmit = useCallback(
    (payload: CreateRollerPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
