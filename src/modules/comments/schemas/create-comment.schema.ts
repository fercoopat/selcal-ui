import z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const fileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) return false;

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`);
  }

  // Validar tamaño
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `The file can't be greater than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    );
  }

  return true;
}, "invalid-file");

export const createCommentSchema = z.object({
  content: z.string().min(1, "min-1").max(5000, "max-5000"),

  files: z.array(fileSchema).max(10, "size-10").optional().default([]),
});

export type CreateCommentPayload = z.infer<typeof createCommentSchema>;
