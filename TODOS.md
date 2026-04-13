# SELCAL-Web — Development Status Tracker

> **Domain**: Metallurgical Engineering — Steel Rolling Calibration System
> **Target Users**: Specialists at "Antillana de Acero"
> **Tech Stack**: React 19 + TypeScript 5.9 (strict) + Vite + Tailwind CSS v4 + shadcn/ui
> **Package Manager**: pnpm
> **Last Updated**: 2026-04-05

---

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Complete — production-ready |
| 🟡 | Partially implemented — needs work |
| 🔴 | Not started / missing entirely |
| 🗑️ | Should be removed/replaced |

---

## 1. Infrastructure & Foundation

| Area | Status | Notes |
|---|---|---|
| Vite + React 19 + TypeScript | ✅ | Strict mode, no `any` |
| Tailwind CSS v4 + shadcn/ui | ✅ | New York style, Radix primitives |
| TanStack React Query | ✅ | Server state management |
| React Hook Form + Zod | ✅ | Form validation |
| React Router v7 | ✅ | Route configuration |
| i18next (ES default, EN) | ✅ | 13 namespaces per language |
| Axios with interceptors | ✅ | Auth header attachment |
| JWT cookies management | ✅ | Via `@/lib/cookies.ts` |
| Math calculation library | ✅ | All formulas in `@/lib/math/calculations.ts` |
| Design system / UI primitives | ✅ | `@/components/ui/` |
| Shared form components | ✅ | `FormContainer`, `FormInputField`, `FormSelectField`, etc. |
| Data table (TanStack Table) | ✅ | With skeleton/error/empty states |
| RBAC (Role-Based Access Control) | ✅ | `AccessControl` component + `hasPermission()` |

---

## 2. Module Status

### 2.1 SELCAL Domain Modules

#### Auth Module (`src/modules/auth/`)

| Area | Status | Notes |
|---|---|---|
| Login page + form + hook | ✅ | Full flow with Zod validation |
| Auth context + `useAuth()` | ✅ | User, permissions, ADMIN bypass |
| Access control / route guards | ✅ | Redirects for public/protected routes |
| Auth service (all endpoints) | ✅ | login, getCurrentUser, logout, refreshToken, verifyToken |
| Logout flow | ✅ | Clears cookies, invalidates queries, toast |
| Signup page | 🔴 | **Stub** — renders `<p>SignupPage</p>` only |
| Signup form, schema, hook | 🔴 | Missing entirely |
| Token refresh mechanism | 🟡 | Exists in service but **commented out** in helpers |
| Barrel exports | 🟡 | Missing `index.ts` for hooks, constants, helpers, interfaces, contexts |
| Error display on login failure | 🟡 | Error captured but not rendered in UI |

#### Calibrations Module (`src/modules/calibrations/`)

| Area | Status | Notes |
|---|---|---|
| Domain interfaces | ✅ | `ProfileType`, `Billet`, `TargetProfile`, `CalibrationInput`, `PassResult`, `CalibrationResult`, `SimulationComparison` |
| Zod validation schemas | ✅ | `billetSchema`, `targetProfileSchema`, `calibrationInputSchema`, `simulationSchema` |
| API service layer | ✅ | calculate, simulate, save, findAll, findOne, delete, getProfiles, getMaterials |
| Query keys & paths constants | ✅ | `CALIBRATIONS_QUERIES`, `CALIBRATIONS_PATHS` |
| Single-page form component | 🟡 | Renders billet + target inputs + aggregate summary |
| Page with mutation + toast | ✅ | `CalibrationWizardPage` with `useMutation` |
| Routes | 🟡 | Both `/calibrations` and `/calibrations/wizard` render same page (redundant) |
| **Multi-step wizard flow** | 🔴 | Currently a single-page form, not a wizard with steps/progress |
| **Pass sequence results table** | 🔴 | `PassResult` interface defined but never rendered — no individual pass rows |
| **"What-if" simulation UI** | 🔴 | `SimulationComparison` + `simulate()` exist but no component/page |
| **Data visualization / charts** | 🔴 | Recharts installed but unused in calibrations |
| **CRUD custom hooks** | 🔴 | Service methods not wrapped per project conventions (`useFindAllCalibrations`, `useCreateCalibration`, etc.) |
| **Saved calibrations list** | 🔴 | No page to browse/view/delete saved calibrations |
| **Inline editing for overrides** | 🔴 | Not implemented |
| **Comparison view (baseline vs modified)** | 🔴 | Not implemented |
| **i18n namespace** | 🔴 | No `calibrations.json` in `i18n/es/` or `i18n/en/` |
| **Sidebar navigation entry** | 🔴 | Not in `useMenu()` |
| Error boundaries for calc failures | 🔴 | Not implemented |
| Loading skeletons for results | 🔴 | Not implemented |

