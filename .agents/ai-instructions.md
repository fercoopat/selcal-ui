# AI Instructions — Working Guidelines

## 1. Working Principles

### Read Before Editing
- **Scan the module structure first** — Check what directories exist in the target module. Not all modules need every subdirectory (e.g., `materials/` only has `constants/`).
- **Find existing patterns** — Before creating a new file, read a similar existing file in the same module. Match the naming, structure, and import style exactly.
- **Check barrel exports** — After creating a file, add its export to the nearest `index.ts`. If no `index.ts` exists in the directory, create one.

### Verify Before Submitting
- Run `pnpm build` — Must pass with zero TypeScript errors.
- Run `pnpm lint` — Must pass with zero ESLint errors.
- Check that all new imports resolve correctly (no missing modules).

---

## 2. Code Generation Templates

### New Feature Module
```
src/modules/<feature>/
├── constants/
│   ├── <feature>-paths.ts          # Route path constants
│   ├── <feature>-queries.ts        # React Query keys
│   └── <feature>-permissions.ts    # RBAC permission strings
├── interfaces/
│   └── <feature>.interface.ts      # Domain interfaces (extend CommonFields)
├── schemas/
│   └── <feature>.schema.ts         # Zod schemas + inferred types
├── services/
│   └── <feature>.service.ts        # Extends ApiService, singleton export
├── hooks/
│   └── use-<feature>.ts            # React Query wrappers for service
├── pages/
│   └── <feature>-page.tsx          # Thin page component (memo'd)
├── routes/
│   └── <feature>-routes.tsx        # React Router RouteObject[]
└── index.ts                        # Barrel export
```

### Component Template
```tsx
import { memo } from "react";

interface ComponentNameProps {
  // explicit prop types, no inline objects
}

const ComponentName = ({ prop1, prop2 }: ComponentNameProps) => {
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default memo(ComponentName);
```

### Generic Component Template (preserves type params)
```tsx
import { genericMemo } from "@/components/hoc/generic-memo";

interface GenericComponentProps<T> {
  data: T[];
  onSelect: (item: T) => void;
}

const GenericComponent = <T,>({ data, onSelect }: GenericComponentProps<T>) => {
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default genericMemo(GenericComponent);
```

### Service Template
```typescript
import { ApiClient } from "@/lib/api-client";
import type { Entity } from "@/modules/<feature>/interfaces/entity.interface";
import type { CreateEntityPayload } from "@/modules/<feature>/schemas/create-entity.schema";
import type {
  SearchParams,
  SearchResponse,
} from "@/shared/interfaces/search-params.interface";
import { ApiService } from "@/shared/services/api.service";

const FEATURE_SERVICE_BASE_PATH = "/<feature>" as const;

class FeatureService extends ApiService {
  async create(payload: CreateEntityPayload) {
    const { data } = await ApiClient.post<Entity | undefined>(
      this.getPath(),
      payload,
    );
    return data;
  }

  async findAll() {
    const { data } = await ApiClient.get<Entity[]>(this.getPath());
    return data;
  }

  async search(params: SearchParams<Entity | undefined>) {
    const { data } = await ApiClient.post<SearchResponse<Entity | undefined>>(
      this.getPath("/search"),
      params,
    );
    return data;
  }

  async findOne(entityId: string | undefined) {
    if (!entityId) throw new Error("Entity ID is required to fetch");
    const { data } = await ApiClient.get<Entity | undefined>(
      this.getPath(`/${entityId}`),
    );
    return data;
  }

  async update(
    entityId: string | undefined,
    payload: Partial<CreateEntityPayload>,
  ) {
    if (!entityId) throw new Error("Entity ID is required to update");
    const { data } = await ApiClient.patch<Entity | undefined>(
      this.getPath(`/${entityId}`),
      payload,
    );
    return data;
  }

  async activate(entityId: string | undefined) {
    if (!entityId) throw new Error("Entity ID is required to activate");
    await ApiClient.post(this.getPath(`/${entityId}/activate`));
  }

  async deactivate(entityId: string | undefined) {
    if (!entityId) throw new Error("Entity ID is required to deactivate");
    await ApiClient.post(this.getPath(`/${entityId}/deactivate`));
  }
}

export default new FeatureService(FEATURE_SERVICE_BASE_PATH);
```

