import { memo } from "react";
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
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calibration Wizard</h1>
        <p className="text-muted-foreground">
          Design steel rolling calibrations for simple profiles
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FormContainer {...props}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Billet Data</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.height"
                    type="number"
                    step="0.1"
                    label="Initial Height (mm)"
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.width"
                    type="number"
                    step="0.1"
                    label="Initial Width (mm)"
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.temperature"
                    type="number"
                    label="Initial Temperature (°C)"
                  />

                  <FormSelectField
                    required
                    disabled={isCalculating}
                    name="billet.material"
                    label="Steel Grade"
                    options={STEEL_GRADE_OPTIONS}
                    placeholder="Select a steel grade"
                    getOptionValue={(option) => option?.value ?? ""}
                    renderOption={(option) => option?.label}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="billet.area"
                    type="number"
                    step="0.1"
                    label="Initial Area (mm²)"
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="maxElongation"
                    type="number"
                    step="0.1"
                    min="1"
                    max="2"
                    label="Max Elongation per Pass"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Target Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelectField
                    required
                    disabled={isCalculating}
                    name="target.type"
                    label="Profile Type"
                    options={PROFILE_TYPES}
                    placeholder="Select profile type"
                    getOptionValue={(option) => option?.value ?? ""}
                    renderOption={(option) => option?.label}
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="target.dimensions.diameter"
                    type="number"
                    step="0.1"
                    label="Target Diameter (mm)"
                  />

                  <FormInputField
                    disabled={isCalculating}
                    name="target.dimensions.side"
                    type="number"
                    step="0.1"
                    label="Target Side (mm)"
                  />

                  <FormInputField
                    disabled={isCalculating}
                    name="target.dimensions.flatDistance"
                    type="number"
                    step="0.1"
                    label="Target Flat Distance (mm)"
                  />

                  <FormInputField
                    required
                    disabled={isCalculating}
                    name="target.temperature"
                    type="number"
                    label="Final Temperature (°C)"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <LoadingButton type="submit" isLoading={isCalculating}>
                  Calculate Calibration
                </LoadingButton>
              </div>
            </div>
          </FormContainer>
        </CardContent>
      </Card>

      {calculationResult && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Calculation Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalPasses}</div>
                <p className="text-sm text-muted-foreground">Total Passes</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalPower.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Total Power (kW)</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.finalArea.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Final Area (mm²)</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-2xl font-bold">{calculationResult.totalElongation.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total Elongation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(CalibrationWizard);
