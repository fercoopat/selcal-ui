import { DataTable } from "@/components/data-table";
import { EnginesListToolbar } from "@/modules/settings/engines/components/engines-list-toolbar";
import { enginesListColumns } from "@/modules/settings/engines/constants/engines-list.columns";
import { useFindAllEngines } from "@/modules/settings/engines/hooks/use-find-all-engines";

const EnginesListPage = () => {
  const { error, isLoading, engines } = useFindAllEngines();

  return (
    <>
      <EnginesListToolbar />
      <DataTable
        columns={enginesListColumns}
        data={engines}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default EnginesListPage;