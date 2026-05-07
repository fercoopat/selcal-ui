import type { MillType } from "@/modules/settings/mill-types/interfaces/mill-type.interface";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { useFindAllMillTypes } from "@/modules/settings/mill-types/hooks";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormMillTypeSelectField = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const { millTypes, isLoading } = useFindAllMillTypes();

  return (
    <FormSelectField
      required={required}
      disabled={disabled || isLoading}
      name={name}
      label={label || t("rollingMills:fields.millType")}
      options={millTypes}
      getOptionValue={(option: MillType | undefined) => option?.id || ""}
      renderOption={(option: MillType | undefined) => option?.name || ""}
      placeholder={placeholder || t("rollingMills:fields.millTypePlaceholder")}
    />
  );
};

export default memo(FormMillTypeSelectField);
