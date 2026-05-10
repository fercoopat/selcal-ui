import type { Material } from "@/modules/settings/materials/interfaces/material.interface";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { useFindAllMaterials } from "@/modules/settings/materials/hooks";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormMaterialSelectField = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const { materials, isLoading } = useFindAllMaterials();

  return (
    <FormSelectField
      required={required}
      disabled={disabled || isLoading}
      name={name}
      label={label || t("rollers:fields.material")}
      options={materials}
      getOptionValue={(option: Material | undefined) => option?.id || ""}
      renderOption={(option: Material | undefined) => option?.name || ""}
      placeholder={placeholder || t("rollers:fields.materialPlaceholder")}
    />
  );
};

export default memo(FormMaterialSelectField);