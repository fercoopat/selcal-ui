import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField, FormSelectField } from "@/components/forms";
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
import { PROFILE_TYPE } from "@/modules/operations/calibrations/constants/profile-type.enum";
import { FormRollingMillSelectField } from "@/modules/settings/rolling-mills/components/rolling-mill-select-field";

const CALIBRATION_FORM_ID = "calibration-form" as const;

const PROFILE_TYPE_OPTIONS = Object.values(PROFILE_TYPE);

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingCalibration?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const CalibrationFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingCalibration = false,
  open,
  title,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const disabled = isLoading || isLoadingCalibration;

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-2xl", className)}>
        <DialogHeader>
          <DialogTitle>
            {title ? t(title) : t("calibrations:add")}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="py-4">
          <FormContainer {...props} id={CALIBRATION_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={disabled}
                name="description"
                label={t("calibrations:fields.description")}
              />
              <FormRollingMillSelectField
                required
                disabled={disabled}
                name="rollingMillId"
              />
              <FormSelectField
                required
                disabled={disabled}
                name="profileType"
                label={t("calibrations:fields.profileType")}
                options={PROFILE_TYPE_OPTIONS}
                getOptionValue={(o) => o ?? ""}
                renderOption={(o) => o ?? ""}
                placeholder={t("calibrations:fields.profileTypePlaceholder")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.01"
                name="initialTemp"
                label={t("calibrations:fields.initialTemp")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.01"
                name="initialHeight"
                label={t("calibrations:fields.initialHeight")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.01"
                name="initialWidth"
                label={t("calibrations:fields.initialWidth")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="1"
                name="totalPasses"
                label={t("calibrations:fields.totalPasses")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="1"
                name="finishingPasses"
                label={t("calibrations:fields.finishingPasses")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.01"
                name="finalDimension"
                label={t("calibrations:fields.finalDimension")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.0001"
                name="steelCarbon"
                label={t("calibrations:fields.steelCarbon")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.0001"
                name="steelManganese"
                label={t("calibrations:fields.steelManganese")}
              />
              <FormInputField
                required
                disabled={disabled}
                type="number"
                step="0.0001"
                name="steelChromium"
                label={t("calibrations:fields.steelChromium")}
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
            disabled={isLoadingCalibration}
            isLoading={isLoading}
            form={CALIBRATION_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CalibrationFormDialog);
