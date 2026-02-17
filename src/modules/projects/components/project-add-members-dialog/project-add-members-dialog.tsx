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
import { UserSelect } from "@/modules/security/users/components/user-select";

const PROJECT_ADD_MEMBERS_FORM_ID = "project-add-members-form" as const;

type Props = {
  children?: React.ReactNode;
  className?: string;
  error: unknown;
  isLoading: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: () => void;
} & FormContextProps;
const ProjectAddMembersDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  open,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{t("projects:newProject.title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={PROJECT_ADD_MEMBERS_FORM_ID}>
            <UserSelect
              autoFocus
              multiple
              required
              disabled={isLoading}
              name="userIds"
              label={t("projects:addMembers.fields.userIds")}
            />
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            form={PROJECT_ADD_MEMBERS_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(ProjectAddMembersDialog);
