import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { useFindAllStands } from "@/modules/settings/stands/hooks";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormStandSelectField = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const { stands, isLoading } = useFindAllStands();

  return (
    <FormSelectField
      required={required}
      disabled={disabled || isLoading}
      name={name}
      label={label || t("rollers:fields.stand")}
      options={stands}
      getOptionValue={(option: Stand | undefined) => option?.id || ""}
      renderOption={(option: Stand | undefined) =>
        option ? `#${option.position} - ${option.distanceToNextStand}mm` : ""
      }
      placeholder={placeholder || t("rollers:fields.standPlaceholder")}
    />
  );
};

export default memo(FormStandSelectField);
