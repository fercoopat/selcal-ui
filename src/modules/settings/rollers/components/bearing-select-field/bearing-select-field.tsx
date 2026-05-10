import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { useFindAllBearings } from "@/modules/settings/bearings/hooks";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormBearingSelectField = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const { bearings, isLoading } = useFindAllBearings();

  return (
    <FormSelectField
      required={required}
      disabled={disabled || isLoading}
      name={name}
      label={label || t("rollers:fields.bearing")}
      options={bearings}
      getOptionValue={(option: Bearing | undefined) => option?.id || ""}
      renderOption={(option: Bearing | undefined) => option?.name || ""}
      placeholder={placeholder || t("rollers:fields.bearingPlaceholder")}
    />
  );
};

export default memo(FormBearingSelectField);