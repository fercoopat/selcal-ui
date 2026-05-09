import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ROLLING_MILLS_QUERIES } from "@/modules/settings/rolling-mills/constants/rolling-mills.queries";
import {
  createRollingMillSchema,
  type CreateRollingMillPayload,
} from "@/modules/settings/rolling-mills/schemas/rolling-mill-create.schema";
import { RollingMillsService } from "@/modules/settings/rolling-mills/services";

type Params = {
  rollingMill?: RollingMill;
  onSuccess?: () => void;
};

export const useCreateRollingMillForm = ({
  rollingMill,
  onSuccess,
}: Params = {}) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const isEdit = !!rollingMill?.id;

  const defaultValues = useMemo<CreateRollingMillPayload>(
    () => ({
      name: rollingMill?.name || "",
      distOvenStand: rollingMill?.distOvenStand || 1,
      millTypeId: rollingMill?.millType?.id || "",
    }),
    [rollingMill?.name, rollingMill?.distOvenStand, rollingMill?.millType?.id],
  );

  const form = useForm({
    resolver: zodResolver(createRollingMillSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateRollingMillPayload) => {
      if (!isEdit) {
        return RollingMillsService.create(payload);
      }
      return RollingMillsService.update(rollingMill?.id, payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ROLLING_MILLS_QUERIES.findAll,
      });

      onSuccess?.();
      form.reset();
      toast.success(
        t(
          !isEdit ? "rollingMills:toast.created" : "rollingMills:toast.updated",
        ),
      );
    },
  });

  const onSubmit = useCallback(
    (payload: CreateRollingMillPayload) => {
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
