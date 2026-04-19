# Form Standards

## FormContainer

All forms use `FormContainer` (provides `FormProvider` + `<form>` + `handleSubmit`):

```tsx
import { FormContainer } from "@/components/forms/form-container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, type CreateProjectPayload } from "../schemas";

const CreateProjectForm = () => {
  const form = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => { /* mutation */ });

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FormFieldInput control={form.control} name="name" label="Project Name" />
      <FormFieldTextarea control={form.control} name="description" label="Description" />
      <LoadingButton type="submit" loading={form.formState.isSubmitting}>
        Create
      </LoadingButton>
    </FormContainer>
  );
};
```

## Form Field Components

All from `@/components/forms/`:

| Component | Use for |
|---|---|
| `FormFieldInput` | Text inputs |
| `FormFieldTextarea` | Textareas |
| `FormFieldSelect` | Select dropdowns |
| `FormFieldDate` | Date pickers |
| `FormFieldMultiSelect` | Multi-select |
| `FormFieldFiles` | File uploads |

## Schema Pattern

Schemas live in the module's `schemas/` directory. Always export both the schema and the inferred type:

```typescript
// schemas/project-create.schema.ts
export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  materialId: z.string().uuid("Invalid material"),
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
```

See [`docs/standards/typescript.md`](typescript.md) for full schema and type conventions.

## Rules

- Every form **must** use `FormContainer` — never a bare `<form>`.
- Every form **must** have a Zod schema with `zodResolver`.
- Never skip validation — all inputs must be covered by the schema.
