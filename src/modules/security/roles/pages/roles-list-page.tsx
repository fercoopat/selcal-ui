import { DataTable } from "@/components/data-table";
import { RolesListToolbar } from "@/modules/security/roles/components/roles-list-toolbar";
import { rolesListColumns } from "@/modules/security/roles/constants/roles-list-columns";
import { useFindAllRoles } from "@/modules/security/roles/hooks/use-find-all-roles";

const RolesListPage = () => {
  const { error, isLoading, roles } = useFindAllRoles();

  return (
    <>
      <RolesListToolbar />

      <DataTable
        columns={rolesListColumns}
        data={roles}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default RolesListPage;
