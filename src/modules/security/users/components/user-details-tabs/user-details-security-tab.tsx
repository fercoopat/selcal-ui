import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useUserDetails } from "@/modules/security/users/contexts/user-details-context";
import { useUpdateUserPassword } from "@/modules/security/users/hooks/use-update-user-password";

const UPDATE_USER_PASSWORD_FORM_ID = "update-user-password-form" as const;

const UserDetailsSecurityTab = () => {
  const { t } = useTranslation();

  const { user } = useUserDetails();

  const form = useUpdateUserPassword({
    user,
  });

  return (
    <>
      <CardContent>
        <FormContainer {...form} id={UPDATE_USER_PASSWORD_FORM_ID}>
          <FieldGroup className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
            <FormInputField
              name="currentPassword"
              type="password"
              label={t("users:fields.currentPassword")}
            />

            <FormInputField
              name="newPassword"
              type="password"
              label={t("users:fields.newPassword")}
            />

            <FormInputField
              name="confirmPassword"
              type="password"
              label={t("users:fields.confirmPassword")}
            />
          </FieldGroup>
        </FormContainer>
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-2">
        <Button
          variant={"outline"}
          onClick={form.reset}
          disabled={form.isLoading}
        >
          {t("common:reset")}
        </Button>

        <LoadingButton
          type="submit"
          isLoading={form.isLoading}
          form={UPDATE_USER_PASSWORD_FORM_ID}
        >
          {t("common:accept")}
        </LoadingButton>
      </CardFooter>
    </>
  );
};
export default UserDetailsSecurityTab;
