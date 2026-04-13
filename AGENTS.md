# AGENTS.md

## Project Overview
**SELCAL-Web** is a modernization of a 2012 legacy system for calculating and designing steel rolling calibrations. This frontend automates the design of calibrations for simple profiles (round, square, hexagonal) to eliminate manual errors and optimize technical reports for specialists at "Antillana de Acero".

## Technical Stack
| Category | Technology |
|---|---|
| **Language** | TypeScript 5.9 (strict mode, no `any`) |
| **Framework** | React 19 + Vite (rolldown-vite) |
| **Package Manager** | **pnpm** |
| **Styling** | Tailwind CSS v4 + shadcn/ui (New York style) |
| **State** | TanStack React Query (server), React Context (client) |
| **Forms** | React Hook Form + Zod |
| **Routing** | React Router v7 |
| **i18n** | i18next (default: Spanish) |
| **HTTP** | Axios with interceptors |

## Development Environment

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (Vite HMR)
pnpm build            # Type-check + production build
pnpm lint             # Run ESLint
pnpm preview          # Preview production build
```

**Environment Variables**: Copy `.env.example` to `.env` and set `VITE_BACKEND_URL`.

## Universal Coding Standards

### 1. TypeScript
- **Strict mode enabled**. Never use `any`. Use `unknown` when type is truly uncertain.
- All domain interfaces extend `CommonFields` (id, createdAt, updatedAt, isActive).
- Use `z.infer<typeof schema>` for payload types derived from Zod schemas.

### 2. Component Patterns
- **All components are memoized**: `export default memo(ComponentName)` or via `genericMemo` HOC.
- **Barrel exports**: Every directory must have an `index.ts` re-exporting its contents.
- **Page components are thin**: Call hooks, pass data to presentational components.
- Use shadcn/ui primitives from `@/components/ui/`.

### 3. Forms
- Use `FormContainer` wrapper (provides `FormProvider` + `<form>`).
- Validate with Zod schemas in module `schemas/` directory.
- Pattern: `export type XPayload = z.infer<typeof xSchema>`.

### 4. API & Server State
- Services extend `ApiService` (abstract base in `@/shared/services`).
- Every service method wrapped in custom hook: `useFindAllX`, `useCreateX`, etc.
- Query keys defined in module `constants/`: `const X_QUERIES = { findAll: ["x:find-all"] }`.
- Mutations show toast notifications via `sonner`.

### 5. Module Structure
Each feature module in `src/modules/<feature>/` follows:
```
components/  constants/  contexts/  helpers/  hooks/
interfaces/  pages/       routes/    schemas/  services/
```

### 6. Internationalization
- Default language: **Spanish** (`es`). Supported: `en`, `es`.
- Namespace pattern: `t("domain:key.path")` (e.g., `t("projects:tabs.general.title")`).
- Translation files in `src/i18n/{lang}/` organized by domain.

### 7. Git & Commits
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`
- Commit message style: imperative mood, clear "why" over "what".
- PRs require: lint passes, build succeeds, no TypeScript errors.

### 8. Security
- JWT tokens stored in cookies via `@/lib/cookies.ts` service.
- RBAC: `useAuth()` provides `hasPermission()`. `AUTH_PERMISSIONS.ADMIN` bypasses all checks.
- Never hardcode secrets. Use `@/config/envs.ts` for environment variables.
- API client auto-attaches auth header via interceptor.

## Critical Domain Knowledge

This project handles **metallurgical engineering calculations**. Mathematical accuracy is non-negotiable.

When working with calibration logic, refer to:
1. Mean height and width calculations per pass
2. Profile area calculations (per pass, per profile type)
3. Temperature-dependent yield strength (steel grade specific)
4. Rolling force, torque, and power requirements
5. Elongation coefficient calculations

See [`docs/domain/calculations.md`](docs/domain/calculations.md) for detailed formula references.

## Architecture Notes

### Key Patterns
- **Access Control**: `AccessControl` component guards protected routes (AUTH/PUBLIC/PROTECTED classification).
- **Module Layout**: `ModuleLayout` redirects from module root to default sub-route.
- **Tabs**: `useDetailsTabs<T>` manages tab state via URL search params (`?tab=general`).
- **Data Tables**: `DataTable` wraps TanStack Table with skeleton/error/empty states.
- **Permissions**: `PermissionsCheck` component conditionally renders children. `useMenu()` filters sidebar by permissions.

### Path Alias
`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## File Organization Reference

```
src/
├── components/        # Shared UI (ui/, forms/, layouts/, router/, etc.)
├── config/            # API config, environment variables
├── hooks/             # Global hooks (use-menu, use-details-tabs, etc.)
├── i18n/              # Translations (en/, es/)
├── lib/               # Utilities (api-client, cookies, math, utils)
├── modules/           # Feature modules (auth, calibrations, projects, etc.)
├── shared/            # Cross-cutting (interfaces, schemas, services, utils)
└── types/             # Global type declarations
```

## Detailed Guides

- **TypeScript Standards**: [`docs/standards/typescript.md`](docs/standards/typescript.md)
- **Component Patterns**: [`docs/standards/components.md`](docs/standards/components.md)
- **Module Architecture**: [`docs/architecture/module-structure.md`](docs/architecture/module-structure.md)
- **API Layer**: [`docs/architecture/api-layer.md`](docs/architecture/api-layer.md)
- **Domain Calculations**: [`docs/domain/calculations.md`](docs/domain/calculations.md)

## Common Pitfalls — Never Do These

1. **Never use `any`** — Use `unknown` with type guards, or derive types from Zod schemas via `z.infer`.
2. **Never modify files in `@/components/ui/`** — These are shadcn/ui generated files. Compose, don't edit.
3. **Never import between modules directly** — Use shared services, `@/shared/`, or `@/components/` for cross-cutting concerns.
4. **Never skip memoization** — Every component must be wrapped in `memo()` or `genericMemo`.
5. **Never hardcode translation strings** — Always use `t("namespace:key")` with keys in `src/i18n/{lang}/`.
6. **Never use `import.meta.env` directly in components** — Use `getEnv()` from `@/config/envs.ts`.
7. **Never create barrel exports without `index.ts`** — Every directory with multiple exports needs one.
8. **Never mutate server state directly** — Always use React Query mutations with proper `onSuccess`/`onError` handlers.
9. **Never skip Zod validation on forms** — Every form input must be validated with a Zod schema.
10. **Never assume calculation formulas** — All metallurgical formulas must match the 2012 legacy system. Verify against `docs/domain/calculations.md`.
