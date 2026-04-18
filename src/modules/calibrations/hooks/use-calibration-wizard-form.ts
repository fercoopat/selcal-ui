import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { calibrationInputSchema } from "@/modules/calibrations/schemas/calibration-input.schema";
import type { CalibrationInputPayload } from "@/modules/calibrations/schemas";

export const useCalibrationWizardForm = () =>
  useForm<CalibrationInputPayload>({
    resolver: zodResolver(calibrationInputSchema),
    defaultValues: {
      maxElongation: 1.3,
    },
  });
