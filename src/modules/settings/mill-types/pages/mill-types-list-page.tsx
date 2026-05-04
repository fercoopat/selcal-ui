import { DataTable } from "@/components/data-table";
import { MillTypesListToolbar } from "@/modules/settings/mill-types/components/mill-types-list-toolbar";
import { millTypesListColumns } from "@/modules/settings/mill-types/constants/mill-types-list.columns";
import { useFindAllMillTypes } from "@/modules/settings/mill-types/hooks/use-find-all-mill-types";

const MillTypesListPage = () => {
  const { error, isLoading, millTypes } = useFindAllMillTypes();

  return (
    <>
      <MillTypesListToolbar />
      <DataTable
        columns={millTypesListColumns}
        data={millTypes}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default MillTypesListPage;
