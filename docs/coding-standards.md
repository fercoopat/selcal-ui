# Coding Standards

## TypeScript Standards

### Interfaces
- Use `CommonFields` from `shared/interfaces/common.interface.ts` for entities:
  ```typescript
  import type { CommonFields } from "@/shared/interfaces/common.interface";
  
  export interface User extends CommonFields {
    email: string;
    name: string;
  }
  ```

- Use `type` exports in barrel files (not inline type definitions)
  ```typescript
  // interfaces/index.ts
  export type { User } from "./user.interface";
  ```

- Avoid `any` type - use `unknown` or proper types

### Imports
- Use absolute imports with `@/` alias:
  ```typescript
  import { UsersService } from "@/modules/security/users/services";
  ```
- Never use relative imports (`../`, `./`) except within the same directory

---

## React Patterns

### Component Definition
- Use functional components with hooks
- Wrap pure components with `memo`:
  ```typescript
  const MyComponent = memo(({ prop1 }: Props) => {
    return <div>{prop1}</div>;
  });
  export default MyComponent;
  ```

### Event Handlers
- Use `useCallback` for handlers passed to children:
  ```typescript
  const handleClick = useCallback(() => {
    // handler logic
  }, [dependencies]);
  ```

### Lazy Loading Pages
- Always lazy load page components:
  ```typescript
  // pages/index.ts
  import { lazy } from "react";
  
  export const UsersListPage = lazy(
    () => import("@/modules/security/users/pages/users-list-page")
  );
  ```

---

## Form Handling

### Pattern
- Use `react-hook-form` with `zodResolver`
- Dialogs use `useToggle` hook for open/close state
- Reset form on success callback

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToggle } from "@/hooks/use-toggle";

const MyFormDialog = () => {
  const { isOpen, onToggle } = useToggle();
  const { reset: resetForm, ...formProps } = useCreateForm({
    onSuccess: onToggle,
  });

  const handleToggle = useCallback(() => {
    onToggle();
    resetForm();
  }, [onToggle, resetForm]);

  return (
    <>
      <Button onClick={handleToggle}>Open</Button>
      <FormDialog {...formProps} open={isOpen} onToggle={handleToggle} />
    </>
  );
};
```

---

## Data Fetching

### React Query Pattern
- Use `@tanstack/react-query` with custom hooks
- Define query keys in `*.queries.ts` constants:
  ```typescript
  // constants/users.queries.ts
  export const USERS_QUERIES = {
    all: ["USERS"] as const,
    list: ["USERS", "list"] as const,
    detail: (id: string) => ["USERS", "detail", id] as const,
  };
  ```

- Create custom hooks for data fetching:
  ```typescript
  export const useFindAllUsers = () => {
    const { data, error, isLoading } = useQuery({
      queryFn: () => UsersService.findAll(),
      queryKey: USERS_QUERIES.findAll,
    });
    return { users: data, error, isLoading };
  };
  ```

- Invalidate queries on mutations:
  ```typescript
  const queryClient = useQueryClient();
  await queryClient.invalidateQueries({ queryKey: USERS_QUERIES.findAll });
  ```

---

## Styling

### Tailwind CSS
- Use Tailwind CSS utility classes
- Use `cn()` utility for conditional classes:
  ```typescript
  import { cn } from "@/lib/utils";
  
  <div className={cn("base-class", condition && "conditional-class")} />
  ```

### Component Patterns
- Follow existing patterns in `components/ui/`
- Use shadcn/ui components when available

---

## API Service Pattern

### Service Definition
- Extend `ApiService` from `shared/services/api.service`
- Use `ApiClient` for HTTP requests

```typescript
// services/users.service.ts
import { ApiClient } from "@/lib/api-client";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { ApiService } from "@/shared/services/api.service";

const USERS_SERVICE_BASE_PATH = "/users" as const;

class UsersService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<User[]>(this.getPath());
    return data;
  }

  async create(payload: CreateUserPayload) {
    const { data } = await ApiClient.post<User>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<User>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async delete(id: string | undefined) {
    // ...
  }
}

export default new UsersService(USERS_SERVICE_BASE_PATH);
```

### Standard Methods
- `findAll()` - GET collection
- `findOne(id)` - GET single item
- `create(payload)` - POST new item
- `update(id, payload)` - PATCH existing item
- `delete(id)` - DELETE item

---

## Translation Management

### Adding Translations
- Add keys to both `i18n/en/` and `i18n/es/` directories
- Export in `i18n/{lang}/index.ts`
- Use `useTranslation()` hook with namespace:

```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();
  return <span>{t("moduleName:fields.fieldName")}</span>;
};
```

### Menu Translations
- Update `hooks/use-menu.ts` for sidebar items
- Add entries to `i18n/{en,es}/menu.json`
- Add permissions check in `subItems`

---

## References

- For module structure standards: [module-architecture.md](module-architecture.md)
- For module creation guide: [module-creation-guide.md](module-creation-guide.md)