#### Materials Module (`src/modules/materials/`)

| Area | Status | Notes |
|---|---|---|
| Steel grades constants | ✅ | 5 grades (AISI 1020, 1045, 1018, 4140, 1008) |
| Profile size constants | ✅ | 28 round, 28 square, 25 hexagonal sizes |
| Profile type helpers | ✅ | `getProfilesByType()`, `PROFILE_TYPES`, `STEEL_GRADE_OPTIONS` |
| Static materials service | ✅ | Local data accessors, area calculations |
| **Own interfaces** | 🔴 | Imports `ProfileType`/`SteelGrade` from calibrations (violates module isolation) |
| **Zod schemas** | 🔴 | Missing |
| **Custom hooks** | 🔴 | Missing |
| **Components** | 🔴 | Missing (no profile selector, grade picker) |
| **Pages** | 🔴 | Missing |
| **Routes** | 🔴 | Not registered in app router |
| **i18n integration** | 🔴 | Labels hardcoded in English |
| **Sidebar navigation entry** | 🔴 | Not in `useMenu()` |
| **Module barrel export** | 🔴 | No `index.ts` at module root |

#### Reports Module (`src/modules/reports/`)

| Area | Status | Notes |
|---|---|---|
| Entire module | 🔴 | **Does not exist** — no directory, no files |
| PDF preview/download | 🔴 | Not implemented |
| Technical report generation | 🔴 | Not implemented |
| Export (PDF, CSV) | 🔴 | Not implemented |
| i18n namespace | 🟡 | `reports.json` exists in both languages but has no module to consume it |

---

### 2.2 Template Modules (To Replace)

These modules are fully functional but are **generic project/issue management** code from a template. They have no connection to the steel/calibrations domain and should be replaced with SELCAL-specific equivalents.

#### Projects Module (`src/modules/projects/`) — 🗑️ Replace

| Area | Status | Notes |
|---|---|---|
| Implementation | ✅ Complete | Full CRUD, list + details pages, member management |
| Domain relevance | 🗑️ None | Generic project management (name, description, dates, members) |
| **Replacement** | 🔴 Needed | **Calibration Projects** — each "project" = a calibration design job (profile type, steel grade, target dimensions, material specs, associated passes) |

#### Issues Module (`src/modules/issues/`) — 🗑️ Replace

| Area | Status | Notes |
|---|---|---|
| Implementation | ✅ Complete | Full CRUD, list + details pages, comments integration, status/priority/type enums |
| Domain relevance | 🗑️ None | Software issue tracking (task, bug, feature, sprint states) |
| **Replacement** | 🔴 Needed | **Calibration Pass Management** — individual rolling passes with: pass number, mean height/width, profile area, rolling force, torque, power, elongation coefficient, temperature |

#### Dashboard Module (`src/modules/dashboard/`) — 🗑️ Replace

| Area | Status | Notes |
|---|---|---|
| Implementation | ✅ Complete | KPI cards, status/priority breakdowns, Recharts bar chart |
| Domain relevance | 🗑️ None | Metrics about issues and projects (totalIssues, closureRate, avgResolutionTime) |
| **Replacement** | 🔴 Needed | **Calibration Analytics** — total calibrations, by profile type, avg rolling force, material usage, steel grade distribution, recent activity |

#### Security Module (`src/modules/security/`) — ✅ Keep

