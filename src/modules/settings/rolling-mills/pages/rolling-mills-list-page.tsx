import { DataTable } from "@/components/data-table";
import { RollingMillsListToolbar } from "@/modules/settings/rolling-mills/components/rolling-mills-list-toolbar";
import { rollingMillsListColumns } from "@/modules/settings/rolling-mills/constants/rolling-mills-list.columns";
import { useFindAllRollingMills } from "@/modules/settings/rolling-mills/hooks";

const RollingMillsListPage = () => {
  const { error, isLoading, rollingMills } = useFindAllRollingMills();

  return (
    <>
      <RollingMillsListToolbar />
      <DataTable
        columns={rollingMillsListColumns}
        data={rollingMills}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default RollingMillsListPage;
