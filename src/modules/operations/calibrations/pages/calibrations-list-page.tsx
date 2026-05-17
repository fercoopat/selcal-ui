import { DataTable } from "@/components/data-table";
import { CalibrationsListToolbar } from "@/modules/operations/calibrations/components/calibrations-list-toolbar";
import { calibrationsListColumns } from "@/modules/operations/calibrations/constants/calibrations-list.columns";
import { useFindAllCalibrations } from "@/modules/operations/calibrations/hooks/use-find-all-calibrations";

const CalibrationsListPage = () => {
  const { calibrations, error, isLoading } = useFindAllCalibrations();

  return (
    <>
      <CalibrationsListToolbar />
      <DataTable
        columns={calibrationsListColumns}
        data={calibrations}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default CalibrationsListPage;
