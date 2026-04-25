import type { FormContextProps } from "@/components/forms/form-container";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import {
  FormContainer,
  FormInputField,
  FormSectionSeparator,
} from "@/components/forms";
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
import MaterialGradeChemicalCompositionField from "@/modules/settings/material-grades/components/material-grade-form-dialog/material-grade-chemical-composition-field";
import MaterialGradeThermalPropertiesField from "@/modules/settings/material-grades/components/material-grade-form-dialog/material-grade-thermal-properties-field";

const MATERIAL_GRADE_FORM_ID = "material-grade-form" as const;

type Props = {
  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  error: unknown;
  isLoading: boolean;
  isLoadingMaterialGrade?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;

const MaterialGradeFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingMaterialGrade = false,
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
          <DialogTitle>{t("materialGrades:add")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={MATERIAL_GRADE_FORM_ID}>
            <FormSectionSeparator>
              {t("materialGrades:formSections.general")}
            </FormSectionSeparator>

            <FieldGroup className="my-4">
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingMaterialGrade}
                name="gradeCode"
                label={t("materialGrades:fields.gradeCode")}
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingMaterialGrade}
                name="baseResistance"
                label={t("materialGrades:fields.baseResistance")}
                type="number"
                min={0}
              />
            </FieldGroup>

            <FormSectionSeparator>
              {t("materialGrades:formSections.chemicalComposition")}
            </FormSectionSeparator>

            <MaterialGradeChemicalCompositionField
              required
              disabled={isLoading || isLoadingMaterialGrade}
              name="chemicalComposition"
            />

            <FormSectionSeparator className='mt-4'>
              {t("materialGrades:formSections.properties")}
            </FormSectionSeparator>

            <MaterialGradeThermalPropertiesField
              required
              disabled={isLoading || isLoadingMaterialGrade}
              name="properties"
            />
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            disabled={isLoadingMaterialGrade}
            isLoading={isLoading}
            form={MATERIAL_GRADE_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MaterialGradeFormDialog);
