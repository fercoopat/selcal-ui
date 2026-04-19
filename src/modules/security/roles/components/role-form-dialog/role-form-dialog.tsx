import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import {
  FormContainer,
  FormInputField,
  FormMultiselectField,
  FormTextareaField,
} from "@/components/forms";
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
import {
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { PERMISSIONS_MAP } from "@/modules/security/shared/constants/security.permissions";

const ROLE_FORM_ID = "role-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;
const RoleFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
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
          <DialogTitle>{t("roles:newRole.title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={ROLE_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading}
                name="name"
                label={t("roles:fields.name")}
              />

              <FormTextareaField
                disabled={isLoading}
                name="description"
                label={t("roles:fields.description")}
                rows={5}
              />

              <FormMultiselectField
                required
                disabled={isLoading}
                name="permissions"
                label={t("roles:fields.permissions")}
              >
                <MultiSelectContent>
                  {Object.entries(PERMISSIONS_MAP).map(([label, group]) => (
                    <MultiSelectGroup key={label}>
                      {group.map((permission, index) => (
                        <MultiSelectItem key={index} value={permission}>
                          {t(`permissions:${permission}`)}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  ))}
                </MultiSelectContent>
              </FormMultiselectField>
            </FieldGroup>
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            form={ROLE_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(RoleFormDialog);
