# API Layer

## Architecture Overview

```
ApiClient (Axios instance with interceptors)
  └── ApiService (abstract base class)
       └── AuthService, ProjectsService, CalibrationsService, etc.
            └── Wrapped in custom hooks (useFindAllX, useCreateX, etc.)
```

## ApiClient (`@/lib/api-client.ts`)

The Axios instance with configured interceptors:

### Request Interceptor
- Automatically attaches `Authorization: Bearer <token>` header via `addAuthHeader()`.
- Token retrieved from cookies service (`@/lib/cookies.ts`).

### Response Interceptor
- **200/201**: Saves auth tokens from login responses via `saveAuthTokens()`.
- **401**: Redirects to login page (session expired / unauthorized).
- **403**: Dispatches forbidden event.
- **422**: Handles validation errors.
- **500+**: Handles server errors.

> **TODO**: Token refresh logic is currently stubbed. See `// todo: refresh token handle` comment in api-client.ts.

## ApiService Base Class (`@/shared/services/api.service.ts`)

Abstract base class that all feature services extend:

```typescript
export abstract class ApiService {
  protected api = apiClient; // The Axios instance

  constructor(protected basePath: string) {}

  // Builds full path from base path
  protected getPath(path: string): string {
    return `${this.basePath}${path}`;
  }
}
```

### Service Implementation Pattern

```typescript
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

// Singleton export
export default new ProjectsService(BASE_PATH);
```

## React Query Hook Pattern

Every service method is wrapped in a custom hook:

### Query Hooks (Read Operations)

```typescript
import { useQuery } from "@tanstack/react-query";
import { PROJECTS_QUERIES } from "../constants";
import projectsService from "../services/projects.service";

export const useFindAllProjects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: PROJECTS_QUERIES.findAll,
    queryFn: () => projectsService.findAll({}),
  });

  return {
    projects: data?.data ?? [],
    isLoading,
    error,
    refetch,
  };
};

export const useFindOneProject = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: PROJECTS_QUERIES.findOne(id),
    queryFn: () => projectsService.findOne(id),
    enabled: !!id,
  });

  return {
    project: data ?? null,
    isLoading,
    error,
    refetch,
  };
};
```

### Mutation Hooks (Write Operations)

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PROJECTS_QUERIES } from "../constants";
import projectsService from "../services/projects.service";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => projectsService.create(data),
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERIES.findAll });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsService.remove(id),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERIES.findAll });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};
```

## Query Keys Pattern

Query keys are defined as constants in module `constants/`:

```typescript
export const PROJECTS_QUERIES = {
  findAll: ["projects:find-all"] as const,
  findOne: (id: string) => ["projects:find-one", id] as const,
  dropdownOptions: ["projects:dropdown-options"] as const,
};
```

### Guidelines
- Use namespace prefix: `MODULE_QUERIES`.
- Use `as const` for type safety.
- Dynamic keys use functions: `findOne: (id) => ["projects:find-one", id]`.

## Path Constants Pattern

```typescript
export const PROJECT_PATHS = {
  basePath: "/projects",
  listPath: "/projects/list",
  detailsPath: (id: string) => `/projects/${id}`,
  createPath: "/projects/create",
};
```

Service classes use their own `basePath` constructor parameter, but path constants are useful for routing and navigation.

## API Configuration (`@/config/api.ts`)

Axios base configuration:
- `baseURL`: From `VITE_BACKEND_URL` environment variable.
- `timeout`: Configured timeout value.
- Type exports for API response shapes.

## Proxy Configuration (Vite)

Development proxy is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    "/api": {
      target: env.VITE_BACKEND_URL,
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

This means `/api/projects` in development proxies to `VITE_BACKEND_URL/projects`.

## Error Handling

### In Mutations
All mutations use `sonner` toast notifications:
```typescript
onError: (error: Error) => {
  toast.error(`Failed to create project: ${error.message}`);
}
```

### In Queries
The `DataTable` component handles loading/error states:
```tsx
<DataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  error={error}
  onRetry={() => refetch()}
/>
```

## Environment Variables

Backend URL is configured via `VITE_BACKEND_URL` in `.env`:
```bash
VITE_BACKEND_URL=https://api.example.com
```

Access via `@/config/envs.ts` (never use `import.meta.env` directly in components).

## Security

- **JWT tokens** stored in cookies, auto-attached via interceptor.
- **CSRF**: Backend handles CSRF; frontend only manages auth tokens.
- **No secrets** in frontend code. All sensitive config via environment variables.
- **Token refresh**: Currently stubbed (TODO item).
