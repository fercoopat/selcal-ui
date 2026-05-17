import { PencilIcon, TrashIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { IconButton, LoadingButton } from "@/components/buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { useDeactivateCalibration } from "@/modules/operations/calibrations/hooks/use-deactivate-calibration";
import type { Calibration } from "@/modules/operations/calibrations/interfaces/calibration.interface";

type Props = {
  calibration: Calibration | undefined;
};

const CalibrationsListRowActions = ({ calibration }: Props) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (calibration?.id) {
      searchParams.set("edit", calibration?.id);
      setSearchParams(searchParams);
    }
  }, [calibration?.id, searchParams, setSearchParams]);

  const { deleteCalibration, isLoading } = useDeactivateCalibration({
    onSuccess: onToggleDelete,
  });

  const handleDelete = useCallback(() => {
    deleteCalibration(calibration?.id);
  }, [calibration?.id, deleteCalibration]);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <IconButton tooltip="common:edit" onClick={handleEdit}>
          <PencilIcon />
        </IconButton>
        <IconButton
          tooltip="common:delete"
          onClick={onToggleDelete}
          variant="destructive"
        >
          <TrashIcon />
        </IconButton>
      </div>

      <Dialog open={isOpenDelete} onOpenChange={onToggleDelete}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>{t("calibrations:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("calibrations:deleteDescription", {
                description: calibration?.description,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>
            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDelete}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalibrationsListRowActions;
