import { memo } from "react";

import { FormSelectField } from "@/components/forms";
import { useFindAllRoles } from "@/modules/security/roles/hooks/use-find-all-roles";

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

const RoleSelect = (props: Props) => {
  const { roles } = useFindAllRoles();

  return (
    <FormSelectField
      options={roles}
      getOptionValue={(option) => option?.id ?? ""}
      renderOption={(item) => <div>{item?.name}</div>}
      {...props}
    />
  );
};

export default memo(RoleSelect);
