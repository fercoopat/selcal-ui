import { DataTable } from "@/components/data-table";
import { UsersListToolbar } from "@/modules/security/users/components/users-list-toolbar";
import { usersListColumns } from "@/modules/security/users/constants/users-list-columns";
import { useFindAllUsers } from "@/modules/security/users/hooks/use-find-all-users";

const UsersListPage = () => {
  const { error, isLoading, users } = useFindAllUsers();

  return (
    <>
      <UsersListToolbar />

      <DataTable
        columns={usersListColumns}
        data={users}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default UsersListPage;
