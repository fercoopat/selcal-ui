import z from "zod";
import type { ProfileType } from "@/modules/calibrations/interfaces";

/**
 * Schema for billet input validation
 */
export const billetSchema = z.object({
  height: z.number().positive("height-must-be-positive"),
  width: z.number().positive("width-must-be-positive"),
  temperature: z.number().min(0, "temperature-min-zero"),
  material: z.string().min(1, "material-required"),
  area: z.number().positive("area-must-be-positive"),
});

export type BilletInput = z.infer<typeof billetSchema>;

/**
 * Schema for target profile validation
 */
export const targetProfileSchema = z.object({
  type: z.enum(["round", "square", "hexagonal"] as [ProfileType, ProfileType, ProfileType]),
  dimensions: z.object({
    diameter: z.number().positive().optional(),
    side: z.number().positive().optional(),
    flatDistance: z.number().positive().optional(),
  }),
  temperature: z.number().min(0, "temperature-min-zero"),
});

export type TargetProfileInput = z.infer<typeof targetProfileSchema>;

/**
 * Schema for complete calibration input
 */
export const calibrationInputSchema = z.object({
  billet: billetSchema,
  target: targetProfileSchema,
  maxElongation: z.number().min(1).max(2).optional().default(1.3),
  passes: z.number().int().positive().optional(),
});

export type CalibrationInputPayload = z.infer<typeof calibrationInputSchema>;

/**
 * Schema for what-if simulation parameters
 */
export const simulationSchema = calibrationInputSchema.extend({
  baselineId: z.string().optional(),
});

export type SimulationInput = z.infer<typeof simulationSchema>;
