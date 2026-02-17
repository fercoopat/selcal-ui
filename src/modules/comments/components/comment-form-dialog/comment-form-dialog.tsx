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
import { CommentForm } from "@/modules/comments/components/comment-form";

const COMMENT_FORM_ID = "comment-form" as const;

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
const CommentFormDialog = ({
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

      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{t("comments:newComment.title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={COMMENT_FORM_ID}>
            <CommentForm disabled={disabled} isLoading={isLoading} />
          </FormContainer>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onToggle}
            disabled={isLoading || disabled}
          >
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            disabled={disabled}
            isLoading={isLoading}
            form={COMMENT_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(CommentFormDialog);
