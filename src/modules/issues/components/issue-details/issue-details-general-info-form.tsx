import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import {
  FormContainer,
  FormDateField,
  FormInputField,
  FormTextareaField,
} from "@/components/forms";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IssuePrioritySelect } from "@/modules/issues/components/issue-priority-select";
import { IssueStatusSelect } from "@/modules/issues/components/issue-status-select";
import { IssueTypeSelect } from "@/modules/issues/components/issue-type-select";
import { useIssueDetails } from "@/modules/issues/contexts/issue-details-context";
import { useCreateIssueForm } from "@/modules/issues/hooks/use-create-issue-form";
import { UserSelect } from "@/modules/security/users/components/user-select";

const ISSUE_DETAILS_FORM_ID = "issue-details-form" as const;

const IssueDetailsGeneralInfoForm = () => {
  const { t } = useTranslation();

  const { issue } = useIssueDetails();

  const form = useCreateIssueForm({
    projectId: issue?.project.id ?? "",
    issue,
  });

  const formIssueStatusValue = useWatch({
    control: form.control,
    name: "status",
  });
  const formIssueAssignedToIdValue = useWatch({
    control: form.control,
    name: "assignedToId",
  });

  return (
    <FormContainer {...form} id={ISSUE_DETAILS_FORM_ID}>
      <div className="grid gap-4">
        <Card>
          <CardContent className="grid gap-4 lg:grid-cols-2 lg:gap-7 xl:grid-cols-3">
            <FormInputField
              autoFocus
              name="title"
              label={t("issues:fields.title")}
              className="col-span-full"
              disabled={form.isLoading}
            />

            <IssueTypeSelect
              name="type"
              label={t("issues:fields.type")}
              disabled={form.isLoading}
            />

            <IssueStatusSelect
              name="status"
              label={t("issues:fields.status")}
              issueStatus={formIssueStatusValue}
              disabled={form.isLoading}
            />

            <IssuePrioritySelect
              name="priority"
              label={t("issues:fields.priority")}
              disabled={form.isLoading}
            />

            <UserSelect
              key={String(formIssueAssignedToIdValue)}
              name="assignedToId"
              label={t("issues:fields.assignedTo")}
              disabled={form.isLoading}
            />

            <FormInputField
              name="estimatedHours"
              label={t("issues:fields.estimatedHours")}
              type="number"
              min={0}
              disabled={form.isLoading}
            />

            <FormInputField
              name="actualHours"
              label={t("issues:fields.actualHours")}
              type="number"
              min={0}
              disabled={form.isLoading}
            />

            <FormDateField
              name="startDate"
              label={t("issues:fields.startDate")}
              disabled={form.isLoading}
            />

            <FormDateField
              name="dueDate"
              label={t("issues:fields.dueDate")}
              disabled={form.isLoading}
            />

            <FormDateField
              name="doneDate"
              label={t("issues:fields.doneDate")}
              disabled={form.isLoading}
            />
          </CardContent>

          <CardFooter className="flex items-center justify-end">
            <LoadingButton
              isLoading={form.isLoading}
              type="submit"
              form={ISSUE_DETAILS_FORM_ID}
            >
              {t("common:accept")}
            </LoadingButton>
          </CardFooter>
        </Card>

        <Card>
          <CardContent>
            <FormTextareaField
              name="description"
              label={t("issues:fields.description")}
              className="col-span-full"
              rows={5}
              disabled={form.isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </FormContainer>
  );
};
export default IssueDetailsGeneralInfoForm;
