# AGENTS.md

## Project Overview

**SELCAL-Web** — React 19 frontend for designing steel rolling calibrations (round, square, hexagonal profiles) at "Antillana de Acero". Replaces a 2012 legacy system.

## Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript 5.9 (strict, no `any`) |
| Framework | React 19 + Vite (rolldown-vite) |
| Package Manager | pnpm |
| Styling | Tailwind CSS v4 + shadcn/ui (New York) |
| State | TanStack React Query (server) · React Context (client) |
| Forms | React Hook Form + Zod |
| Routing | React Router v7 |
| i18n | i18next (default: Spanish) |
| HTTP | Axios with interceptors |

## Dev Commands

```bash
pnpm install   # install deps
pnpm dev       # dev server (HMR)
pnpm build     # type-check + build
pnpm lint      # ESLint
```

Copy `.env.example` → `.env`, set `VITE_BACKEND_URL`.

## Source Layout

```
src/
├── components/   # Shared UI (ui/, forms/, layouts/, router/)
├── config/       # Env vars, API config
├── hooks/        # Global hooks
├── i18n/         # Translations (en/, es/)
├── lib/          # api-client, cookies, math, utils
├── modules/      # Feature modules
├── shared/       # Cross-cutting interfaces, schemas, services
└── types/        # Global type declarations
```

`@/*` → `./src/*` (tsconfig path alias).

## Key Architecture Patterns

- **Access Control**: `AccessControl` guards routes (AUTH / PUBLIC / PROTECTED).
- **Module Layout**: `ModuleLayout` redirects module root to default sub-route.
- **Tabs**: `useDetailsTabs<T>` — tab state via URL `?tab=general`.
- **Data Tables**: `DataTable` wraps TanStack Table with skeleton/error/empty states.
- **Permissions**: `PermissionsCheck` renders children conditionally; `useMenu()` filters sidebar.
- **Auth**: JWT in cookies (`@/lib/cookies.ts`). `useAuth()` → `hasPermission()`. `AUTH_PERMISSIONS.ADMIN` bypasses all checks.
- **Env vars**: always via `getEnv()` from `@/config/envs.ts`, never `import.meta.env` directly.

## Non-Negotiable Rules

1. **No `any`** — use `unknown` + type guards, or `z.infer<typeof schema>`.
2. **Never edit `@/components/ui/`** — shadcn/ui generated files; compose, don't modify.
3. **No cross-module imports** — use `@/shared/`, `@/lib/`, or `@/components/` for shared concerns.
4. **Memoize components with props** — `memo()` or `genericMemo`. No-prop components: skip `memo()`.
5. **No hardcoded strings** — always `t("namespace:key")`.
6. **No hardcoded secrets** — use `@/config/envs.ts`.
7. **Every directory needs `index.ts`** barrel exports.
8. **No direct server state mutation** — React Query mutations with `onSuccess`/`onError`.
9. **All forms need Zod validation** — no exceptions.
10. **Metallurgical formulas must match the 2012 legacy system** — verify against [`docs/domain/calculations.md`](docs/domain/calculations.md).

## Detailed Guides

| Topic | Doc |
|---|---|
| TypeScript conventions | [`docs/standards/typescript.md`](docs/standards/typescript.md) |
| Component patterns | [`docs/standards/components.md`](docs/standards/components.md) |
| Form patterns | [`docs/standards/forms.md`](docs/standards/forms.md) |
| Module structure & naming | [`docs/standards/module-standard.md`](docs/standards/module-standard.md) |
| API layer & React Query | [`docs/architecture/api-layer.md`](docs/architecture/api-layer.md) |
| Domain calculations | [`docs/domain/calculations.md`](docs/domain/calculations.md) |
