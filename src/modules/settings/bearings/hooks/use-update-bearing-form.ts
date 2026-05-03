import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { BEARINGS_QUERIES } from "@/modules/settings/bearings/constants/bearings.queries";
import {
  updateBearingSchema,
  type UpdateBearingPayload,
} from "@/modules/settings/bearings/schemas/bearings-update.schema";
import { BearingsService } from "@/modules/settings/bearings/services";

const defaultValues: UpdateBearingPayload = {
  name: "",
  description: "",
};

type Params = {
  bearingId?: string;
  onSuccess?: () => void;
};

export const useUpdateBearingForm = ({ bearingId, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateBearingSchema),
    defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: UpdateBearingPayload) => {
      return BearingsService.update(bearingId, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BEARINGS_QUERIES.findAll });
      await queryClient.invalidateQueries({
        queryKey: BEARINGS_QUERIES.findOne(bearingId ?? ""),
      });
      onSuccess?.();
      toast.success(t("bearings:successUpdate"));
    },
  });

  const onSubmit = useCallback(
    (payload: UpdateBearingPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
