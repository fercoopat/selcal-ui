import z from "zod";

export const createProjectSchema = z.object({
  name: z.string("required").min(1, "min-1-char"),
  description: z.string("required").optional(),
  startDate: z.string("required").optional().nullable(),
  endDate: z.string("required").optional().nullable(),
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
