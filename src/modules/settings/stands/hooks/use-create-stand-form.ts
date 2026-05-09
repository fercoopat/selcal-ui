import type { Stand } from "@/modules/settings/stands/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { STANDS_QUERIES } from "@/modules/settings/stands/constants/stands.queries";
import {
  createStandSchema,
  type CreateStandPayload,
} from "@/modules/settings/stands/schemas/stand-create.schema";
import { StandsService } from "@/modules/settings/stands/services";

type Params = {
  stand?: Stand;
  onSuccess?: () => void;
};

export const useCreateStandForm = ({ stand, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const isEdit = !!stand?.id;

  const defaultValues = useMemo<CreateStandPayload>(
    () => ({
      position: stand?.position || 1,
      isHorizontal: stand?.isHorizontal ?? false,
      distanceToNextStand: stand?.distanceToNextStand || 0,
      rollingMillId: stand?.rollingMill?.id || "",
    }),
    [
      stand?.position,
      stand?.isHorizontal,
      stand?.distanceToNextStand,
      stand?.rollingMill?.id,
    ],
  );

  const form = useForm({
    resolver: zodResolver(createStandSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateStandPayload) => {
      if (!isEdit) {
        return StandsService.create(payload);
      }
      return StandsService.update(stand?.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STANDS_QUERIES.findAll,
      });

      onSuccess?.();
      form.reset();
      toast.success(
        t(!isEdit ? "stands:toast.created" : "stands:toast.updated"),
      );
    },
  });

  const onSubmit = useCallback(
    (payload: CreateStandPayload) => {
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
