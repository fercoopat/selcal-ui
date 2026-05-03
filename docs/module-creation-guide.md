# Module Creation Guide

## Overview

This guide provides step-by-step instructions to create new modules and submodules following the selcal-ui architecture standards.

**Prerequisites**: Read [module-architecture.md](module-architecture.md) to understand the structure.

---

## Creating a Flat Module

Example: Creating a `reports` module.

### Step 1: Create Directory Structure

```bash
mkdir -p src/modules/reports/{components,constants,hooks,interfaces,pages,routes,schemas,services}
```

### Step 2: Create Interface

Create `src/modules/reports/interfaces/reports.interface.ts`:

```typescript
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Report extends CommonFields {
  name: string;
  description?: string;
  // Add more fields as needed
}
```

Create `src/modules/reports/interfaces/index.ts`:

```typescript
export type { Report } from "./reports.interface";
```

### Step 3: Create Service

Create `src/modules/reports/services/reports.service.ts`:

```typescript
import { ApiClient } from "@/lib/api-client";
import type { Report } from "@/modules/reports/interfaces/reports.interface";
import type { CreateReportPayload } from "@/modules/reports/schemas/reports-create.schema";
import type { UpdateReportPayload } from "@/modules/reports/schemas/reports-update.schema";
import { ApiService } from "@/shared/services/api.service";

const REPORTS_SERVICE_BASE_PATH = "/reports" as const;

class ReportsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Report[]>(this.getPath());
    return data;
  }

  async create(payload: CreateReportPayload) {
    const { data } = await ApiClient.post<Report>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<Report>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async findOne(id: string | undefined) {
    if (!id) throw new Error("ID is required to find one");
    const { data } = await ApiClient.get<Report>(this.getPath(`/${id}`));
    return data;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("ID is required to delete");
    const { data } = await ApiClient.delete<Report>(this.getPath(`/${id}`));
    return data;
  }
}

export default new ReportsService(REPORTS_SERVICE_BASE_PATH);
```

Create `src/modules/reports/services/index.ts`:

```typescript
export { default as ReportsService } from "./reports.service";
```

### Step 4: Create Schemas

Create `src/modules/reports/schemas/reports-create.schema.ts`:

```typescript
import z from "zod";

export const createReportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type CreateReportPayload = z.infer<typeof createReportSchema>;
```

Create `src/modules/reports/schemas/reports-update.schema.ts`:

```typescript
import z from "zod";

export const updateReportSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
});

export type UpdateReportPayload = z.infer<typeof updateReportSchema>;
```

Create `src/modules/reports/schemas/index.ts`:

```typescript
export { createReportSchema } from "./reports-create.schema";
export type { CreateReportPayload } from "./reports-create.schema";
export { updateReportSchema } from "./reports-update.schema";
export type { UpdateReportPayload } from "./reports-update.schema";
```

### Step 5: Create Constants

Create `src/modules/reports/constants/reports.paths.ts`:

```typescript
const BASE_PATH = "/reports";

export const REPORTS_BASE_PATH = `/reports${BASE_PATH}`;

export const REPORTS_PATHS = {
  BASE_PATH: REPORTS_BASE_PATH,
  listPath: () => REPORTS_BASE_PATH,
} as const;
```

Create `src/modules/reports/constants/reports.queries.ts`:

```typescript
export const REPORTS_QUERIES = {
  all: ["REPORTS"] as const,
  list: ["REPORTS", "list"] as const,
  detail: (id: string) => ["REPORTS", "detail", id] as const,
  findAll: ["REPORTS", "list"] as const,
  findOne: (id: string) => ["REPORTS", "detail", id] as const,
} as const;
```

Create `src/modules/reports/constants/reports.permissions.ts`:

```typescript
export const REPORTS_PERMISSIONS = {
  READ: "reports.read",
  CREATE: "reports.create",
  UPDATE: "reports.update",
  DELETE: "reports.delete",
} as const;

export type ReportsPermission =
  (typeof REPORTS_PERMISSIONS)[keyof typeof REPORTS_PERMISSIONS];

export const REPORTS_PERMISSIONS_VALUES = Object.values(REPORTS_PERMISSIONS);
```

