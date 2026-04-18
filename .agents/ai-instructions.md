# AI Instructions — Working Guidelines

## 1. Working Principles

### Read Before Editing
- **Scan the module structure first** — Check what directories exist in the target module.
- **Find existing patterns** — Before creating a new file, read a similar existing file. Match naming, structure, and import style exactly.
- **Check barrel exports** — After creating a file, add its export to the nearest `index.ts`. If none exists, create one.

### Verify Before Submitting
- Run `pnpm build` — Must pass with zero TypeScript errors.
- Run `pnpm lint` — Must pass with zero ESLint errors.

---

## 2. Service Layer — SOLID Patterns

### CrudService (DRY / OCP)

For modules that only need standard CRUD (`findAll`, `findOne`, `create`, `update`, `delete`), use the generic `CrudService<TEntity, TPayload>` instead of writing a new class:

```typescript
// src/modules/rolling-mills/services/rolling-mills.service.ts
import { CrudService } from "@/shared/services";
import type { RollingMill } from "@/modules/rolling-mills/interfaces";
import type { CreateRollingMillPayload } from "@/modules/rolling-mills/schemas";

export const RollingMillsService = new CrudService<
  RollingMill,
  CreateRollingMillPayload
>("/rolling-mills");
```

**When to use `CrudService`:** The endpoint only needs `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`.

**When to extend `ApiService` directly:** The module has custom endpoints (e.g., `/activate`, `/deactivate`, `/refresh`, `/upload`).

```typescript
// src/modules/auth/services/auth.service.ts — custom endpoints, extends ApiService
class AuthService extends ApiService {
  async login(payload: LoginPayload) { ... }
  async register(payload: RegisterPayload) { ... }
  async refreshToken(refreshToken: string) { ... }
  async getCurrentUser() { ... }
  async logout() { ... }
}
export default new AuthService("/auth");
```

### Service Export Convention

All services use **named exports** (not default exports):

```typescript
// ✅ CORRECT — named export
export const RollingMillsService = new CrudService<RollingMill, CreateRollingMillPayload>("/rolling-mills");

// ✅ CORRECT — named class instance (for custom services)
export default new AuthService("/auth"); // auth is the exception (legacy pattern)
```

Barrel `index.ts` re-exports the named export:
```typescript
// src/modules/rolling-mills/services/index.ts
export { RollingMillsService } from "./rolling-mills.service";
```

Hooks import from the barrel:
```typescript
import { RollingMillsService } from "@/modules/rolling-mills/services";
```

---

## 3. Code Generation Templates

### New CRUD Module (uses CrudService)
```
src/modules/<feature>/
├── constants/
│   ├── <feature>-paths.ts          # Route path constants
│   └── <feature>-queries.ts        # React Query keys
├── interfaces/
│   └── index.ts                    # Domain interface (extends CommonFields)
├── schemas/
│   └── index.ts                    # Zod schema + inferred payload type
├── services/
│   ├── <feature>.service.ts        # CrudService<Entity, Payload> instance
│   └── index.ts                    # Barrel: export { XService } from "./..."
├── hooks/
│   └── index.ts                    # React Query wrappers
├── pages/
│   ├── <feature>-list-page.tsx     # memo'd list page
│   └── index.ts                    # Barrel export
└── routes/
    └── index.tsx                   # RouteObject[] with lazy imports
```

### Interface Template
```typescript
// src/modules/<feature>/interfaces/index.ts
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Feature extends CommonFields {
  name: string;
  // ... domain fields
}
```

### Schema Template
```typescript
// src/modules/<feature>/schemas/index.ts
import { z } from "zod";

export const createFeatureSchema = z.object({
  name: z.string().min(1),
  // ... fields matching API CreateDto
});

export type CreateFeaturePayload = z.infer<typeof createFeatureSchema>;
```

