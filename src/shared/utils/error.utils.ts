export const extractErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined;

  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const obj = error as Record<string, unknown>;

    if ("message" in obj) {
      const message = obj.message;

      if (typeof message === "string") return message;

      if (Array.isArray(message)) return message.join(", ");
    }
  }

  return String(error);
};

export const extractErrorStatus = (error: unknown): number | undefined => {
  if (typeof error === "object" && error !== null) {
    const obj = error as Record<string, unknown>;

    if ("status" in obj && typeof obj.status === "number") return obj.status;
  }

  return undefined;
};
