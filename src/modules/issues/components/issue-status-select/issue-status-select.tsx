import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FormSelectField } from "@/components/forms";
import {
  ISSUE_STATUS,
  ISSUE_STATUS_VALUES,
  type IssueStatus,
} from "@/modules/issues/constants/issue-status";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  [ISSUE_STATUS.TODO]: [
    ISSUE_STATUS.TODO,
    ISSUE_STATUS.IN_PROGRESS,
    ISSUE_STATUS.BLOCKED,
    ISSUE_STATUS.CANCELLED,
  ],

  [ISSUE_STATUS.IN_PROGRESS]: [
    ISSUE_STATUS.IN_PROGRESS,
    ISSUE_STATUS.REVIEW,
    ISSUE_STATUS.BLOCKED,
    ISSUE_STATUS.CANCELLED,
  ],

  [ISSUE_STATUS.REVIEW]: [
    ISSUE_STATUS.REVIEW,
    ISSUE_STATUS.DONE,
    ISSUE_STATUS.IN_PROGRESS,
    ISSUE_STATUS.CANCELLED,
  ],

  [ISSUE_STATUS.DONE]: [
    ISSUE_STATUS.DONE,
    ISSUE_STATUS.TODO,
    ISSUE_STATUS.CANCELLED,
  ], // Reabrir tarea

  [ISSUE_STATUS.BLOCKED]: [
    ISSUE_STATUS.BLOCKED,
    ISSUE_STATUS.TODO,
    ISSUE_STATUS.IN_PROGRESS,
    ISSUE_STATUS.CANCELLED,
  ],

  [ISSUE_STATUS.CANCELLED]: [ISSUE_STATUS.CANCELLED, ISSUE_STATUS.TODO], // Reactivar tarea cancelada
};

type Props = {
  name: string;
  label: string;
  issueStatus?: IssueStatus;
  disabled?: boolean;
  required?: boolean;
};
const IssueStatusSelect = ({ issueStatus: issueStatus, ...props }: Props) => {
  const { t } = useTranslation();

  const options = useMemo(() => {
    if (!issueStatus) {
      return ISSUE_STATUS_VALUES;
    }

    const allowedStatus = ALLOWED_TRANSITIONS?.[issueStatus] ?? [];

    return allowedStatus;
  }, [issueStatus]);

  return (
    <FormSelectField
      options={options}
      getOptionValue={(option) => option ?? ""}
      renderOption={(option) => <div>{t(`issues:status.${option}`)}</div>}
      {...props}
    />
  );
};
export default memo(IssueStatusSelect);