| Area | Status | Notes |
|---|---|---|
| Roles sub-module | ✅ Complete | Full CRUD for roles with permissions |
| Users sub-module | ✅ Complete | Full CRUD for users, password management |
| Domain relevance | ✅ Cross-cutting | RBAC is infrastructure, not domain-specific |
| **Action** | ✅ Keep as-is | May add SELCAL-specific permissions constants later |

---

### 2.3 Cross-Cutting Modules (Keep)

| Module | Status | Notes |
|---|---|---|
| Comments (`src/modules/comments/`) | ✅ | Embedded in Issues detail page — full CRUD with file uploads |
| Notifications (`src/modules/notifications/`) | ✅ | Slide-out sheet, mark-as-read — no standalone routes |

---

## 3. Navigation & Routing

| Area | Status | Notes |
|---|---|---|
| Auth routes | ✅ | `/auth/signin`, `/auth/signup` |
| Main layout | ✅ | `MainLayout` with sidebar, header, breadcrumbs, outlet |
| Auth layout | ✅ | `AuthLayout` for login/signup |
| AppSidebar component | 🟡 | Exists at `@/components/app-sidebar/` but has **hardcoded sample team data** (Acme Inc, Evil Corp) |
| NavMain component | ✅ | Renders menu from `useMenu()` hook |
| NavUser component | ✅ | User menu in sidebar footer |
| **useMenu() hook** | 🟡 | Only includes Dashboard, Projects, Issues, Security — **missing Calibrations, Materials** |
| ModuleLayout | ✅ | Redirects from module root to default sub-route |
| **Calibrations in sidebar** | 🔴 | Not added to `useMenu()` |
| **Materials in sidebar** | 🔴 | Not added to `useMenu()` |
| **Reports in sidebar** | 🔴 | Module doesn't exist yet |

---

## 4. Internationalization (i18n)

| Namespace | ES | EN | Notes |
|---|---|---|---|
| `auth` | ✅ | ✅ | Login, logout messages |
| `breadcrumbs` | ✅ | ✅ | Navigation breadcrumbs |
| `comments` | ✅ | ✅ | Comment form strings |
| `common` | ✅ | ✅ | Shared UI strings |
| `dates` | ✅ | ✅ | Date formatting |
| `errors` | ✅ | ✅ | Error messages |
| `issues` | ✅ | ✅ | Issue module strings |
| `menu` | ✅ | ✅ | Sidebar menu labels |
| `permissions` | ✅ | ✅ | Permission descriptions |
| `projects` | ✅ | ✅ | Project module strings |
| `reports` | ✅ | ✅ | Exists but no module consumes it |
| `roles` | ✅ | ✅ | Role management strings |
| `users` | ✅ | ✅ | User management strings |
| **`calibrations`** | 🔴 | 🔴 | **Missing** — needed for wizard, results, simulation |
| **`materials`** | 🔴 | 🔴 | **Missing** — needed for profile selector, grade picker |

---

## 5. Quality & Polish

| Area | Status | Notes |
|---|---|---|
| TypeScript strict mode | ✅ | No `any` used |
| ESLint configuration | ✅ | Type-aware rules enabled |
| Prettier formatting | ✅ | With Tailwind plugin |
| **Error boundaries** | 🔴 | Missing — needed for critical calculation failures |
| **Loading skeletons** | 🔴 | Missing for calibration results |
| **Accessibility (WCAG 2.1 AA)** | 🔴 | Not audited |
| **Unit tests for calculations** | 🔴 | No test files for `@/lib/math/calculations.ts` |
| Barrel exports consistency | 🟡 | Several modules missing `index.ts` files |

---

## 6. Action Items — Prioritized

### Phase 1: Fix Auth & Complete Foundation
1. Complete signup page (form, schema, hook, service method)
2. Uncomment and wire up token refresh mechanism
3. Add missing barrel exports to auth module
4. Display login errors in UI
5. Replace hardcoded team data in `AppSidebar` with real company info

### Phase 2: Replace Template Modules
6. **Replace Dashboard** → Calibration analytics (total calibrations, by profile type, grade distribution)
7. **Replace Projects** → Calibration project management (profile specs, steel grade, target dimensions)
8. **Replace Issues** → Calibration pass management OR remove if not needed
9. Update `useMenu()` to reference new SELCAL modules
10. Update sidebar navigation items and icons

