import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer, FormInputField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useUserDetails } from "@/modules/security/users/contexts/user-details-context";
import { useUpdateUserForm } from "@/modules/security/users/hooks/use-update-user-form";
import { createUserSchema } from "@/modules/security/users/schemas/create-user.schema";

const UPDATE_GENERAL_USER_INFO_FORM_ID =
  "update-general-user-info-form" as const;

const updateGeneralInfo = createUserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
});

const UserDetailsGeneralTab = () => {
  const { t } = useTranslation();

  const { user } = useUserDetails();

  const form = useUpdateUserForm({ user, schema: updateGeneralInfo });

  return (
    <>
      <CardContent>
        <FormContainer {...form} id={UPDATE_GENERAL_USER_INFO_FORM_ID}>
          <FieldGroup className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
            <FormInputField
              name="firstName"
              label={t("users:fields.firstName")}
            />

            <FormInputField
              name="lastName"
              label={t("users:fields.lastName")}
            />

            <FormInputField
              name="email"
              type="email"
              label={t("users:fields.email")}
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
          form={UPDATE_GENERAL_USER_INFO_FORM_ID}
        >
          {t("common:accept")}
        </LoadingButton>
      </CardFooter>
    </>
  );
};
export default UserDetailsGeneralTab;