Create `src/modules/reports/constants/reports-list.columns.tsx`:

```typescript
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

import { PermissionsCheck } from "@/components/security";
import { ReportsListRowActions } from "@/modules/reports/components/reports-list-row-actions";
import { REPORTS_PERMISSIONS } from "@/modules/reports/constants/reports.permissions";
import type { Report } from "@/modules/reports/interfaces/report.interface";

export const reportsListColumns: ColumnDef<Report | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: t("reports:fields.name"),
  },
  {
    id: "description",
    accessorKey: "description",
    header: t("reports:fields.description"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original;
      return (
        <PermissionsCheck
          permissions={[REPORTS_PERMISSIONS.UPDATE, REPORTS_PERMISSIONS.DELETE]}
        >
          <ReportsListRowActions report={report} />
        </PermissionsCheck>
      );
    },
  },
];
```

Create `src/modules/reports/constants/index.ts`:

```typescript
export { REPORTS_BASE_PATH, REPORTS_PATHS } from "./reports.paths";
export { REPORTS_QUERIES } from "./reports.queries";
export { REPORTS_PERMISSIONS, REPORTS_PERMISSIONS_VALUES } from "./reports.permissions";
export type { ReportsPermission } from "./reports.permissions";
export { reportsListColumns } from "./reports-list.columns";
```

### Step 6: Create Hooks

Create `src/modules/reports/hooks/use-find-all-reports.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";

import { REPORTS_QUERIES } from "@/modules/reports/constants/reports.queries";
import { ReportsService } from "@/modules/reports/services";

export const useFindAllReports = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => ReportsService.findAll(),
    queryKey: REPORTS_QUERIES.findAll,
  });

  return {
    reports: data,
    error,
    isLoading,
  };
};
```

Create `src/modules/reports/hooks/use-create-report-form.ts`:

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { REPORTS_QUERIES } from "@/modules/reports/constants/reports.queries";
import {
  createReportSchema,
  type CreateReportPayload,
} from "@/modules/reports/schemas/reports-create.schema";
import { ReportsService } from "@/modules/reports/services";

const defaultValues: CreateReportPayload = {
  name: "",
  description: "",
};

type Params = {
  onSuccess?: () => void;
};

export const useCreateReportForm = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(createReportSchema),
    defaultValues,
    values: defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: CreateReportPayload) => {
      return ReportsService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REPORTS_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("reports:successCreate"));
      form.reset();
    },
  });

  const onSubmit = useCallback(
    (payload: CreateReportPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
```

Create `src/modules/reports/hooks/use-update-report-form.ts`:

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { REPORTS_QUERIES } from "@/modules/reports/constants/reports.queries";
import {
  updateReportSchema,
  type UpdateReportPayload,
} from "@/modules/reports/schemas/reports-update.schema";
import { ReportsService } from "@/modules/reports/services";

const defaultValues: UpdateReportPayload = {
  name: "",
  description: "",
};

type Params = {
  reportId?: string;
  onSuccess?: () => void;
};

export const useUpdateReportForm = ({ reportId, onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateReportSchema),
    defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: UpdateReportPayload) => {
      return ReportsService.update(reportId, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REPORTS_QUERIES.findAll });
      await queryClient.invalidateQueries({
        queryKey: REPORTS_QUERIES.findOne(reportId ?? ""),
      });
      onSuccess?.();
      toast.success(t("reports:successUpdate"));
    },
  });

  const onSubmit = useCallback(
    (payload: UpdateReportPayload) => mutate(payload),
    [mutate],
  );

  return { ...form, error, isLoading: isPending, onSubmit };
};
```

Create `src/modules/reports/hooks/use-deactivate-report.ts`:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { REPORTS_QUERIES } from "@/modules/reports/constants/reports.queries";
import { ReportsService } from "@/modules/reports/services";

type Params = {
  onSuccess?: () => void;
};

export const useDeactivateReport = ({ onSuccess }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (reportId: string | undefined) => {
      return ReportsService.delete(reportId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REPORTS_QUERIES.findAll });
      onSuccess?.();
      toast.success(t("reports:successDelete"));
    },
  });

  return { error, isLoading: isPending, deleteReport: mutate };
};
```

Create `src/modules/reports/hooks/index.ts`:

```typescript
export { useCreateReportForm } from "./use-create-report-form";
export { useFindAllReports } from "./use-find-all-reports";
export { useUpdateReportForm } from "./use-update-report-form";
export { useDeactivateReport } from "./use-deactivate-report";
```

### Step 7: Create Pages

Create `src/modules/reports/pages/reports-list-page.tsx`:

```typescript
import { DataTable } from "@/components/data-table";
import { ReportsListToolbar } from "@/modules/reports/components/reports-list-toolbar";
import { reportsListColumns } from "@/modules/reports/constants/reports-list.columns";
import { useFindAllReports } from "@/modules/reports/hooks/use-find-all-reports";

