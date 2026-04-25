import { DataTable } from "@/components/data-table";
import { MaterialGradesListToolbar } from "@/modules/settings/material-grades/components/material-grades-list-toolbar";
import { materialGradesListColumns } from "@/modules/settings/material-grades/constants";
import { useFindAllMaterialGrades } from "@/modules/settings/material-grades/hooks";

const MaterialGradesListPage = () => {
  const { error, isLoading, materialGrades } = useFindAllMaterialGrades();

  return (
    <>
      <MaterialGradesListToolbar />

      <DataTable
        columns={materialGradesListColumns}
        data={materialGrades}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default MaterialGradesListPage;
