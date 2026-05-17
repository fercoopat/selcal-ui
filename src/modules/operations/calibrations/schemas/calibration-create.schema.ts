import z from "zod";

import { PROFILE_TYPE } from "@/modules/operations/calibrations/constants/profile-type.enum";

export const createCalibrationSchema = z.object({
  description: z.string({ error: "invalidValue" }).min(1, "required"),
  steelCarbon: z.coerce.number({ error: "invalidValue" }),
  steelManganese: z.coerce.number({ error: "invalidValue" }),
  steelChromium: z.coerce.number({ error: "invalidValue" }),
  initialTemp: z.coerce.number({ error: "invalidValue" }),
  initialHeight: z.coerce.number({ error: "invalidValue" }),
  initialWidth: z.coerce.number({ error: "invalidValue" }),
  totalPasses: z.coerce.number({ error: "invalidValue" }),
  finishingPasses: z.coerce.number({ error: "invalidValue" }),
  profileType: z.nativeEnum(PROFILE_TYPE, { error: "invalidValue" }),
  finalDimension: z.coerce.number({ error: "invalidValue" }),
  rollingMillId: z.string({ error: "invalidValue" }).min(1, "required"),
});

export type CreateCalibrationPayload = z.infer<typeof createCalibrationSchema>;
