import { memo } from "react";
import { useTranslation } from "react-i18next";

import {
  FormDateField,
  FormInputField,
  FormTextareaField,
} from "@/components/forms";
import { FieldGroup } from "@/components/ui/field";

type Props = {
  isLoading: boolean;
};
const ProjectForm = ({ isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <FieldGroup>
      <FormInputField
        autoFocus
        required
        disabled={isLoading}
        name="name"
        label={t("projects:fields.name")}
      />

      <FormTextareaField
        disabled={isLoading}
        name="description"
        label={t("projects:fields.description")}
        rows={5}
      />

      <FormDateField name="startDate" label={t("projects:fields.startDate")} />

      <FormDateField name="endDate" label={t("projects:fields.endDate")} />
    </FieldGroup>
  );
};
export default memo(ProjectForm);
