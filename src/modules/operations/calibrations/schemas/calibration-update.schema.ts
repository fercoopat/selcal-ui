import z from "zod";

import { createCalibrationSchema } from "./calibration-create.schema";

export const updateCalibrationSchema = createCalibrationSchema.partial();

export type UpdateCalibrationPayload = z.infer<typeof updateCalibrationSchema>;