### Service Template (CrudService)
```typescript
// src/modules/<feature>/services/<feature>.service.ts
import { CrudService } from "@/shared/services";
import type { Feature } from "@/modules/<feature>/interfaces";
import type { CreateFeaturePayload } from "@/modules/<feature>/schemas";

export const FeatureService = new CrudService<Feature, CreateFeaturePayload>("/<feature>");
```

### Query Keys Template
```typescript
// src/modules/<feature>/constants/<feature>-queries.ts
export const FEATURE_QUERIES = {
  all: ["feature"] as const,
  findAll: ["feature", "list"] as const,
  findOne: (id: string) => ["feature", "details", id] as const,
} as const;
```

### Path Constants Template
```typescript
// src/modules/<feature>/constants/<feature>-paths.ts
export const FEATURE_PATHS = {
  basePath: "/feature",
  detailPath: (id: string) => `/feature/${id}`,
} as const;
```

### Hook Template
```typescript
// src/modules/<feature>/hooks/index.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FEATURE_QUERIES } from "@/modules/<feature>/constants/<feature>-queries";
import { FeatureService } from "@/modules/<feature>/services";
import type { CreateFeaturePayload } from "@/modules/<feature>/schemas";

export const useFindAllFeature = () =>
  useQuery({
    queryKey: FEATURE_QUERIES.findAll,
    queryFn: () => FeatureService.findAll(),
  });

export const useFindOneFeature = (id: string) =>
  useQuery({
    queryKey: FEATURE_QUERIES.findOne(id),
    queryFn: () => FeatureService.findOne(id),
    enabled: !!id,
  });

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFeaturePayload) => FeatureService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FEATURE_QUERIES.all });
      toast.success("Creado exitosamente");
    },
    onError: () => toast.error("Error al crear"),
  });
};

export const useUpdateFeature = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<CreateFeaturePayload>) =>
      FeatureService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FEATURE_QUERIES.all });
      toast.success("Actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar"),
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => FeatureService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FEATURE_QUERIES.all });
      toast.success("Eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar"),
  });
};
```

### Page Template
```tsx
// src/modules/<feature>/pages/<feature>-list-page.tsx
import { memo } from "react";

const FeatureListPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Feature</h1>
    </div>
  );
};

export default memo(FeatureListPage);
```

### Route Template
```tsx
// src/modules/<feature>/routes/index.tsx
import { lazy } from "react";
import type { RouteObject } from "react-router";
import { FEATURE_PATHS } from "@/modules/<feature>/constants/<feature>-paths";

const FeatureListPage = lazy(() => import("@/modules/<feature>/pages/<feature>-list-page"));

export const featureRoutes: RouteObject[] = [
  {
    path: FEATURE_PATHS.basePath,
    children: [
      { index: true, Component: FeatureListPage },
    ],
  },
];
```

### Component Template
```tsx
import { memo } from "react";

interface ComponentNameProps {
  // explicit prop types
}

const ComponentName = ({ prop1 }: ComponentNameProps) => {
  return <div>{prop1}</div>;
};

export default memo(ComponentName);
```

---

## 4. API Modules Reference

The backend API (`/api`) exposes these modules. Each maps to a frontend module:

| API Base Path | Frontend Module | Service |
|---|---|---|
| `/auth` | `modules/auth` | `AuthService` (extends ApiService) |
| `/users` | `modules/security/users` | `UsersService` (extends ApiService) |
| `/security/roles` | `modules/security/roles` | `RolesService` (extends ApiService) |
| `/calibrations` | `modules/calibrations` | `CalibrationsService` (CrudService) |
| `/passes` | `modules/passes` | `PassesService` (CrudService) |
| `/rolling-mills` | `modules/rolling-mills` | `RollingMillsService` (CrudService) |
| `/material-grades` | `modules/material-grades` | `MaterialGradesService` (CrudService) |
| `/chemical-elements` | `modules/chemical-elements` | `ChemicalElementsService` (CrudService) |
| `/mill-types` | `modules/settings/mill-types` | `MillTypesService` (CrudService) |
| `/profile-types` | `modules/settings/profile-types` | `ProfileTypesService` (CrudService) |
| `/pass-geometry-types` | `modules/settings/pass-geometry-types` | `PassGeometryTypesService` (CrudService) |

