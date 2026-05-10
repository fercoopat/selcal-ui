import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { useFindAllRollingMills } from "@/modules/settings/rolling-mills/hooks";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormRollingMillSelectField = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const { rollingMills, isLoading } = useFindAllRollingMills();

  return (
    <FormSelectField
      required={required}
      disabled={disabled || isLoading}
      name={name}
      label={label || t("stands:fields.rollingMill")}
      options={rollingMills}
      getOptionValue={(option: RollingMill | undefined) => option?.id || ""}
      renderOption={(option: RollingMill | undefined) => option?.name || ""}
      placeholder={placeholder || t("stands:fields.rollingMillPlaceholder")}
    />
  );
};

export default memo(FormRollingMillSelectField);
