# Module Standard

This is the canonical reference for module structure, file naming, and barrel export rules in SELCAL-Web. All modules must follow these conventions.

## Directory Structure

### Full module

```
src/modules/<module-name>/
├── components/       # Feature-specific UI components (sub-dirs per component)
├── constants/        # Paths, queries, permissions, column definitions
│   └── index.ts      # Re-exports everything in this directory
├── contexts/         # React Context providers
├── helpers/          # Pure utility functions specific to this feature
├── hooks/            # Custom hooks (server state + feature logic)
│   └── index.ts
├── interfaces/       # TypeScript interfaces
│   └── index.ts
├── pages/            # Page-level components
│   └── index.ts
├── routes/           # RouteObject[] definitions
│   └── index.tsx
├── schemas/          # Zod validation schemas
│   └── index.ts
└── services/         # API service classes
    └── index.ts
```

### Light module (only what is needed)

Not every module needs every directory. Omit directories that have no content:

```
src/modules/materials/
└── constants/        # Only static lookup data, no API
    └── index.ts
```

## File Naming Conventions

All typed files use **dot-separated type suffixes**: `<module-name>.<type>.ts(x)`

| Directory | File type | Convention | Example |
|---|---|---|---|
| `constants/` | Route paths | `<name>.paths.ts` | `rolling-mills.paths.ts` |
| `constants/` | React Query keys | `<name>.queries.ts` | `rolling-mills.queries.ts` |
| `constants/` | Permission constants | `<name>.permissions.ts` | `rolling-mills.permissions.ts` |
| `constants/` | Table column defs | `<name>-list.columns.tsx` | `users-list.columns.tsx` |
| `interfaces/` | Domain interface | `<entity>.interface.ts` | `rolling-mill.interface.ts` |
| `schemas/` | Zod schema + payload type | `<entity>-<operation>.schema.ts` | `rolling-mill-create.schema.ts` |
| `services/` | API service class | `<name>.service.ts` | `rolling-mills.service.ts` |
| `pages/` | Page component | `<name>-page.tsx` | `rolling-mills-list-page.tsx` |
| `hooks/` | Custom hook | `use-<action>-<name>.ts` | `use-find-all-rolling-mills.ts` |

## Barrel Export Rules

Every directory that exports multiple items **must** have an `index.ts` that re-exports all of its contents. Consumers import from the directory, not from individual files.

```typescript
// ✅ correct
import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants";

// ❌ wrong — imports directly from file
import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants/rolling-mills.paths";
```

Exception: `routes/index.tsx` is the entry point itself, so it is imported directly.

## Cross-Module Dependencies

- Modules **must not** import from other modules directly.
- Shared logic → `@/shared/` or `@/lib/`.
- Shared components → `@/components/`.
- If Module A needs data from Module B, go through the API.

## Checklist for New Modules

1. Create `src/modules/<name>/`
2. Add `interfaces/<entity>.interface.ts` + `interfaces/index.ts`
3. Add `schemas/<entity>-create.schema.ts` + `schemas/index.ts`
4. Add `services/<name>.service.ts` + `services/index.ts`
5. Add `constants/<name>.paths.ts`, `<name>.queries.ts`, `<name>.permissions.ts`, `constants/index.ts`
6. Add `hooks/use-find-all-<name>.ts`, etc. + `hooks/index.ts`
7. Add `pages/<name>-list-page.tsx` + `pages/index.ts`
8. Add `routes/index.tsx` using paths from `constants`
9. Register routes in `src/components/router/main-routes.tsx`
