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
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  description: z.string({ error: "invalidValue" }).optional(),
});

export type CreateReportPayload = z.infer<typeof createReportSchema>;
```

Create `src/modules/reports/schemas/reports-update.schema.ts`:

```typescript
import { createReportSchema } from "./reports-create.schema";

export const updateReportSchema = createReportSchema.partial();

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

export const REPORTS_BASE_PATH = BASE_PATH;

export const REPORTS_PATHS = {
  LIST: REPORTS_BASE_PATH,
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
export {
  REPORTS_PERMISSIONS,
  REPORTS_PERMISSIONS_VALUES,
} from "./reports.permissions";
export type { ReportsPermission } from "./reports.permissions";
export { reportsListColumns } from "./reports-list.columns";
```

### Step 6: Create Hooks

Create `src/modules/reports/hooks/use-find-all-reports.ts`:

````typescript
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

Create `src/modules/reports/hooks/use-find-one-report.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";

import { REPORTS_QUERIES } from "@/modules/reports/constants/reports.queries";
import { ReportsService } from "@/modules/reports/services";

export const useFindOneReport = (reportId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => ReportsService.findOne(reportId),
    queryKey: REPORTS_QUERIES.findOne(reportId),
    enabled: !!reportId,
  });

  return {
    report: data,
    error,
    isLoading,
  };
};
````

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
      await queryClient.invalidateQueries({
        queryKey: REPORTS_QUERIES.findAll,
      });
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
      await queryClient.invalidateQueries({
        queryKey: REPORTS_QUERIES.findAll,
      });
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
export { useFindOneReport } from "./use-find-one-report";
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
    path: REPORTS_PATHS.LIST,
    children: [
      {
        path: REPORTS_PATHS.LIST,
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
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const ReportFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingReport = false,
  open,
  title,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{title ? t(title) : t("reports:add")}</DialogTitle>
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
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { ReportFormDialog } from "@/modules/reports/components/report-form-dialog";
import { useCreateReportForm } from "@/modules/reports/hooks/use-create-report-form";
import { useFindOneReport } from "@/modules/reports/hooks/use-find-one-report";

const ReportsListToolbar = () => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();
  const editValue = searchParams.get("edit");

  const isFormModalOpen = !!editValue || isOpen;

  const { isLoading: isLoadingReportToEdit, report: reportToEdit } =
    useFindOneReport(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateReportForm({
    report: reportToEdit,
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
        open={isFormModalOpen}
        title={editValue ? "reports:edit" : undefined}
        isLoadingReport={isLoadingReportToEdit}
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
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useSearchParams } from "react-router";

import { IconButton, LoadingButton } from "@/components/buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { useDeactivateReport } from "@/modules/reports/hooks/use-deactivate-report";
import type { Report } from "@/modules/reports/interfaces/report.interface";

type Props = {
  report: Report | undefined;
};

const ReportsListRowActions = ({ report }: Props) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();
  const { deleteReport, isLoading } = useDeactivateReport({ onSuccess: () => {} });

  const handleEdit = useCallback(() => {
    searchParams.set("edit", report?.id ?? "");
    setSearchParams(searchParams);
  }, [report?.id, searchParams, setSearchParams]);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <IconButton tooltip="common:edit" onClick={handleEdit}>
          <PencilIcon />
        </IconButton>
        <IconButton
          tooltip="common:delete"
          variant="destructive"
          onClick={onToggleDelete}
        >
          <TrashIcon />
        </IconButton>
      </div>
      <Dialog open={isOpenDelete} onOpenChange={onToggleDelete}>
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
    </>
  );
};

export default ReportsListRowActions;
```

Create `src/modules/reports/components/reports-list-row-actions/index.ts`:

```typescript
export { default as ReportsListRowActions } from "./reports-list-row-actions";
```

### Step 10: Final Integration Steps

1. **Add to main routes**: Update `src/components/router/main-routes.tsx` (for flat modules) or parent module routes (for submodules)
2. **Add translations**: Create `src/i18n/en/reports.json` and `src/i18n/es/reports.json`
3. **Update i18n index**: Add exports in `src/i18n/en/index.ts` and `src/i18n/es/index.ts`
4. **Update menu**: Add menu item in `src/hooks/use-menu.ts` (if applicable)
5. **Add menu translations**: Update `src/i18n/en/menu.json` and `src/i18n/es/menu.json`
6. **Build and verify**: Run `npm run build` and `npm run lint`

---

## Creating a Submodule

Example: Adding `materials` submodule to `settings` module (follow the existing `src/modules/settings/materials/` as reference).

### Follow Steps 1-10 Above, Plus:

### Extra Step A: Update Parent Module Routes

Update `src/modules/settings/shared/routes/index.tsx`:

```typescript
import { type RouteObject } from "react-router";
import { ModuleLayout } from "@/components/layouts";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";
import { MATERIALS_ROUTES } from "@/modules/settings/materials/routes";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: SETTINGS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.BASE}
        notFoundRedirectTo={SETTINGS_PATHS.MATERIALS}
      />
    ),
    children: [
      ...MATERIALS_ROUTES,
      // ...other submodule routes
    ],
  },
];
```

### Extra Step B: Update Parent Module Paths

Update `src/modules/settings/shared/constants/settings.paths.ts`:

```typescript
import { MATERIALS_PATHS } from "@/modules/settings/materials/constants";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  MATERIALS: MATERIALS_PATHS.LIST,
} as const;
```

### Extra Step C: Update Menu Configuration

Update `src/hooks/use-menu.ts`:

```typescript
import { AnvilIcon } from "lucide-react";
// ... other imports
import { MATERIALS_PERMISSIONS } from "@/modules/settings/materials/constants/materials.permissions";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";

// In SIDEBAR_ITEMS_MAP:
settings: {
  id: "settings",
  icon: SettingsIcon,
  label: "menu:settings.title",
  hasSubItems: true,
  subItems: {
    materials: {
      id: "settings-materials",
      icon: AnvilIcon,
      label: "menu:settings.materials",
      route: SETTINGS_PATHS.MATERIALS,
      permissions: [MATERIALS_PERMISSIONS.READ],
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
- [ ] Zod schemas use `z.string({ error: "invalidValue" })` pattern
- [ ] Update schema uses `createSchema.partial()` pattern
- [ ] Paths use `LIST` property (not `listPath` function)
- [ ] Routes use `{{MODULE}}_PATHS` constants
- [ ] Hooks use `{{MODULE}}_QUERIES` for React Query keys
- [ ] `use-find-one-{{module}}` hook created for edit mode
- [ ] Components use `IconButton` for row actions (not DropdownMenu)
- [ ] Toolbar uses URL search params (`?edit=id`) for edit mode
- [ ] Form dialog supports `title` prop for add/edit modes
- [ ] Translations added to `src/i18n/en/` and `src/i18n/es/`
- [ ] Translations exported in `src/i18n/{lang}/index.ts`
- [ ] Menu updated in `src/hooks/use-menu.ts` (if applicable)
- [ ] Menu translations added to `src/i18n/{en,es}/menu.json`
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`

---

## References

- For architecture standards: [module-architecture.md](module-architecture.md)
- For coding conventions: [coding-standards.md](coding-standards.md)
