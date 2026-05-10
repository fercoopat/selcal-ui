import z from "zod";
import { createRollerSchema } from "./rollers-create.schema";

export const updateRollerSchema = createRollerSchema.partial();

export type UpdateRollerPayload = z.infer<typeof updateRollerSchema>;