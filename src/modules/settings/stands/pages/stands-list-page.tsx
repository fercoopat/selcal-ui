import { DataTable } from "@/components/data-table";
import { StandsListToolbar } from "@/modules/settings/stands/components/stands-list-toolbar";
import { standsListColumns } from "@/modules/settings/stands/constants/stands-list.columns";
import { useFindAllStands } from "@/modules/settings/stands/hooks";

const StandsListPage = () => {
  const { error, isLoading, stands } = useFindAllStands();

  return (
    <>
      <StandsListToolbar />
      <DataTable
        columns={standsListColumns}
        data={stands}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default StandsListPage;
