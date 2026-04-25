import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormInputField } from "@/components/forms";
import { FieldGroup } from "@/components/ui/field";
import { joinText } from "@/shared/utils/text.utils";

type Props = {
  name: string;
  disabled?: boolean;
  required?: boolean;
};

const MaterialGradeThermalPropertiesField = ({
  name,
  disabled = false,
  required = false,
}: Props) => {
  const { t } = useTranslation();

  return (
    <FieldGroup className="my-4">
      <FormInputField
        disabled={disabled}
        required={required}
        name={joinText([name, "density"])}
        label={t("materialGrades:fields.density")}
        type="number"
        min={0}
      />

      <FormInputField
        disabled={disabled}
        required={required}
        name={joinText([name, "thermalConductivity"])}
        label={t("materialGrades:fields.thermalConductivity")}
        type="number"
        min={0}
      />

      <FormInputField
        disabled={disabled}
        required={required}
        name={joinText([name, "specificHeat"])}
        label={t("materialGrades:fields.specificHeat")}
        type="number"
        min={0}
      />
    </FieldGroup>
  );
};

export default memo(MaterialGradeThermalPropertiesField);
