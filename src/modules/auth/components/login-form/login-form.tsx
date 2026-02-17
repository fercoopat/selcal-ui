import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField } from "@/components/forms";
import type { FormContextProps } from "@/components/forms/form-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  error: unknown;
  isLoading: boolean;
} & FormContextProps;
const LoginForm = ({ className, isLoading, ...props }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{t("auth:signin.title")}</CardTitle>

          <CardDescription>{t("auth:signin.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <FormContainer {...props}>
            <FieldGroup>
              <FormInputField
                required
                disabled={isLoading}
                name="email"
                type="email"
                label={t("auth:signin.form.email")}
                placeholder="m@example.com"
              />

              <FormInputField
                required
                disabled={isLoading}
                name="password"
                type="password"
                label={t("auth:signin.form.password")}
              />

              <Field>
                <LoadingButton type="submit" isLoading={isLoading}>
                  {t("auth:signin.form.submit")}
                </LoadingButton>
              </Field>
            </FieldGroup>
          </FormContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export default memo(LoginForm);
