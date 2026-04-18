# API Layer

## Architecture Overview

```
ApiClient (Axios instance with interceptors)
  └── ApiService (abstract base class)
       ├── CrudService<TEntity, TPayload> (generic CRUD — extends ApiService)
       │    └── CalibrationsService, PassesService, RollingMillsService, ...
       └── AuthService, UsersService, RolesService (custom endpoints)
            └── Wrapped in custom hooks (useFindAllX, useCreateX, etc.)
```

---

## ApiClient (`@/lib/api-client.ts`)

Axios instance with two interceptors.

### Request Interceptor
Attaches `Authorization: Bearer <token>` via `addAuthHeader()`. Token read from cookies (`@/lib/cookies.ts`).

### Response Interceptor

| Status | Behavior |
|--------|----------|
| 200/201 | Saves `accessToken` + `refreshToken` from auth responses via `saveAuthTokens()` |
| 401 (first time) | Attempts token refresh via `POST /auth/refresh` with stored `refreshToken`, retries original request |
| 401 (after retry) | Clears all auth data, redirects to login |
| 403 | Dispatches `auth:forbidden` custom event |
| 400 | Rejects with `{ status: 400, message }` for field-level error mapping |
| 409 | Rejects with `{ status: 409, message: "This record already exists." }` |
| 429 | Rejects with `{ status: 429, message: "Too many requests, please wait." }` |
| 500+ | Rejects with generic server error message |

---

## ApiService Base Class (`@/shared/services/api.service.ts`)

Abstract base for all services. Provides `getPath(suffix?)` to build endpoint URLs from `basePath`.

```typescript
export abstract class ApiService {
  constructor(private basePath: string) {}

  getPath(path?: string): string {
    if (!path) return this.basePath;
    return this.basePath + path;
  }
}
```

---

## CrudService (`@/shared/services/crud.service.ts`)

Generic service for modules that only need standard CRUD. **Use this instead of writing a new class** when the module maps to `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`.

```typescript
export class CrudService<TEntity, TPayload> extends ApiService {
  async findAll(): Promise<TEntity[]>
  async findOne(id: string): Promise<TEntity>
  async create(payload: TPayload): Promise<TEntity>
  async update(id: string, payload: Partial<TPayload>): Promise<TEntity>
  async delete(id: string): Promise<TEntity>
}
```

### Usage
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

### When to extend `ApiService` directly
Only when the module has endpoints beyond standard CRUD:

```typescript
// AuthService — login, register, refresh, me, logout
class AuthService extends ApiService {
  async login(payload: LoginPayload) { ... }
  async register(payload: RegisterPayload) { ... }
  async refreshToken(refreshToken: string) { ... }
  async getCurrentUser() { ... }
  async logout() { ... }
}
```

---

## Service Export Convention

All services use **named exports**:

```typescript
// ✅ Named export (CrudService instances)
export const RollingMillsService = new CrudService<...>("/rolling-mills");

// Barrel re-exports the named export
// src/modules/rolling-mills/services/index.ts
export { RollingMillsService } from "./rolling-mills.service";
```

Hooks always import from the barrel:
```typescript
import { RollingMillsService } from "@/modules/rolling-mills/services";
```

---

## React Query Hook Pattern

Every service method is wrapped in a custom hook in `hooks/index.ts`.

### Query Hooks (reads)
```typescript
export const useFindAllRollingMills = () =>
  useQuery({
    queryKey: ROLLING_MILLS_QUERIES.findAll,
    queryFn: () => RollingMillsService.findAll(),
  });
```

### Mutation Hooks (writes)
```typescript
export const useCreateRollingMill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRollingMillPayload) =>
      RollingMillsService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ROLLING_MILLS_QUERIES.all });
      toast.success("Laminador creado exitosamente");
    },
    onError: () => toast.error("Error al crear el laminador"),
  });
};
```

**Rules:**
- Always invalidate using `QUERIES.all` (not `findAll`) so all related queries refresh.
- Always show `toast.success` on success and `toast.error` on error.
- Use `void queryClient.invalidateQueries(...)` (not `await`) to avoid blocking.

---

## Query Keys Pattern

```typescript
export const ROLLING_MILLS_QUERIES = {
  all: ["rolling-mills"] as const,           // used for invalidation
  findAll: ["rolling-mills", "list"] as const,
  findOne: (id: string) => ["rolling-mills", "details", id] as const,
} as const;
```

**Always invalidate `QUERIES.all`** in mutations — this invalidates both `findAll` and `findOne` queries in one call.

---

## Settings Modules (Lookup Tables)

Mill Types, Profile Types, and Pass Geometry Types are reference data. Their hooks sort by `sortOrder` ascending:

```typescript
export const useFindAllMillTypes = () =>
  useQuery({
    queryKey: MILL_TYPES_QUERIES.findAll,
    queryFn: () => MillTypesService.findAll(),
    select: (data) => [...data].sort((a, b) => a.sortOrder - b.sortOrder),
  });
```

---

## Authentication Flow

1. On app load: call `GET /auth/me` to validate stored `accessToken` and hydrate user session.
2. If `GET /auth/me` returns 401: interceptor automatically attempts `POST /auth/refresh`.
3. If refresh succeeds: retry original request with new token.
4. If refresh fails: clear all tokens, redirect to `/auth/signin`.
5. Tokens stored in cookies via `CookiesService` (`accessToken` + `refreshToken`).

---

## Error Handling in Components

```typescript
// In mutations — errors are handled by the hook (toast)
const { mutate, isPending } = useCreateCalibration();
mutate(payload); // toast shown automatically on error

// For 400 field errors — map message array to form fields
onError: (error) => {
  if (error.status === 400) {
    // error.message is string | string[]
    showFieldErrors(error.message);
  }
}
```

---

## Environment Variables

```bash
VITE_BACKEND_URL=http://localhost:3000  # Backend base URL
```

Access via `@/config/envs.ts` — never use `import.meta.env` directly in components.

In development, Vite proxies `/api/*` to `VITE_BACKEND_URL`. In production, `ApiClient.baseURL` is set to `VITE_BACKEND_URL` directly.
