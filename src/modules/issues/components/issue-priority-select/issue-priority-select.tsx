import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { ISSUE_PRIORITY_VALUES } from "@/modules/issues/constants/issue-priority";

type Props = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
};
const IssuePrioritySelect = (props: Props) => {
  const { t } = useTranslation();

  return (
    <FormSelectField
      options={ISSUE_PRIORITY_VALUES}
      getOptionValue={(option) => option ?? ""}
      renderOption={(option) => <div>{t(`issues:priority.${option}`)}</div>}
      {...props}
    />
  );
};
export default memo(IssuePrioritySelect);