### React Query Hook Template
```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FEATURE_QUERIES } from "../constants/feature-queries";
import featureService from "../services/feature.service";

export const useFindAllFeature = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: FEATURE_QUERIES.findAll,
    queryFn: () => featureService.findAll(),
  });

  return {
    feature: data ?? [],
    isLoading,
    error,
    refetch,
  };
};

export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFeaturePayload) => featureService.create(payload),
    onSuccess: () => {
      toast.success("Feature created successfully");
      queryClient.invalidateQueries({ queryKey: FEATURE_QUERIES.findAll });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create feature: ${error.message}`);
    },
  });
};
```

### Zod Schema Template
```typescript
import { z } from "zod";

export const createEntitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const updateEntitySchema = createEntitySchema.partial();

export type CreateEntityPayload = z.infer<typeof createEntitySchema>;
export type UpdateEntityPayload = z.infer<typeof updateEntitySchema>;
```

### Query Keys Template
```typescript
export const FEATURE_QUERIES = {
  findAll: ["feature:find-all"] as const,
  findOne: (id: string) => ["feature:find-one", id] as const,
  dropdownOptions: ["feature:dropdown-options"] as const,
};
```

### Path Constants Template
```typescript
export const FEATURE_PATHS = {
  basePath: "/feature",
  listPath: "/feature/list",
  detailsPath: (id: string) => `/feature/${id}`,
  createPath: "/feature/create",
};
```

### Permissions Template
```typescript
export const FEATURE_PERMISSIONS = {
  READ: "feature_read",
  CREATE: "feature_create",
  UPDATE: "feature_update",
  DELETE: "feature_delete",
} as const;
```

---

## 3. Anti-Patterns

### ❌ BAD: Using `any`
```typescript
const fetchData = async (id: any): Promise<any> => {
  // ...
};
```
### ✅ GOOD: Explicit types
```typescript
const fetchData = async (id: string): Promise<Entity | undefined> => {
  // ...
};
```

### ❌ BAD: Unmemoized component
```typescript
export const MyComponent = ({ title }: Props) => {
  return <div>{title}</div>;
};
```
### ✅ GOOD: Memoized component
```typescript
export default memo(MyComponent);
```

### ❌ BAD: Inline object in JSX props
```tsx
<MyComponent config={{ a: 1, b: 2 }} />
```
### ✅ GOOD: Extracted constant
```tsx
const config = useMemo(() => ({ a: 1, b: 2 }), []);
<MyComponent config={config} />
```

### ❌ BAD: Direct module-to-module import
```typescript
import { something } from "@/modules/projects/helpers/project.helpers";
```
### ✅ GOOD: Shared utility or API call
```typescript
import { formatProjectName } from "@/shared/utils";
// or fetch via API service
```

### ❌ BAD: Hardcoded translation string
```tsx
<h1>Project List</h1>
```
### ✅ GOOD: i18next key
```tsx
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
<h1>{t("projects:list.title")}</h1>
```

### ❌ BAD: Direct `import.meta.env` in component
```typescript
const url = import.meta.env.VITE_BACKEND_URL;
```
### ✅ GOOD: Use `getEnv()` helper
```typescript
import { getEnv, ENV_KEYS } from "@/config/envs";
const url = getEnv(ENV_KEYS.BACKEND_URL);
```

### ❌ BAD: Skipping barrel export
```
// src/modules/feature/pages/feature-page.tsx  (no index.ts)
```
### ✅ GOOD: Barrel export
```typescript
// src/modules/feature/pages/index.ts
export { default as FeaturePage } from "./feature-page";
```

### ❌ BAD: Mutating server state directly
```typescript
const updateProject = async (data) => {
  projectsList[0] = data; // direct mutation
};
```
### ✅ GOOD: Use React Query mutation
```typescript
const mutation = useUpdateProject();
mutation.mutate(data); // invalidates query, refetches
```

### ❌ BAD: Component without explicit props interface
```typescript
const MyComponent = ({ title, onClick }) => {
  // implicit any on props
};
```
### ✅ GOOD: Explicit interface
```typescript
interface MyComponentProps {
  title: string;
  onClick: () => void;
}
const MyComponent = ({ title, onClick }: MyComponentProps) => {
  // ...
};
```

---

## 4. Pattern Recognition

When you see these patterns in the codebase, follow these guidelines:

| Pattern | What to Do |
|---|---|
| New service method | Add null check for ID params, use `ApiClient` methods, return `data` from response |
| New hook wrapping service | Use `useQuery` for reads, `useMutation` for writes, always include toast + invalidation |
| New form | Use `FormContainer`, Zod schema, `useForm<XPayload>`, `zodResolver` |
| New page component | Keep it thin — call hooks, pass to presentational components, wrap in `memo` |
| New constant file | Use `UPPER_SNAKE_CASE` for objects, `as const` for type safety |
| New translation key | Add to both `es/` and `en/` JSON files, update barrel `index.ts` in each |
| New interface | Extend `CommonFields`, place in module `interfaces/`, use `type` for unions |
| New route | Use `lazy()` import, define in `routes/` as `RouteObject[]`, register in main router |

---

## 5. Code Modification Guidelines

### Adding a Feature
1. Create module directories under `src/modules/<feature>/`.
2. Define interfaces in `interfaces/` (extend `CommonFields`).
3. Define Zod schemas in `schemas/` with inferred types.
4. Create service in `services/` (extend `ApiService`, singleton export).
5. Create hooks in `hooks/` (React Query wrappers).
6. Define constants in `constants/` (paths, queries, permissions).
7. Create pages in `pages/` (thin, memo'd).
8. Define routes in `routes/` (lazy-loaded `RouteObject[]`).
9. Register routes in the main router.
10. Add translations to `src/i18n/{lang}/<feature>.json`.

### Refactoring
- **Never change behavior without tests** — If no tests exist, write them first.
- **Preserve public API contracts** — Service method signatures, component props, and query keys are consumed elsewhere.
- **Update all consumers** — Search for imports of the changed symbol before renaming.

### Fixing Bugs
- **Reproduce first** — Understand the root cause before patching.
- **Check related files** — A bug in a component may originate in its hook, service, or schema.
- **Add regression tests** — Once fixed, ensure the case is covered.

---

## 6. Testing Guidelines

### Current State
**No test framework is currently configured.** The project has no `*.test.ts` or `*.spec.ts` files. When tests are added:

### What to Test
- **Calculation functions** — All pure functions in `@/lib/math/` must have unit tests covering normal range, boundary conditions, and error cases.
- **Validation schemas** — Zod schemas should test valid and invalid inputs.
- **Service methods** — Mock `ApiClient` and verify correct endpoints/payloads.
- **Hook logic** — Test non-trivial hooks like `useMenu`, `useDetailsTabs`.

### What Not to Test
- **UI rendering** — Defer to E2E testing (out of scope for now).
- **shadcn/ui components** — They have their own tests.
- **Trivial barrel exports** — No logic to test.

### Test Structure (when added)
```
src/modules/<feature>/
├── services/
│   ├── feature.service.ts
│   └── feature.service.test.ts    # co-located tests
├── hooks/
│   ├── use-feature.ts
│   └── use-feature.test.ts
```

---

## 7. UI Component Guidelines

### shadcn/ui Components
- Located in `@/components/ui/` — **never modify these files**.
- These are generated by the shadcn CLI. To add a new component:
  ```bash
  pnpm dlx shadcn@latest add <component-name>
  ```
- Compose primitives to build complex UI.

### Form Components
Use wrappers from `@/components/forms/`:
- `FormContainer` — Provides `FormProvider` + `<form>` with `handleSubmit`.
- `FormFieldInput` — Text inputs.
- `FormFieldTextarea` — Textareas.
- `FormFieldSelect` — Select dropdowns.
- `FormFieldDate` — Date pickers.
- `FormFieldMultiSelect` — Multi-select.
- `FormFieldFiles` — File uploads.

### Data Tables
Use `DataTable` from `@/components/data-table/`:
- Column definitions live in module `constants/` files (e.g., `feature-list-columns.tsx`).
- Pass `isLoading`, `error`, and `onRetry` for proper state handling.
- Use `DataTableSkeleton` for loading states.

### Loading States
- Use `Skeleton` from `@/components/ui/skeleton` for individual elements.
- Use `DataTableSkeleton` for table loading.
- Use `PageLoader` from `@/components/loaders` for full-page loading.

---

## 8. Internationalization

### Adding New Translation Keys
1. Add the key to **both** language files:
   - `src/i18n/es/<domain>.json` (Spanish — default)
   - `src/i18n/en/<domain>.json` (English)
2. If a new domain file is needed, create both `.json` files and update the barrel exports:
   - `src/i18n/es/index.ts`
   - `src/i18n/en/index.ts`
3. Use the key in code: `t("domain:key.path")`.

### Translation Key Naming
- Use dot-separated paths: `section.subsection.key`
- Group by feature domain: `projects:list.title`, `calibrations:wizard.step1.title`
- Shared keys go in `common.json`: `common:actions.save`, `common:actions.cancel`

### Type Safety
Translation keys are type-checked via `src/types/i18next.d.ts`. Invalid keys will cause TypeScript errors.

---

## 9. Configuration Files

### Files You MAY Modify
| File | When to Modify |
|---|---|
| `src/i18n/{lang}/*.json` | Adding translation keys |
| Module `constants/` files | Adding paths, queries, permissions |
| Module `schemas/` files | Adding or updating Zod schemas |
| `src/config/envs.ts` | Adding new environment variable keys |
| `.env.example` | Documenting new env vars |

### Files You Should NEVER Modify
| File | Why |
|---|---|
| `@/components/ui/*` | shadcn/ui generated files |
| `eslint.config.js` | Linting rules are project-wide decisions |
| `prettier.config.*` | Formatting rules are project-wide decisions |
| `tsconfig*.json` | TypeScript compiler settings are architectural |
| `vite.config.ts` | Build configuration is infrastructure |
| `pnpm-lock.yaml` | Auto-generated by pnpm |
| `src/types/i18next.d.ts` | i18n type augmentation, only update if adding defaultNS |

---

## 10. Pre-Submission Checklist

Before finishing any task, verify:

- [ ] `pnpm build` passes (type-check + build)
- [ ] `pnpm lint` passes (ESLint)
- [ ] All new components are memoized (`memo` or `genericMemo`)
- [ ] All new directories have `index.ts` barrel exports
- [ ] All new interfaces extend `CommonFields` (if domain entities)
- [ ] All new forms use Zod validation via `FormContainer`
- [ ] All new service methods use `ApiClient` with proper error handling
- [ ] All new hooks wrap service methods with React Query
- [ ] All new query keys follow `MODULE_QUERIES` pattern with `as const`
- [ ] All new translation keys exist in both `es/` and `en/`
- [ ] No `any` types used
- [ ] No `import.meta.env` used directly in components
- [ ] No direct module-to-module imports
- [ ] File names use `kebab-case`
- [ ] Commit message follows Conventional Commits format
