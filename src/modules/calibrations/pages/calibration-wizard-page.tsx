import { FormProvider } from "react-hook-form";
import { useCalibrationWizardForm } from "@/modules/calibrations/hooks/use-calibration-wizard-form";
import CalibrationWizard from "@/modules/calibrations/components/calibration-wizard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalibrationsService } from "@/modules/calibrations/services";
import { CALIBRATIONS_QUERIES } from "@/modules/calibrations/constants";
import { toast } from "sonner";
import type { CalibrationInputPayload } from "@/modules/calibrations/schemas";

const CalibrationWizardPage = () => {
  const queryClient = useQueryClient();

  const calculateMutation = useMutation({
    mutationFn: (payload: CalibrationInputPayload) =>
      CalibrationsService.calculate(payload),
    mutationKey: CALIBRATIONS_QUERIES.calculate,
    onSuccess: (data) => {
      queryClient.setQueryData(CALIBRATIONS_QUERIES.calculate, data);
      toast.success("Calibration calculated successfully", {
        description: `Total passes: ${data.totalPasses}, Total power: ${data.totalPower} kW`,
      });
    },
    onError: (error) => {
      toast.error("Failed to calculate calibration", {
        description: error.message,
      });
    },
  });

  const form = useCalibrationWizardForm();

  const onSubmit = (data: CalibrationInputPayload) => {
    calculateMutation.mutate(data);
  };

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
