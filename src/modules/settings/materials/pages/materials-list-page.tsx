import { DataTable } from "@/components/data-table";
import { MaterialsListToolbar } from "@/modules/settings/materials/components/materials-list-toolbar";
import { materialsListColumns } from "@/modules/settings/materials/constants/materials-list.columns";
import { useFindAllMaterials } from "@/modules/settings/materials/hooks/use-find-all-materials";

const MaterialsListPage = () => {
  const { error, isLoading, materials } = useFindAllMaterials();

  return (
    <>
      <MaterialsListToolbar />
      <DataTable
        columns={materialsListColumns}
        data={materials}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default MaterialsListPage;
