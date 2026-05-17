import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { PROFILE_TYPE } from "@/modules/operations/calibrations/constants/profile-type.enum";
import { CALIBRATIONS_QUERIES } from "@/modules/operations/calibrations/constants/calibrations.queries";
import type { Calibration } from "@/modules/operations/calibrations/interfaces/calibration.interface";
import {
  createCalibrationSchema,
  type CreateCalibrationPayload,
} from "@/modules/operations/calibrations/schemas/calibration-create.schema";
import { CalibrationsService } from "@/modules/operations/calibrations/services";

type Params = {
  calibration?: Calibration;
  onSuccess?: () => void;
};

export const useCreateCalibrationForm = ({
  calibration,
  onSuccess,
}: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const defaultValues = useMemo<CreateCalibrationPayload>(
    () => ({
      description: calibration?.description ?? "",
      steelCarbon: calibration?.steelCarbon ?? 0,
      steelManganese: calibration?.steelManganese ?? 0,
      steelChromium: calibration?.steelChromium ?? 0,
      initialTemp: calibration?.initialTemp ?? 0,
      initialHeight: calibration?.initialHeight ?? 0,
      initialWidth: calibration?.initialWidth ?? 0,
      totalPasses: calibration?.totalPasses ?? 0,
      finishingPasses: calibration?.finishingPasses ?? 0,
      profileType: calibration?.profileType ?? PROFILE_TYPE.ROUND,
      finalDimension: calibration?.finalDimension ?? 0,
      rollingMillId: calibration?.rollingMill?.id ?? "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calibration?.id],
  );

  const form = useForm({
    resolver: zodResolver(createCalibrationSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateCalibrationPayload) => {
      if (calibration?.id) {
        return CalibrationsService.update(calibration.id, payload);
      }
      return CalibrationsService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CALIBRATIONS_QUERIES.findAll,
      });
      onSuccess?.();
      form.reset();
      toast.success(
        calibration?.id
          ? t("calibrations:successUpdate")
          : t("calibrations:successCreate"),
      );
    },
  });

  const onSubmit = useCallback(
    (payload: CreateCalibrationPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
