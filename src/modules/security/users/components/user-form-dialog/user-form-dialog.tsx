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
import { RoleSelect } from "@/modules/security/roles/components/role-select";

const USER_FORM_ID = "user-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingUser?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;

const UserFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingUser = false,
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
          <DialogTitle>{t("users:add")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={USER_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingUser}
                name="firstName"
                label={t("users:fields.firstName")}
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingUser}
                name="lastName"
                label={t("users:fields.lastName")}
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingUser}
                name="email"
                type="email"
                label={t("users:fields.email")}
                placeholder="m@example.com"
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingUser}
                name="password"
                type="password"
                label={t("users:fields.password")}
              />

              <RoleSelect
                required
                label={t("users:fields.role")}
                name="roleId"
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
            disabled={isLoadingUser}
            isLoading={isLoading}
            form={USER_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(UserFormDialog);
