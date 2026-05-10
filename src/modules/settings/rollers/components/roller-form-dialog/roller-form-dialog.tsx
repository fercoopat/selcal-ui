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
import { FormBearingSelectField } from "@/modules/settings/rollers/components/bearing-select-field";
import { FormMaterialSelectField } from "@/modules/settings/rollers/components/material-select-field";
import { FormStandSelectField } from "@/modules/settings/stands/components/stand-select-field";

const ROLLER_FORM_ID = "roller-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingRoller?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const RollerFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingRoller = false,
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
          <DialogTitle>{title ? t(title) : t("rollers:add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="py-4">
          <FormContainer {...props} id={ROLLER_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingRoller}
                name="name"
                label={t("rollers:fields.name")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingRoller}
                min="0"
                step="0.01"
                type="number"
                name="diameter"
                label={t("rollers:fields.diameter")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingRoller}
                min="0"
                step="0.01"
                type="number"
                name="diameterNeck"
                label={t("rollers:fields.diameterNeck")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingRoller}
                min="0"
                step="0.01"
                type="number"
                name="length"
                label={t("rollers:fields.length")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingRoller}
                min="0"
                step="0.01"
                type="number"
                name="lengthNeck"
                label={t("rollers:fields.lengthNeck")}
              />
              <FormStandSelectField
                required
                disabled={isLoading || isLoadingRoller}
                name="standId"
              />
              <FormMaterialSelectField
                disabled={isLoading || isLoadingRoller}
                name="materialId"
              />
              <FormBearingSelectField
                disabled={isLoading || isLoadingRoller}
                name="bearingId"
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
            disabled={isLoadingRoller}
            isLoading={isLoading}
            form={ROLLER_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(RollerFormDialog);
