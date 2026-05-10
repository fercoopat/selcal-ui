import z from "zod";
import { createEngineSchema } from "./engines-create.schema";

export const updateEngineSchema = createEngineSchema.partial();

export type UpdateEnginePayload = z.infer<typeof updateEngineSchema>;