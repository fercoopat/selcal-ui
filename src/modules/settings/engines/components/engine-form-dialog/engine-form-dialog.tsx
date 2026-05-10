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
import { FormStandSelectField } from "@/modules/settings/stands/components/stand-select-field";

const ENGINE_FORM_ID = "engine-form" as const;

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isLoadingEngine?: boolean;
  open?: boolean;
  title?: string;
  onToggle?: () => void;
} & FormContextProps;

const EngineFormDialog = ({
  children,
  className,
  isLoading = false,
  defaultOpen = false,
  isLoadingEngine = false,
  open,
  title,
  onToggle,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle>{title ? t(title) : t("engines:add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="py-4">
          <FormContainer {...props} id={ENGINE_FORM_ID}>
            <FieldGroup>
              <FormInputField
                autoFocus
                required
                disabled={isLoading || isLoadingEngine}
                name="name"
                label={t("engines:fields.name")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingEngine}
                min="0"
                step="0.01"
                type="number"
                name="power"
                label={t("engines:fields.power")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingEngine}
                min="0"
                step="0.01"
                type="number"
                name="speed"
                label={t("engines:fields.speed")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingEngine}
                min="0"
                step="0.01"
                type="number"
                name="transmission"
                label={t("engines:fields.transmission")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingEngine}
                min="0"
                step="1"
                type="number"
                name="revMax"
                label={t("engines:fields.revMax")}
              />
              <FormInputField
                required
                disabled={isLoading || isLoadingEngine}
                min="0"
                step="1"
                type="number"
                name="revMin"
                label={t("engines:fields.revMin")}
              />
              <FormStandSelectField
                disabled={isLoading || isLoadingEngine}
                name="standId"
                label={t("engines:fields.stand")}
                placeholder={t("engines:fields.standPlaceholder")}
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
            disabled={isLoadingEngine}
            isLoading={isLoading}
            form={ENGINE_FORM_ID}
          >
            {t("common:accept")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EngineFormDialog);
