import { memo } from "react";

import { FormMultiselectField, FormSelectField } from "@/components/forms";
import {
  MultiSelectContent,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import {
  useFindNonAdminUsers
} from "@/modules/security/users/hooks/use-find-all-users";
import { joinText } from "@/shared/utils/text.utils";

type Props = {
  name: string;
  label: string;
  autoFocus?: boolean;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
};
const UserSelect = ({ multiple = false, ...props }: Props) => {
  const { users, isLoading } = useFindNonAdminUsers();

  if (multiple) {
    return (
      <FormMultiselectField disabled={isLoading ?? props?.disabled} {...props}>
        <MultiSelectContent>
          {users?.map((user) => (
            <MultiSelectItem key={user?.id} value={user?.id ?? ""}>
              {joinText([user?.firstName, user?.lastName])}
            </MultiSelectItem>
          ))}
        </MultiSelectContent>
      </FormMultiselectField>
    );
  }

  return (
    <FormSelectField
      options={users}
      getOptionValue={(option) => option?.id ?? ""}
      renderOption={(item) => (
        <div>{joinText([item?.firstName, item?.lastName])}</div>
      )}
      {...props}
    />
  );
};
export default memo(UserSelect);
