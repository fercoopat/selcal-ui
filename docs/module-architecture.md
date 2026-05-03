# Module Architecture Standards

## Overview

selcal-ui uses a feature-based modular architecture with two types of modules:
- **Flat modules**: Standalone features without submodules (e.g., `auth`, `dashboard`)
- **Parent modules**: Contain submodules for related features (e.g., `security`, `settings`)

---

## Module Types

### Flat Modules

Standalone modules with no submodules.

**Examples**: `auth/`, `dashboard/`

### Parent Modules

Modules containing multiple submodules for related features.

**Examples**: `security/` (users, roles), `settings/` (materials, mill-types, etc.)

---

## Directory Structure

### Flat Module Structure

```
module-name/
├── components/         # UI components (each with index.ts barrel export)
│   ├── component-name/
│   │   ├── index.ts
│   │   └── component-name.tsx
│   └── ...
├── constants/          # Path, permission, query, and column definitions
│   ├── index.ts
│   ├── module-name.paths.ts
│   ├── module-name.queries.ts
│   ├── module-name.permissions.ts
│   └── module-name-list.columns.tsx
├── contexts/           # React contexts (optional, only if needed)
│   ├── index.ts
│   └── module-name-context.tsx
├── hooks/              # Custom React hooks
│   ├── index.ts
│   ├── use-find-all-module-name.ts
│   ├── use-create-module-name-form.ts
│   └── ...
├── interfaces/         # TypeScript interfaces
│   ├── index.ts
│   └── module-name.interface.ts
├── pages/              # Page components (lazy-loaded)
│   ├── index.ts       # Uses React.lazy()
│   └── module-name-list-page.tsx
├── routes/             # Route definitions
│   └── index.tsx
├── schemas/            # Zod validation schemas
│   ├── index.ts
│   ├── module-name-create.schema.ts
│   └── module-name-update.schema.ts
└── services/           # API service layer
    ├── index.ts
    └── module-name.service.ts
```

### Parent Module Structure

```
module-name/
├── shared/             # Module-level shared resources
│   ├── constants/
│   │   ├── index.ts
│   │   └── module-name.paths.ts
│   ├── routes/
│   │   └── index.tsx  # Aggregates all submodule routes
│   └── schemas/
│       ├── index.ts
│       └── shared-schema.ts
└── submodule-name/     # Follows flat module structure
    ├── components/
    ├── constants/
    ├── hooks/
    ├── interfaces/
    ├── pages/
    ├── routes/
    ├── schemas/
    └── services/
```

---

## Barrel Export Pattern

Every subdirectory must have an `index.ts` file for clean imports.

### Components
```typescript
// components/component-name/index.ts
export { default as ComponentName } from "./component-name";
```

### Pages (Lazy Loaded)
```typescript
// pages/index.ts
import { lazy } from "react";

export const PageName = lazy(
  () => import("@/modules/module-name/pages/page-name")
);
```

### Hooks, Interfaces, Schemas (Named Exports)
```typescript
// hooks/index.ts
export { useHookName } from "./use-hook-name";
export { anotherHook } from "./another-hook";

// interfaces/index.ts
export type { InterfaceName } from "./interface-name";

// schemas/index.ts
export { schemaName } from "./schema-name";
export type { SchemaPayload } from "./schema-name";
```

### Services (Default Export with Named Re-export)
```typescript
// services/index.ts
export { default as ServiceName } from "./service-name.service";
```

---

## Routing Hierarchy

```
AppRouter (components/router/app-router.tsx)
├── AccessControl wrapper
├── authRoutes (modules/auth/routes/)
└── mainRoutes (components/router/main-routes.tsx)
    ├── MainLayout (sidebar + header + outlet)
    ├── DASHBOARD_ROUTES
    ├── SECURITY_ROUTES (modules/security/shared/routes/)
    │   ├── ModuleLayout (redirects to default submodule)
    │   ├── ROLES_ROUTES
    │   └── USERS_ROUTES
    └── SETTINGS_ROUTES (modules/settings/shared/routes/)
        ├── ModuleLayout (redirects to default submodule)
        └── MATERIALS_ROUTES
```

### Route Definition Pattern

```typescript
// modules/settings/materials/routes/index.tsx
import type { RouteObject } from "react-router";
import { MATERIALS_PATHS } from "@/modules/settings/materials/constants/materials.paths";
import { MaterialsListPage } from "@/modules/settings/materials/pages";

export const MATERIALS_ROUTES: RouteObject[] = [
  {
    path: MATERIALS_PATHS.BASE_PATH,
    children: [
      {
        path: MATERIALS_PATHS.BASE_PATH,
        Component: MaterialsListPage,
      },
    ],
  },
];
```

---

## Naming Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| Paths | `*.paths.ts` | `users.paths.ts`, `materials.paths.ts` |
| Permissions | `*.permissions.ts` | `users.permissions.ts` |
| Queries | `*.queries.ts` | `users.queries.ts` |
| Schemas | `*-create.schema.ts`, `*-update.schema.ts` | `user-create.schema.ts` |
| Services | `*.service.ts` | `users.service.ts` |
| Hooks | `use-*.ts` | `use-find-all-users.ts`, `use-create-user-form.ts` |
| Pages | `*-page.tsx` | `users-list-page.tsx`, `user-details-page.tsx` |
| Components | kebab-case folders | `user-form-dialog/`, `users-list-toolbar/` |
| Interfaces | `*.interface.ts` | `user.interface.ts`, `material.interface.ts` |
| Constants index | `index.ts` | Barrel export with re-exports |
| Routes | `index.tsx` | React Router route objects |
| Contexts | `*-context.tsx` | `user-details-context.tsx` |

---

## References

- For implementation patterns and coding conventions: [coding-standards.md](coding-standards.md)
- For step-by-step module creation guide: [module-creation-guide.md](module-creation-guide.md)
