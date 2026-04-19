import { FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useCalibrationWizardForm } from "@/modules/calibrations/hooks/use-calibration-wizard-form";
import CalibrationWizard from "@/modules/calibrations/components/calibration-wizard";
import { CalibrationsService } from "@/modules/calibrations/services";
import { CALIBRATIONS_QUERIES } from "@/modules/calibrations/constants";
import type { CalibrationInputPayload } from "@/modules/calibrations/schemas";

const CalibrationWizardPage = () => {
  const { t } = useTranslation("calibrations");
  const queryClient = useQueryClient();
  const form = useCalibrationWizardForm();

  const calculateMutation = useMutation({
    mutationFn: (payload: CalibrationInputPayload) =>
      CalibrationsService.calculate(payload),
    mutationKey: CALIBRATIONS_QUERIES.calculate,
    onSuccess: (data) => {
      queryClient.setQueryData(CALIBRATIONS_QUERIES.calculate, data);
      toast.success(t("wizard.successCalculate"), {
        description: t("wizard.successCalculateDescription", {
          totalPasses: data.totalPasses,
          totalPower: data.totalPower,
        }),
      });
    },
    onError: (error) => {
      toast.error(t("wizard.errorCalculate"), {
        description: error.message,
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    calculateMutation.mutate(data);
  });

  return (
    <FormProvider {...form}>
      <CalibrationWizard
        {...form}
        error={calculateMutation.error}
        isCalculating={calculateMutation.isPending}
        calculationResult={calculateMutation.data}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default CalibrationWizardPage;