const ReportsListPage = () => {
  const { error, isLoading, reports } = useFindAllReports();

  return (
    <>
      <ReportsListToolbar />
      <DataTable
        columns={reportsListColumns}
        data={reports}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default ReportsListPage;
```

Create `src/modules/reports/pages/index.ts`:

```typescript
import { lazy } from "react";

export const ReportsListPage = lazy(
  () => import("@/modules/reports/pages/reports-list-page"),
);
```

### Step 8: Create Routes

Create `src/modules/reports/routes/index.tsx`:

```typescript
import type { RouteObject } from "react-router";

import { REPORTS_PATHS } from "@/modules/reports/constants/reports.paths";
import { ReportsListPage } from "@/modules/reports/pages";

export const REPORTS_ROUTES: RouteObject[] = [
  {
    path: REPORTS_PATHS.BASE_PATH,
    children: [
      {
        path: REPORTS_PATHS.BASE_PATH,
        Component: ReportsListPage,
      },
    ],
  },
];
```

### Step 9: Create Components

Create `src/modules/reports/components/report-form-dialog/report-form-dialog.tsx`:

```typescript
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField } from "@/components/forms";
import type { FormContextProps } from "@/components/forms/form-container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const REPORT_FORM_ID = "report-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingReport?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;

const ReportFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingReport = false,
  open,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{t("reports:add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="py-4">
          <FormContainer {...props} id={REPORT_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingReport}
                name="name"
                label={t("reports:fields.name")}
              />
              <FormInputField
                disabled={isLoading || isLoadingReport}
                name="description"
                label={t("reports:fields.description")}
              />
            </FieldGroup>
          </FormContainer>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>
          <LoadingButton
            type="submit"
            disabled={isLoadingReport}
            isLoading={isLoading}
            form={REPORT_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ReportFormDialog);
```

Create `src/modules/reports/components/report-form-dialog/index.ts`:

```typescript
export { default as ReportFormDialog } from "./report-form-dialog";
```

Create `src/modules/reports/components/reports-list-toolbar/reports-list-toolbar.tsx`:

```typescript
import { PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { ReportFormDialog } from "@/modules/reports/components/report-form-dialog";
import { useCreateReportForm } from "@/modules/reports/hooks/use-create-report-form";

const ReportsListToolbar = () => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useToggle();
  const { reset: resetForm, ...formProps } = useCreateReportForm({
    onSuccess: onToggle,
  });

  const handleToggle = useCallback(() => {
    onToggle();
    resetForm();
  }, [onToggle, resetForm]);

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />
          <span>{t("reports:add")}</span>
        </Button>
      </DataTableToolbar>
      <ReportFormDialog
        {...formProps}
        reset={resetForm}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};

export default ReportsListToolbar;
```

Create `src/modules/reports/components/reports-list-toolbar/index.ts`:

```typescript
export { default as ReportsListToolbar } from "./reports-list-toolbar";
```

Create `src/modules/reports/components/reports-list-row-actions/reports-list-row-actions.tsx`:

```typescript
import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";

import { LoadingButton } from "@/components/buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeactivateReport } from "@/modules/reports/hooks/use-deactivate-report";
import type { Report } from "@/modules/reports/interfaces/report.interface";

type Props = {
  report: Report | undefined;
};

const ReportsListRowActions = ({ report }: Props) => {
  const { t } = useTranslation();
  const { deleteReport, isLoading } = useDeactivateReport({ onSuccess: () => {} });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t("common:openMenu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {}}>
            {t("common:edit")}
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>{t("common:delete")}</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("reports:deleteTitle")}</DialogTitle>
          <DialogDescription>
            {t("reports:deleteDescription", { name: report?.name })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">{t("common:cancel")}</Button>
          <LoadingButton
            variant="destructive"
            isLoading={isLoading}
            onClick={() => deleteReport(report?.id)}
          >
            {t("common:delete")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsListRowActions;
```

Create `src/modules/reports/components/reports-list-row-actions/index.ts`:

```typescript
export { default as ReportsListRowActions } from "./reports-list-row-actions";
```

### Step 10: Final Integration Steps

1. **Add to main routes**: Update `src/components/router/main-routes.tsx`
2. **Add translations**: Create `i18n/en/reports.json` and `i18n/es/reports.json`
3. **Update i18n index**: Add exports in `i18n/en/index.ts` and `i18n/es/index.ts`
4. **Update menu**: Add menu item in `src/hooks/use-menu.ts`
5. **Add menu translations**: Update `i18n/en/menu.json` and `i18n/es/menu.json`
6. **Build and verify**: Run `npm run build`

---

## Creating a Submodule

Example: Adding `grades` submodule to `settings` module.

### Follow Steps 1-10 Above, Plus:

### Extra Step A: Update Parent Module Routes

Update `src/modules/settings/shared/routes/index.tsx`:

```typescript
import { type RouteObject } from "react-router";
import { ModuleLayout } from "@/components/layouts";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";
import { GRADES_ROUTES } from "@/modules/settings/grades/routes";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: SETTINGS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.BASE}
        notFoundRedirectTo={SETTINGS_PATHS.GRADES}
      />
    ),
    children: [
      ...GRADES_ROUTES,
      // ...other submodule routes
    ],
  },
];
```

### Extra Step B: Update Parent Module Paths

Update `src/modules/settings/shared/constants/settings.paths.ts`:

```typescript
const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  GRADES: `${BASE_PATH}/grades`,
  MATERIALS: `${BASE_PATH}/materials`,
} as const;
```

### Extra Step C: Update Menu Configuration

Update `src/hooks/use-menu.ts`:

```typescript
import { AnvilIcon } from "lucide-react";
// ... other imports
import { GRADES_PERMISSIONS } from "@/modules/settings/grades/constants/grades.permissions";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";

// In SIDEBAR_ITEMS_MAP:
settings: {
  id: "settings",
  icon: SettingsIcon,
  label: "menu:settings.title",
  hasSubItems: true,
  subItems: {
    grades: {
      id: "settings-grades",
      icon: AnvilIcon,
      label: "menu:settings.grades",
      route: SETTINGS_PATHS.GRADES,
      permissions: [GRADES_PERMISSIONS.READ],
    },
    // ...other submodules
  },
},
```

---

## Checklist for New Module/Submodule

- [ ] All directories created with `index.ts` barrel exports
- [ ] Interface extends `CommonFields` from `shared/interfaces/common.interface.ts`
- [ ] Service extends `ApiService` from `shared/services/api.service`
- [ ] Routes use `{{MODULE}}_PATHS` constants
- [ ] Hooks use `{{MODULE}}_QUERIES` for React Query keys
- [ ] Translations added to `i18n/en/` and `i18n/es/`
- [ ] Translations exported in `i18n/{lang}/index.ts`
- [ ] Menu updated in `src/hooks/use-menu.ts` (if applicable)
- [ ] Menu translations added to `i18n/{en,es}/menu.json`
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`

---

## References

- For architecture standards: [module-architecture.md](module-architecture.md)
- For coding conventions: [coding-standards.md](coding-standards.md)
