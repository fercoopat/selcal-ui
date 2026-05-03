# SELCAL-Web UI - AI Agent Instructions

## Project Overview
React + TypeScript UI for SELCAL-Web using Vite, Tailwind CSS, and React Query.

Tech stack:
- Runtime: Node.js 20.x
- Package manager: npm
- Framework: React 18 with Vite 7
- TypeScript 5.x
- UI: Tailwind CSS, shadcn/ui components
- State: @tanstack/react-query, React Hook Form
- Validation: Zod
- Routing: React Router v7
- i18n: i18next (en/es)

## Build & Development Commands
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build (`tsc -b && vite build`)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure
- `src/modules/` - Feature modules (auth, dashboard, security, settings)
- `src/components/` - Shared UI components
- `src/shared/` - Shared utilities, interfaces, services
- `src/i18n/` - Translations (en/es)
- `src/hooks/` - Shared hooks (use-menu, use-toggle)

## Documentation
- Module architecture: [docs/module-architecture.md](docs/module-architecture.md)
- Module creation guide: [docs/module-creation-guide.md](docs/module-creation-guide.md)
- Coding standards: [docs/coding-standards.md](docs/coding-standards.md)

## Code Style & Conventions
- Use absolute imports: `import { X } from "@/modules/..."`
- No default exports (except services: `export { default as X }`)
- All subdirectories must have `index.ts` barrel exports
- Use `memo` for components, `useCallback` for handlers
- Forms: react-hook-form + zodResolver
- Data fetching: @tanstack/react-query with custom hooks
- Translations: Add to both `i18n/en/` and `i18n/es/`

## Module Structure Rules
- Flat modules: auth, dashboard (no submodules)
- Parent modules: security, settings (with submodules)
- Submodules follow flat module structure
- Routing: AppRouter → main-routes → ModuleLayout → submodule routes
- See [docs/module-architecture.md](docs/module-architecture.md) for complete standard

## Git & PR Conventions
- Commit format: Conventional commits (`feat:`, `fix:`, `chore:`)
- Never commit .env files or secrets
- Never commit to main without PR

## Definition of Done
A task is complete when:
1. `npm run build` passes with no errors
2. `npm run lint` passes with no errors
3. Changes are committed with proper conventional commit message
