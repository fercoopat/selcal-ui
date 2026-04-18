import { z } from "zod";

export const createChemicalElementSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  tableNumber: z.number().min(1),
});

export type CreateChemicalElementPayload = z.infer<
  typeof createChemicalElementSchema
>;
