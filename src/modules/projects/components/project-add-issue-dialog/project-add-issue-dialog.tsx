import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer } from "@/components/forms";
import type { FormContextProps } from "@/components/forms/form-container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IssueForm } from "@/modules/issues/components/issue-form";

const PROJECT_ADD_ISSUE_FORM_ID = "project-add-issue-form" as const;

type Props = {
  children?: React.ReactNode;
  className?: string;
  error: unknown;
  isLoading: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;
const ProjectAddIssueDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  disabled = false,
  open,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("max-w-2xl", className)}>
        <DialogHeader>
          <DialogTitle>{t("issues:create")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={PROJECT_ADD_ISSUE_FORM_ID}>
            <IssueForm disabled={disabled} />
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            form={PROJECT_ADD_ISSUE_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(ProjectAddIssueDialog);