### Phase 3: Build Calibrations Module
11. Convert single-page form to **multi-step wizard** (billet input → profile selection → calculation)
12. Build **pass sequence results table** with all engineering metrics per pass
13. Wire up **custom hooks** for all service methods (`useFindAllCalibrations`, `useCreateCalibration`, etc.)
14. Build **saved calibrations list** page with CRUD operations
15. Add **loading skeletons** for calculation results

### Phase 4: Simulation & Visualization
16. Build **"what-if" simulation** UI with baseline vs. modified comparison
17. Integrate **Recharts** for Force vs. Temperature, Power per pass, Area reduction, Temperature evolution
18. Add **inline editing** for manual parameter overrides
19. Add **error boundaries** for calculation failures

### Phase 5: Materials Module
20. Define own interfaces (don't import from calibrations)
21. Add Zod schemas for material/profile validation
22. Build profile selector and steel grade picker components
23. Add i18n translations for profile labels
24. Create materials page/routes if standalone view is needed
25. Add to sidebar navigation

### Phase 6: Reports Module
26. Create `src/modules/reports/` module structure
27. Build PDF preview component
28. Implement technical report generation UI
29. Add export functionality (PDF, CSV)
30. Wire up existing `reports.json` translations

### Phase 7: Polish & Production
31. Add i18n namespaces for calibrations and materials
32. Audit accessibility (WCAG 2.1 AA)
33. Write unit tests for calculation library
34. Performance optimization for large data tables
35. User acceptance testing with "Antillana de Acero" specialists

---

## 7. Critical Formulas Reference

When implementing calibration logic, ensure accuracy for:

1. **Mean height and width** at each pass
2. **Profile area calculation** (per pass, per profile type: round, square, hexagonal)
3. **Temperature-dependent yield strength** (steel grade specific)
4. **Rolling force** = f(area, yield_strength, friction)
5. **Torque and power requirements** = f(force, roll_diameter, rpm)
6. **Elongation coefficient** = f(initial_area, final_area)

> ⚠️ **Precision First**: Mathematical accuracy is non-negotiable. All formulas must be validated against the 2012 legacy system baseline. See `docs/domain/calculations.md` for detailed formula references.

---

## 8. Architecture Rules (from AGENTS.md)

- **Never use `any`** — Use `unknown` with type guards or `z.infer`
- **Never modify `@/components/ui/`** — Compose, don't edit shadcn files
- **Never import between modules directly** — Use `@/shared/` or `@/components/`
- **Never skip memoization** — Every component in `memo()` or `genericMemo`
- **Never hardcode translation strings** — Always use `t("namespace:key")`
- **Never skip Zod validation** — Every form input must be validated
- **Never create barrel exports without `index.ts`** — Every directory needs one
- **Never mutate server state directly** — Use React Query mutations

---

## 9. File Organization Reference

```
src/
├── components/        # Shared UI (ui/, forms/, data-table/, app-sidebar/, etc.)
├── config/            # API config, environment variables
├── hooks/             # Global hooks (use-menu, use-details-tabs, etc.)
├── i18n/              # Translations (en/, es/) — 13 namespaces each
├── lib/               # Utilities (api-client, cookies, math/calculations, utils)
├── modules/           # Feature modules (see status above)
│   ├── auth/          # 🟡 Partially complete
│   ├── calibrations/  # 🟡 Partially complete
│   ├── materials/     # 🔴 Skeleton only
│   ├── reports/       # 🔴 Does not exist
│   ├── dashboard/     # 🗑️ Replace with calibration analytics
│   ├── projects/      # 🗑️ Replace with calibration projects
│   ├── issues/        # 🗑️ Replace with pass management
│   ├── comments/      # ✅ Cross-cutting (keep)
│   ├── notifications/ # ✅ Cross-cutting (keep)
│   └── security/      # ✅ RBAC (keep)
├── shared/            # Cross-cutting (interfaces, schemas, services, utils)
└── types/             # Global type declarations
```
