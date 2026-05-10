import type { Engine } from "@/modules/settings/engines/interfaces/engine.interface";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENGINES_QUERIES } from "@/modules/settings/engines/constants/engines.queries";
import {
  createEngineSchema,
  type CreateEnginePayload,
} from "@/modules/settings/engines/schemas/engines-create.schema";
import { EnginesService } from "@/modules/settings/engines/services";

type Params = {
  engine?: Engine;
  onSuccess?: () => void;
};

export const useCreateEngineForm = ({ engine, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const defaultValues = useMemo<CreateEnginePayload>(
    () => ({
      name: engine?.name || "",
      power: engine?.power ?? 0,
      speed: engine?.speed ?? 0,
      transmission: engine?.transmission ?? 0,
      revMax: engine?.revMax ?? 0,
      revMin: engine?.revMin ?? 0,
      standId: engine?.stand?.id || undefined,
    }),
    [
      engine?.name,
      engine?.power,
      engine?.speed,
      engine?.transmission,
      engine?.revMax,
      engine?.revMin,
      engine?.stand?.id,
    ],
  );

  const form = useForm({
    resolver: zodResolver(createEngineSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateEnginePayload) => {
      return EnginesService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ENGINES_QUERIES.findAll,
      });
      onSuccess?.();
      form.reset();
      toast.success(t("engines:successCreate"));
    },
  });

  const onSubmit = useCallback(
    (payload: CreateEnginePayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};