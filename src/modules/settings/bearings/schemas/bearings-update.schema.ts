import z from "zod";
import { createBearingSchema } from "./bearings-create.schema";

export const updateBearingSchema = createBearingSchema.partial();

export type UpdateBearingPayload = z.infer<typeof updateBearingSchema>;
