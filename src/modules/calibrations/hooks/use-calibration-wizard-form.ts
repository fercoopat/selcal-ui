import { useFormContext } from "react-hook-form";
import type { CalibrationInputPayload } from "@/modules/calibrations/schemas";

export const useCalibrationWizardForm = () => {
  const context = useFormContext<CalibrationInputPayload>();
  
  if (!context) {
    throw new Error("useCalibrationWizardForm must be used within a FormContainer");
  }

  return context;
};
