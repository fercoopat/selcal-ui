# Module Structure

## Feature Module Organization

Each feature module in `src/modules/<feature>/` follows a consistent directory structure:

```
modules/<feature>/
├── components/     # Feature-specific UI components (not shared)
├── constants/      # Query keys, paths, permissions, column definitions
├── contexts/       # React Context providers for this feature
├── helpers/        # Pure utility functions specific to this feature
├── hooks/          # Feature-specific custom hooks
├── interfaces/     # TypeScript interfaces (extend CommonFields)
├── pages/          # Page-level components (exported via index.ts)
├── routes/         # Route object definitions (RouteObject[])
├── schemas/        # Zod validation schemas
└── services/       # API service classes (extend ApiService)
```

### Lighter Modules

Not all modules need every directory. Simpler modules have only what they need:
- `materials/` — only `constants/` (steel grade options, profile types)
- `comments/` — no pages or routes (embedded in other modules)
- `notifications/` — no pages (used as a widget)
- `dashboard/` — no schemas (read-only stats)

## Module Directory Conventions

### `components/`
Feature-specific UI components that are **not** shared across modules.
```
modules/calibrations/components/
├── calibration-wizard/
│   ├── step-billet-input.tsx
│   ├── step-profile-selection.tsx
│   └── step-results-table.tsx
└── pass-sequence-chart/
    └── pass-sequence-chart.tsx
```

### `constants/`
All constant definitions for the module:

```typescript
// modules/projects/constants/projects-paths.ts
export const PROJECT_PATHS = {
  basePath: "/projects",
  listPath: "/projects/list",
  detailsPath: (id: string) => `/projects/${id}`,
  createPath: "/projects/create",
};

// modules/projects/constants/projects-queries.ts
export const PROJECTS_QUERIES = {
  findAll: ["projects:find-all"] as const,
  findOne: (id: string) => ["projects:find-one", id] as const,
  dropdownOptions: ["projects:dropdown-options"] as const,
};

// modules/projects/constants/projects-permissions.ts
export const PROJECTS_PERMISSIONS = {
  READ: "projects_read",
  CREATE: "projects_create",
  UPDATE: "projects_update",
  DELETE: "projects_delete",
};

// modules/projects/constants/projects-list-columns.tsx
export const projectsColumns: ColumnDef<Project>[] = [ /* ... */ ];
```

### `contexts/`
React Context providers for feature-level state:

```tsx
// modules/projects/contexts/project-details-context.tsx
interface ProjectDetailsContext {
  project: Project | null;
  isLoading: boolean;
  refetch: () => void;
}

export const ProjectDetailsProvider = ({ children, projectId }: Props) => {
  const { data, isLoading, refetch } = useFindOneProject(projectId);
  
  return (
    <ProjectDetailsContext.Provider value={{ project: data, isLoading, refetch }}>
      {children}
    </ProjectDetailsContext.Provider>
  );
};
```

### `hooks/`
Custom hooks follow naming convention: `use<Feature><Action>`:

```typescript
// Server state hooks
export const useFindAllProjects = () => { /* ... */ };
export const useFindOneProject = (id: string) => { /* ... */ };
export const useCreateProject = () => { /* ... */ };
export const useUpdateProject = (id: string) => { /* ... */ };
export const useDeleteProject = () => { /* ... */ };

// Feature logic hooks
export const useProjectDetails = (id: string) => { /* ... */ };
export const useProjectFilters = () => { /* ... */ };
```

### `interfaces/`
All domain interfaces extend `CommonFields`:

```typescript
// modules/projects/interfaces/project.interface.ts
import type { CommonFields } from "@/shared/interfaces";

export interface Project extends CommonFields {
  name: string;
  description: string;
  materialId: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}
```

### `pages/`
Page-level components. Thin, orchestration-only:

```typescript
// modules/projects/pages/index.ts
export { default as ProjectsListPage } from "./projects-list-page";
export { default as ProjectDetailsPage } from "./project-details-page";
export { default as CreateProjectPage } from "./create-project-page";
```

### `routes/`
Route definitions using React Router v7 `RouteObject` pattern:

```typescript
// modules/projects/routes/projects-routes.tsx
import { RouteObject } from "react-router";
import { lazy } from "react";

const ProjectsListPage = lazy(() => import("../pages/projects-list-page"));
const ProjectDetailsPage = lazy(() => import("../pages/project-details-page"));

export const projectsRoutes: RouteObject[] = [
  {
    path: "list",
    element: <ProjectsListPage />,
  },
  {
    path: ":id",
    element: <ProjectDetailsPage />,
  },
];
```

### `schemas/`
Zod validation schemas for forms and API payloads:

```typescript
// modules/projects/schemas/project.schema.ts
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  materialId: z.string().uuid("Invalid material"),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;
```

### `services/`
API service classes extending `ApiService`:

```typescript
// modules/projects/services/projects.service.ts
import { ApiService } from "@/shared/services";
import type { Project, SearchParams, SearchResponse } from "@/shared/interfaces";

const BASE_PATH = "/projects";

export class ProjectsService extends ApiService {
  async findAll(params: SearchParams): Promise<SearchResponse<Project>> {
    return this.api.get<SearchResponse<Project>>(this.getPath(BASE_PATH), { params });
  }

  async findOne(id: string): Promise<Project> {
    return this.api.get<Project>(this.getPath(`${BASE_PATH}/${id}`));
  }

  async create(data: CreateProjectPayload): Promise<Project> {
    return this.api.post<Project>(this.getPath(BASE_PATH), data);
  }

  async update(id: string, data: UpdateProjectPayload): Promise<Project> {
    return this.api.put<Project>(this.getPath(`${BASE_PATH}/${id}`), data);
  }

  async remove(id: string): Promise<void> {
    return this.api.delete(this.getPath(`${BASE_PATH}/${id}`));
  }
}

export default new ProjectsService(BASE_PATH);
```

## Barrel Export Pattern

Every directory that exports multiple items must have an `index.ts`:

```typescript
// modules/projects/index.ts
export { default as ProjectsService } from "./services/projects.service";
export { PROJECTS_QUERIES } from "./constants/projects-queries";
export { PROJECT_PATHS } from "./constants/projects-paths";
export { PROJECTS_PERMISSIONS } from "./constants/projects-permissions";
export type { Project, ProjectStatus } from "./interfaces/project.interface";
```

## Adding a New Module

1. Create directory: `src/modules/<feature-name>/`
2. Create required subdirectories (start with what you need)
3. Define interfaces in `interfaces/`
4. Define schemas in `schemas/`
5. Create service in `services/` (extend `ApiService`)
6. Create hooks in `hooks/` (wrap service methods with React Query)
7. Define constants in `constants/` (paths, queries, permissions)
8. Create pages in `pages/`
9. Define routes in `routes/`
10. Register routes in the main router

## Cross-Module Dependencies

- Modules should **not** import from other modules directly.
- Shared logic goes in `@/shared/` or `@/lib/`.
- Shared components go in `@/components/`.
- If Module A needs data from Module B, use the API (not direct imports).
