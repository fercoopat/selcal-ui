import { DataTable } from "@/components/data-table";
import { RollersListToolbar } from "@/modules/settings/rollers/components/rollers-list-toolbar";
import { rollersListColumns } from "@/modules/settings/rollers/constants/rollers-list.columns";
import { useFindAllRollers } from "@/modules/settings/rollers/hooks/use-find-all-rollers";

const RollersListPage = () => {
  const { error, isLoading, rollers } = useFindAllRollers();

  return (
    <>
      <RollersListToolbar />
      <DataTable
        columns={rollersListColumns}
        data={rollers}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default RollersListPage;