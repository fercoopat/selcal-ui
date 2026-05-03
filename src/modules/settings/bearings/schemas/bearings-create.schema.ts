import z from "zod";

export const createBearingSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  description: z.string({ error: "invalidValue" }).optional(),
});

export type CreateBearingPayload = z.infer<typeof createBearingSchema>;
