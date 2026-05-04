import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField } from "@/components/forms";
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
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const MILL_TYPE_FORM_ID = "mill-type-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingMillType?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const MillTypeFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingMillType = false,
  open,
  title = "millTypes:add",
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{t(title)}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <FormContainer {...props} id={MILL_TYPE_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingMillType}
                name="name"
                label={t("millTypes:fields.name")}
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingMillType}
                min="0"
                step="0.01"
                type="number"
                name="tempInitial"
                label={t("millTypes:fields.tempInitial")}
              />

              <FormInputField
                required
                disabled={isLoading || isLoadingMillType}
                min="0"
                step="0.01"
                type="number"
                name="tempVariation"
                label={t("millTypes:fields.tempVariation")}
              />
            </FieldGroup>
          </FormContainer>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onToggle} disabled={isLoading}>
            {t("common:cancel")}
          </Button>

          <LoadingButton
            type="submit"
            disabled={isLoadingMillType}
            isLoading={isLoading}
            form={MILL_TYPE_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MillTypeFormDialog);