**Not yet implemented:** `/stands`, `/material-compositions`, `/files`

### Permission Format
All permissions follow `RESOURCE:ACTION` format. Defined in `src/modules/auth/constants/auth-permissions.ts`:
```typescript
AUTH_PERMISSIONS.CALIBRATIONS_READ  // "CALIBRATIONS:READ"
AUTH_PERMISSIONS.USERS_CREATE       // "USERS:CREATE"
AUTH_PERMISSIONS.ADMIN              // "ADMIN" — superuser bypass
```

---

## 5. Anti-Patterns

### ❌ BAD: Writing a new class when CrudService suffices
```typescript
class RollingMillsService extends ApiService {
  async findAll() { ... }
  async findOne(id: string) { ... }
  async create(payload: ...) { ... }
  async update(id: string, payload: ...) { ... }
  async delete(id: string) { ... }
}
```
### ✅ GOOD: Use CrudService
```typescript
export const RollingMillsService = new CrudService<RollingMill, CreateRollingMillPayload>("/rolling-mills");
```

### ❌ BAD: Inline Omit in service method signature
```typescript
async create(payload: Omit<Calibration, keyof CommonFields>) { ... }
```
### ✅ GOOD: Use the Zod-inferred payload type
```typescript
async create(payload: CreateCalibrationPayload) { ... }
```

### ❌ BAD: Default export for service instances
```typescript
export default new RollingMillsService("/rolling-mills");
// then in barrel: export { default as RollingMillsService } from "..."
```
### ✅ GOOD: Named export
```typescript
export const RollingMillsService = new CrudService<...>("/rolling-mills");
// then in barrel: export { RollingMillsService } from "..."
```

### ❌ BAD: Using `any`
```typescript
const fetchData = async (id: any): Promise<any> => { ... };
```
### ✅ GOOD: Explicit types
```typescript
const fetchData = async (id: string): Promise<Entity> => { ... };
```

### ❌ BAD: Unmemoized component
```typescript
export const MyComponent = ({ title }: Props) => <div>{title}</div>;
```
### ✅ GOOD: Memoized
```typescript
export default memo(MyComponent);
```

### ❌ BAD: Hardcoded translation string
```tsx
<h1>Calibrations</h1>
```
### ✅ GOOD: i18next key
```tsx
const { t } = useTranslation("calibrations");
<h1>{t("title")}</h1>
```

### ❌ BAD: Direct `import.meta.env` in component
```typescript
const url = import.meta.env.VITE_BACKEND_URL;
```
### ✅ GOOD: Use `getEnv()`
```typescript
import { getEnv, ENV_KEYS } from "@/config/envs";
const url = getEnv(ENV_KEYS.BACKEND_URL);
```

### ❌ BAD: Missing barrel export
```
// src/modules/feature/pages/feature-page.tsx  (no index.ts)
```
### ✅ GOOD: Barrel export
```typescript
// src/modules/feature/pages/index.ts
export { default as FeaturePage } from "./feature-page";
```

---

## 6. Pattern Recognition

| Pattern | What to Do |
|---|---|
| New CRUD module | Use `CrudService<TEntity, TPayload>` — no new class needed |
| Custom endpoints (activate, refresh, upload) | Extend `ApiService` directly |
| New hook wrapping service | `useQuery` for reads, `useMutation` for writes, always `toast` + `invalidateQueries` |
| New form | `FormContainer` + Zod schema + `useForm<XPayload>` + `zodResolver` |
| New page component | Thin — call hooks, pass to presentational components, `memo()` |
| New constant file | `UPPER_SNAKE_CASE`, `as const` |
| New translation key | Add to both `es/` and `en/` JSON files |
| New interface | Extend `CommonFields`, place in module `interfaces/index.ts` |
| New route | `lazy()` import, `RouteObject[]`, register in `main-routes.tsx` |
| Settings lookup tables | Load once, sort by `sortOrder` ascending in `select` option of `useQuery` |

