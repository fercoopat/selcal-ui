import { z } from "zod";

export const createCalibrationSchema = z.object({
  name: z.string().min(1),
  targetDimension: z.number().min(0),
  status: z.enum(["DRAFT", "APPROVED"]).default("DRAFT"),
  authorId: z.string().uuid(),
  materialGradeId: z.string().uuid(),
  rollingMillId: z.string().uuid(),
});

export type CreateCalibrationPayload = z.infer<typeof createCalibrationSchema>;
