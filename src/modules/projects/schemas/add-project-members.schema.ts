import z from "zod";

export const addProjectMembersSchema = z.object({
  userIds: z.array(z.string()).min(1, "min-size-1"),
});

export type AddProjectMembersPayload = z.infer<typeof addProjectMembersSchema>;
