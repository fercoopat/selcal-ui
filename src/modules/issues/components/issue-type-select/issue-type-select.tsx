import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import { ISSUE_TYPE_VALUES } from "@/modules/issues/constants/issue-type";

type Props = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
};
const IssueTypeSelect = (props: Props) => {
  const { t } = useTranslation();

  return (
    <FormSelectField
      options={ISSUE_TYPE_VALUES}
      getOptionValue={(option) => option ?? ""}
      renderOption={(option) => <div>{t(`issues:type.${option}`)}</div>}
      {...props}
    />
  );
};
export default memo(IssueTypeSelect);
