# TypeScript Standards

## Strict Mode
This project uses TypeScript 5.9 with strict mode enabled. The following rules are enforced:

- **No `any`**: Use `unknown` when the type is genuinely uncertain. Narrow with type guards.
- **No implicit `any`**: All variables, parameters, and return types must be explicitly typed or inferrable.
- **Strict null checks**: `null` and `undefined` are distinct types. Use optional chaining (`?.`) and nullish coalescing (`??`).

## Interface Patterns

### Domain Interfaces
All domain interfaces extend `CommonFields` from `@/shared/interfaces`:

```typescript
interface CommonFields {
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Example
interface Project extends CommonFields {
  name: string;
  description: string;
  materialId: string;
}
```

### Payload Types
Derive payload types from Zod schemas using `z.infer`:

```typescript
// schemas/project.schema.ts
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  materialId: z.string().uuid(),
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
```

## Schema Patterns

### Zod Validation
- Schemas live in module `schemas/` directories.
- Export both the schema and the inferred type.
- Use descriptive schema names: `createXSchema`, `updateXSchema`, `xFiltersSchema`.

```typescript
// schemas/index.ts
export { createProjectSchema, updateProjectSchema } from "./project.schema";
export type { CreateProjectPayload, UpdateProjectPayload } from "./project.schema";
```

### Shared Schemas
Common validation logic goes in `@/shared/schemas/`:
- Email validation
- Date formats
- Common field patterns

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Interfaces | `PascalCase`, noun | `Project`, `CalibrationPass` |
| Types | `PascalCase`, noun | `CreateProjectPayload`, `SortDirection` |
| Constants | `UPPER_SNAKE_CASE` | `PROJECTS_PERMISSIONS`, `PROJECT_PATHS` |
| Query Keys | `UPPER_SNAKE_CASE` + camelCase values | `PROJECTS_QUERIES.findAll` |
| Variables | `camelCase` | `isLoading`, `projectsList` |
| Functions | `camelCase`, verb-first | `formatDate`, `calculateElongation` |
| Hooks | `use` prefix + `PascalCase` | `useFindAllProjects`, `useCalibrationWizardForm` |
| Components | `PascalCase`, noun | `ProjectsList`, `CalibrationWizard` |
| Files | `kebab-case` | `projects-list.tsx`, `auth.helpers.ts` |

## Type Safety Guidelines

### 1. Prefer Interfaces for Object Shapes
```typescript
// Good: extensible, clear intent
interface CalibrationPass extends CommonFields {
  passNumber: number;
  height: number;
  width: number;
  area: number;
}

// Avoid for object shapes
type CalibrationPass = {
  passNumber: number;
  height: number;
  width: number;
  area: number;
};
```

### 2. Use Type for Unions, Mapped Types, and Schema Inference
```typescript
// Good: union type
type ProfileType = "round" | "square" | "hexagonal";

// Good: schema inference
type CreateCalibrationPayload = z.infer<typeof createCalibrationSchema>;

// Good: mapped type
type RoutePermissions = {
  [K in RouteKey]: string;
};
```

### 3. Avoid Type Assertions Unless Necessary
```typescript
// Avoid
const data = response.data as Project;

// Prefer: let the type system work
const data: Project = response.data;

// Exception: when you know more than the compiler (e.g., DOM APIs)
const canvas = document.getElementById("chart") as HTMLCanvasElement;
```

### 4. Use Discriminated Unions for Variant Types
```typescript
interface RoundProfile {
  type: "round";
  diameter: number;
}

interface SquareProfile {
  type: "square";
  side: number;
}

type Profile = RoundProfile | SquareProfile;

// Type-safe narrowing
function getArea(profile: Profile): number {
  switch (profile.type) {
    case "round":
      return Math.PI * Math.pow(profile.diameter / 2, 2);
    case "square":
      return Math.pow(profile.side, 2);
  }
}
```

## Module Augmentation

### i18next Type Augmentation
Translation keys are type-safe via module augmentation in `src/types/i18next.d.ts`:

```typescript
import "i18next";
import type resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
```

This ensures `t("projects:tabs.general.title")` is type-checked against actual translation keys.

## ESLint Configuration

Type-aware lint rules are configured in `eslint.config.js`:
- `@typescript-eslint/recommended`: Core TypeScript rules
- `react-hooks/recommended`: React Hooks rules
- `react-refresh/vite`: React Refresh rules

Unused variables starting with `_` are ignored:
```typescript
const [_data, error] = useSomeHook(); // OK: _data is intentionally unused
```
