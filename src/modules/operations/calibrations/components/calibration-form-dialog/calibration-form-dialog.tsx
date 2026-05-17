import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import {
  FormContainer,
  FormInputField,
  FormSelectField,
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
import { PROFILE_TYPE } from "@/modules/operations/calibrations/constants/profile-type.enum";
import { FormRollingMillSelectField } from "@/modules/settings/rolling-mills/components/rolling-mill-select-field";
import { Stepper, type Step } from "@/components/ui/stepper";

const CALIBRATION_FORM_ID = "calibration-form" as const;

const PROFILE_TYPE_OPTIONS = Object.values(PROFILE_TYPE);

const STEPS: Step[] = [
  { label: "calibrations:steps.general" },
  { label: "calibrations:steps.process" },
  { label: "calibrations:steps.steel" },
];

const STEP_FIELDS = [
  ["description", "rollingMillId", "profileType"],
  [
    "initialTemp",
    "initialHeight",
    "initialWidth",
    "totalPasses",
    "finishingPasses",
    "finalDimension",
  ],
  ["steelCarbon", "steelManganese", "steelChromium"],
];

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
  const [currentStep, setCurrentStep] = useState(0);
  const disabled = isLoading || isLoadingCalibration;
  const isLastStep = currentStep === STEPS.length - 1;
  const { trigger } = props;

  const handleNext = useCallback(async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, trigger]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const handleClose = useCallback(() => {
    setCurrentStep(0);
    onToggle?.();
  }, [onToggle]);

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-2xl", className)}>
        <DialogHeader>
          <DialogTitle>{title ? t(title) : t("calibrations:add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Stepper steps={STEPS} currentStep={currentStep} className="px-4" />

        <div className="py-4">
          <FormContainer {...props} id={CALIBRATION_FORM_ID}>
            <FieldGroup>
              {currentStep === 0 && (
                <>
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
                    renderOption={(o) =>
                      o ? t(`calibrations:profileTypes.${o}`) : ""
                    }
                    placeholder={t(
                      "calibrations:fields.profileTypePlaceholder",
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
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
                </>
              )}

              {currentStep === 2 && (
                <>
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
                </>
              )}
            </FieldGroup>
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          {currentStep > 0 && (
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={isLoadingCalibration}
            >
              {t("calibrations:previous")}
            </Button>
          )}

          {!isLastStep && (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isLoadingCalibration}
            >
              {t("calibrations:next")}
            </Button>
          )}

          {isLastStep && (
            <LoadingButton
              type="submit"
              disabled={isLoadingCalibration}
              isLoading={isLoading}
              form={CALIBRATION_FORM_ID}
            >
              {t("common:accept")}
            </LoadingButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CalibrationFormDialog);
