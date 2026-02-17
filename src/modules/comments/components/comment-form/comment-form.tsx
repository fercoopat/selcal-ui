import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FormFilesField, FormTextareaField } from "@/components/forms";
import { FieldGroup } from "@/components/ui/field";

type Props = {
  disabled: boolean;
  isLoading: boolean;
};
const CommentForm = ({ disabled, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <FieldGroup>
      <FormTextareaField
        autoFocus
        disabled={disabled || isLoading}
        name="content"
        label={t("comments:fields.content")}
        rows={5}
      />

      <FormFilesField
        name="files"
        label={t("comments:fields.files")}
        description={t("comments:fields.filesDescription")}
        disabled={disabled || isLoading}
      />
    </FieldGroup>
  );
};
export default memo(CommentForm);
