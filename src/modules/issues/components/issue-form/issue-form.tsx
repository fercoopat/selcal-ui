import { useTranslation } from "react-i18next";

import {
  FormDateField,
  FormInputField,
  FormTextareaField,
} from "@/components/forms";
import { IssuePrioritySelect } from "@/modules/issues/components/issue-priority-select";
import { IssueStatusSelect } from "@/modules/issues/components/issue-status-select";
import { IssueTypeSelect } from "@/modules/issues/components/issue-type-select";
import { UserSelect } from "@/modules/security/users/components/user-select";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  disabled?: boolean;
};
const IssueForm = (props: Props) => {
  const { t } = useTranslation();

  const { control } = useFormContext();

  const formIssueStatusValue = useWatch({
    control,
    name: "status",
  });
  const formIssueAssignedToIdValue = useWatch({
    control,
    name: "assignedToId",
  });

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <FormInputField
        autoFocus
        required
        name="title"
        label={t("issues:fields.title")}
        className="col-span-full"
        {...props}
      />

      <FormTextareaField
        name="description"
        label={t("issues:fields.description")}
        className="col-span-full"
        rows={5}
        {...props}
      />

      <IssueTypeSelect name="type" label={t("issues:fields.type")} {...props} />

      <IssueStatusSelect
        name="status"
        label={t("issues:fields.status")}
        issueStatus={formIssueStatusValue}
        {...props}
      />

      <IssuePrioritySelect
        name="priority"
        label={t("issues:fields.priority")}
        {...props}
      />

      <UserSelect
        key={String(formIssueAssignedToIdValue)}
        required
        name="assignedToId"
        label={t("issues:fields.assignedTo")}
        {...props}
      />

      <FormInputField
        name="estimatedHours"
        label={t("issues:fields.estimatedHours")}
        type="number"
        min={0}
        {...props}
      />

      <br />

      <FormDateField
        name="startDate"
        label={t("issues:fields.startDate")}
        {...props}
      />

      <FormDateField
        name="dueDate"
        label={t("issues:fields.dueDate")}
        {...props}
      />
    </div>
  );
};
export default IssueForm;
