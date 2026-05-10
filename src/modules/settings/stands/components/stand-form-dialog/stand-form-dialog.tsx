import { memo } from "react";
import { useTranslation } from "react-i18next";

import {
  FormContainer,
  FormInputField,
  FormSwitchField,
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
import { cn } from "@/lib/utils";
import { FormRollingMillSelectField } from "@/modules/settings/rolling-mills/components/rolling-mill-select-field";

const STAND_FORM_ID = "stand-form" as const;

type Props = {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const StandFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  open,
  title = "stands:dialog.createTitle",
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
          <FormContainer {...props} id={STAND_FORM_ID}>
            <FieldGroup>
              <FormInputField
                required
                disabled={isLoading}
                min="1"
                step="1"
                type="number"
                name="position"
                label={t("stands:fields.position")}
              />

              <FormSwitchField
                disabled={isLoading}
                name="isHorizontal"
                label={t("stands:fields.isHorizontal")}
              />

              <FormInputField
                required
                disabled={isLoading}
                min="0"
                step="0.01"
                type="number"
                name="distanceToNextStand"
                label={t("stands:fields.distanceToNextStand")}
              />

              <FormRollingMillSelectField
                required
                disabled={isLoading}
                name="rollingMillId"
              />
            </FieldGroup>
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <Button type="submit" disabled={isLoading} form={STAND_FORM_ID}>
            {t("common:accept")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(StandFormDialog);
