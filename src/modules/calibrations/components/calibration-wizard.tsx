import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField, FormSelectField } from "@/components/forms";
import type { FormContextProps } from "@/components/forms/form-container";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CalibrationResult } from "@/modules/calibrations/interfaces";
import { STEEL_GRADE_OPTIONS, PROFILE_TYPES } from "@/modules/materials/constants";

type Props = {
  className?: string;
  error: unknown;
  isCalculating: boolean;
  calculationResult: CalibrationResult | undefined;
} & FormContextProps;

const CalibrationWizard = ({ className, isCalculating, calculationResult, ...props }: Props) => {
  const { t } = useTranslation("calibrations");

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("wizard.title")}</h1>
        <p className="text-muted-foreground">{t("wizard.description")}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FormContainer {...props}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t("wizard.billetData")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.height"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.initialHeight")}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.width"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.initialWidth")}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.temperature"
                    type="number"
                    label={t("wizard.fields.initialTemperature")}
                  />

                  <FormSelectField
                    required
                    disabled={isCalculating}
                    name="billet.material"
                    label={t("wizard.fields.steelGrade")}
                    options={STEEL_GRADE_OPTIONS}
                    placeholder={t("wizard.fields.steelGradePlaceholder")}
                    getOptionValue={(option) => option?.value ?? ""}
                    renderOption={(option) => option?.label}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.area"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.initialArea")}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="maxElongation"
                    type="number"
                    step="0.1"
                    min="1"
                    max="2"
                    label={t("wizard.fields.maxElongation")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t("wizard.targetProfile")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelectField
                    required
                    disabled={isCalculating}
                    name="target.type"
                    label={t("wizard.fields.profileType")}
                    options={PROFILE_TYPES}
                    placeholder={t("wizard.fields.profileTypePlaceholder")}
                    getOptionValue={(option) => option?.value ?? ""}
                    renderOption={(option) => option?.label}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="target.dimensions.diameter"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.targetDiameter")}
                  />

                  <FormInputField
                    disabled={isCalculating}
                    name="target.dimensions.side"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.targetSide")}
                  />

                  <FormInputField
                    disabled={isCalculating}
                    name="target.dimensions.flatDistance"
                    type="number"
                    step="0.1"
                    label={t("wizard.fields.targetFlatDistance")}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="target.temperature"
                    type="number"
                    label={t("wizard.fields.finalTemperature")}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <LoadingButton type="submit" isLoading={isCalculating}>
                  {t("wizard.calculate")}
                </LoadingButton>
              </div>
            </div>
          </FormContainer>
        </CardContent>
      </Card>

      {calculationResult && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">{t("wizard.results.title")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalPasses}</div>
                <p className="text-sm text-muted-foreground">{t("wizard.results.totalPasses")}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalPower.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">{t("wizard.results.totalPower")}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.finalArea.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">{t("wizard.results.finalArea")}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalElongation.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">{t("wizard.results.totalElongation")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(CalibrationWizard);