---

## 7. Adding a New Module — Step-by-Step

1. Create `src/modules/<feature>/` with needed subdirectories.
2. `interfaces/index.ts` — domain interface extending `CommonFields`.
3. `schemas/index.ts` — Zod schema + `CreateFeaturePayload` type.
4. `services/<feature>.service.ts` — `CrudService` instance (or `ApiService` subclass for custom endpoints).
5. `services/index.ts` — barrel: `export { FeatureService } from "./..."`.
6. `constants/<feature>-queries.ts` — `FEATURE_QUERIES` with `all`, `findAll`, `findOne`.
7. `constants/<feature>-paths.ts` — `FEATURE_PATHS` with `basePath`.
8. `hooks/index.ts` — React Query wrappers.
9. `pages/<feature>-list-page.tsx` + `pages/index.ts` — memo'd page + barrel.
10. `routes/index.tsx` — lazy `RouteObject[]`.
11. Register in `src/components/router/main-routes.tsx`.
12. Add to `src/hooks/use-menu.ts` with correct permission.
13. Add translation keys to `src/i18n/es/menu.json` and `src/i18n/en/menu.json`.

---

## 8. UI Component Guidelines

### shadcn/ui Components
- Located in `@/components/ui/` — **never modify these files**.
- Add new: `pnpm dlx shadcn@latest add <component-name>`

### Form Components (`@/components/forms/`)
- `FormContainer` — `FormProvider` + `<form>` with `handleSubmit`
- `FormFieldInput`, `FormFieldTextarea`, `FormFieldSelect`, `FormFieldDate`, `FormFieldMultiSelect`, `FormFieldFiles`

### Data Tables (`@/components/data-table/`)
- Column definitions in module `constants/` (e.g., `feature-list-columns.tsx`)
- Pass `isLoading`, `error`, `onRetry`

---

## 9. Internationalization

1. Add key to **both** `src/i18n/es/<domain>.json` and `src/i18n/en/<domain>.json`.
2. If new domain file: create both `.json` files and update `src/i18n/{es,en}/index.ts` barrels.
3. Use: `t("domain:key.path")`.

---

## 10. Configuration Files

### May Modify
| File | When |
|---|---|
| `src/i18n/{lang}/*.json` | Adding translation keys |
| Module `constants/` files | Paths, queries, permissions |
| Module `schemas/` files | Zod schemas |
| `src/config/envs.ts` | New env variable keys |

### Never Modify
| File | Why |
|---|---|
| `@/components/ui/*` | shadcn/ui generated |
| `eslint.config.js` | Project-wide linting |
| `tsconfig*.json` | Compiler settings |
| `vite.config.ts` | Build config |
| `pnpm-lock.yaml` | Auto-generated |

---

## 11. Pre-Submission Checklist

- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] All new components are memoized (`memo` or `genericMemo`)
- [ ] All new directories have `index.ts` barrel exports
- [ ] All new interfaces extend `CommonFields`
- [ ] New CRUD services use `CrudService<TEntity, TPayload>` (not a new class)
- [ ] Service exports are named (not default)
- [ ] All new hooks use React Query with `toast` + `invalidateQueries`
- [ ] All new query keys use `QUERIES.all` for invalidation
- [ ] All new translation keys exist in both `es/` and `en/`
- [ ] No `any` types
- [ ] No `import.meta.env` in components
- [ ] No direct module-to-module imports
- [ ] File names use `kebab-case`
- [ ] Commit follows Conventional Commits
