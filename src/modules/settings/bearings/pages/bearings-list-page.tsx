import { DataTable } from "@/components/data-table";
import { BearingsListToolbar } from "@/modules/settings/bearings/components/bearings-list-toolbar";
import { bearingsListColumns } from "@/modules/settings/bearings/constants/bearings-list.columns";
import { useFindAllBearings } from "@/modules/settings/bearings/hooks/use-find-all-bearings";

const BearingsListPage = () => {
  const { error, isLoading, bearings } = useFindAllBearings();

  return (
    <>
      <BearingsListToolbar />
      <DataTable
        columns={bearingsListColumns}
        data={bearings}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default BearingsListPage;
