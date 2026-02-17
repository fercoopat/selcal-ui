import z from "zod";

export const createRoleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "min-size-1"),
});

export type CreateRolePayload = z.infer<typeof createRoleSchema>;
