import { memo } from "react";
import { useTranslation } from "react-i18next";

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
import { FormMillTypeSelectField } from "@/modules/settings/mill-types/components";

const ROLLING_MILL_FORM_ID = "rolling-mill-form" as const;

type Props = {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const RollingMillFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  open,
  title = "rollingMills:dialog.createTitle",
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{t(title)}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={ROLLING_MILL_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading}
                name="name"
                label={t("rollingMills:fields.name")}
              />

              <FormInputField
                required
                disabled={isLoading}
                min="0"
                step="0.01"
                type="number"
                name="distOvenStand"
                label={t("rollingMills:fields.distOvenStand")}
              />

              <FormMillTypeSelectField
                required
                disabled={isLoading}
                name="millTypeId"
              />
            </FieldGroup>
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            form={ROLLING_MILL_FORM_ID}
          >
            {t("common:accept")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(RollingMillFormDialog);
