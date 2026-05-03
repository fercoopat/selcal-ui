import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { BEARINGS_QUERIES } from "@/modules/settings/bearings/constants/bearings.queries";
import {
  createBearingSchema,
  type CreateBearingPayload,
} from "@/modules/settings/bearings/schemas/bearings-create.schema";
import { BearingsService } from "@/modules/settings/bearings/services";

const defaultValues: CreateBearingPayload = {
  name: "",
  description: "",
};

type Params = {
  onSuccess?: () => void;
};

export const useCreateBearingForm = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(createBearingSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateBearingPayload) => {
      return BearingsService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BEARINGS_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("bearings:successCreate"));
      form.reset();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateBearingPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
